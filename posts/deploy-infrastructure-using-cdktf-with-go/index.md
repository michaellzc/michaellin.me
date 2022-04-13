---
date: '2022-04-01'
title: 'Deploy Infrastructure using CDK for Terraform with Go'
social_card_title: 'Deploy Infrastructure using CDK for Terraform with Go'
description: 'Deploy Infrastructure using CDK for Terraform with Go'
---

> I [joined Sourcegraph](https://www.linkedin.com/feed/update/urn:li:activity:6891428455498575872/) earlier this year to the team responsible for our on-prem deployment and cloud offering!

At Sourcegraph, we aim to build the "Google for Code" and make code more accessible to everyone. Many companies leverage Sourcegraph so developers can easily [search code](https://about.sourcegraph.com/code-search), [automate code changes at scale](https://about.sourcegraph.com/batch-changes), and [track code changes](https://about.sourcegraph.com/code-insights), and more! Sourcegraph offers customers two deployment options, cloud multi-tenant offering and on-prem. Although we try really hard to keep your private code safe in multi-tenant offerings, many enterprise customers still prefer high isolation and choose to go with on-prem installation. Sadly, deploying and maintaining a production Sourcegraph instance is not a trivial task. Additionally, not every company has the necessary resources to maintain yet another system (especially if you're maintaining someone else's system). 

In a company hackathon, a group of us decided to build a "magic instance maker" that allows anyone to one-click deploy a fully managed single-tenant Sourcegraph instance within shared infrastructure on Google Cloud Platform (GCP). Users only need to provide us with a name and we will magically "make" an instance and return the magic URL of a fresh Sourcegraph deployment.

## Architecture

There are a lot of moving pieces to provision a fully functional Sourcegraph deployment, just like any other production web-based system. You need compute resources, storage resources, DNS, HTTP (TLS certificates), and much more.

Kubernetes is one of our [supported installation methods](https://docs.sourcegraph.com/admin/install) for large-scale deployment, and Kubernetes has an amazing ecosystem for various infrastructure automation. We deploy Sourcegraph on a shared Google Kubernetes Engine (GKE) cluster using our experimental [Helm chart](https://docs.sourcegraph.com/admin/install/kubernetes/helm). For datastores, we utilize managed services on GCP as much as possible, such as Cloud SQL and Google Cloud Storage (GCS). For DNS and TLS, we are mostly relying on Cloudflare. How do we automate so much stuff? Terraform (duh). With Terraform, we can provision all kinds of resources (by providers) and it comes with state management for free.

## The Problem

We all like Terraform or Infrastructure as Code (IaC). It's a great tool for declaratively managing infrastructure, and (hopefully) it's reproducible, unlike ClickOps. However, Terraform (HCL) is static and we usually just commit the HCL files in a `git` repository. In our use case, we need to provision resources dynamically without human intervention. Unfortunately, Terraform doesn't provide any out-of-the-box solution to programmatically create a new module and apply changes.

Wouldn't it be nice to declare terraform modules with one of your favourite programming languages? Additionally, you will have much more control over generated resources, while with plain Terraform, you are bound by the HCL language constraint. [CDK for Terraform](https://www.terraform.io/cdktf) (cdktf) is an experimental attempt at solveing this problem.

We used cdktf in Go to implement the project. Why Go and Terraform? Go is the go-to language at Sourcegraph and Terraform is something we use everyday (hence we did not go with things like [pulumi](https://www.pulumi.com/)).

## How does it work?

> For a complete tutorial, you should check out the Hashicorp's official [tutorial](https://learn.hashicorp.com/collections/terraform/cdktf). Code snippets below definitely won't compile.

First, you need to create a [cdktf.json](https://www.terraform.io/cdktf/create-and-deploy/configuration-file) configuration file. It is used to configure `providers` and `modules`.

```json
{
  "language": "go",
  "app": "go run main.go",
  "terraformProviders": [
    {
      "name": "google",
      "source": "hashicorp/google",
      "version": "~> 4.15.0"
    },
    {
      "name": "cloudflare",
      "source": "cloudflare/cloudflare",
      "version": "~> 3.11.0"
    }
  ]
  // ...
}
```

It's equivalent to the following in HCL,

```hcl
terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
      version = "4.15.0"
    }
  }
}
```

Then you need to run `cdktf get`, which will dynamically generate the go packages for the providers in `cdktf.json`. You will be able to import these packages later in your code to declare your Terraform module.

What does my module look like?

```go
import (
  "fmt"

  "github.com/aws/constructs-go/constructs/v10"
  jsii "github.com/aws/jsii-runtime-go"
  "github.com/hashicorp/terraform-cdk-go/cdktf"
  "github.com/sourcegraph/magic-instance-maker/generated/google"
  "github.com/sourcegraph/magic-instance-maker/generated/cloudflare"
  "github.com/sourcegraph/magic-instance-maker/generated/helm"
)

func NewStack(scope constructs.Construct, id string) cdktf.TerraformStack {
  stack := cdktf.NewTerraformStack(scope, &id)

  // Configure remote backend to store terraform state
  cdktf.NewGcsBackend(stack, &cdktf.GcsBackendProps{
    Bucket: jsii.String("gcs-bucket-name"),
    Prefix: jsii.String(fmt.Sprintf("tenants/%s", id)),
  })

  // Configure gcp provide, this is equivalent to the `provider` block
  google.NewGoogleProvider(stack, jsii.String("google"), &google.GoogleProviderConfig{
    Zone:    jsii.String("region-name"),
    Project: jsii.String("project-id"),
  })

  // This is equivalent to the data source block `data "google_sql_database_instance" "cloud-sql-instance" {}`
  cloudSqlDatabaseInstance := google.NewDataGoogleSqlDatabaseInstance(stack, jsii.String("cloud-sql-instance"), &google.DataGoogleSqlDatabaseInstanceConfig{
    Project: jsii.String("project-id"),
    Name:    &cloudSqlInstanceId,
  })
  sqlUser := google.NewSqlUser(stack, jsii.String("sql-user"), &google.SqlUserConfig{
    Project:  jsii.String(projectId),
    Name:     jsii.String(fmt.Sprintf("%s-admin", id)),
    Password: cloudSqlAdminPassword.Result(),
    Instance: cloudSqlDatabaseInstance.Name(),
    Type:     jsii.String("BUILT_IN"),
  })
  cloudsqlPgsqlDbDependencies := []cdktf.ITerraformDependable{sqlUser}
  cloudSqlPgsqlDb := google.NewSqlDatabase(stack, jsii.String("pgsql"), &google.SqlDatabaseConfig{
    Project:   jsii.String(projectId),
    Name:      jsii.String(fmt.Sprintf("%s-pgsql", id)),
    Instance:  cloudSqlDatabaseInstance.Name(),
    DependsOn: &cloudsqlPgsqlDbDependencies,
  })

  helm.NewHelmProvider(stack, jsii.String("helm"), &helm.HelmProviderConfig{
    Kubernetes: &helm.HelmProviderKubernetes{
      ConfigPath:    jsii.String("KUBECONFIGPATH"),
      ConfigContext: jsii.String("CLUSTERNAME"),
    },
  })
  // We provision Sourcegraph deployment using our experimental helm chart
  // https://docs.sourcegraph.com/admin/install/kubernetes/helm
  helm.NewRelease(stack, jsii.String("release"), &helm.ReleaseConfig{
    Repository:      jsii.String("https://sourcegraph.github.io/deploy-sourcegraph-helm/"),
    Chart:           jsii.String("sourcegraph"),
    Name:            jsii.String(id),
    Namespace:       jsii.String(id),
    CreateNamespace: jsii.Bool(true),
    Values:          jsii.Strings("values-file-a-yaml-string"),
  })

  // Configure cloudflare provide, this is equivalent to the `provider` block
  cloudflare.NewCloudflareProvider(stack, jsii.String("cloudflare"), &cloudflare.CloudflareProviderConfig{
    ApiToken: jsii.String("cloudflare-api-token"),
  })

  // This is equivalent to `resource "cloudflare_record" "magic-example-com" {}`
  cloudflare.NewRecord(stack, jsii.String("magic-example-com"), &cloudflare.RecordConfig{
    ZoneId:  jsii.String("cloudflare-zone-id"),
    Name:    jsii.String(fmt.Sprintf("magic-%s.example.com", id)),
    Type:    jsii.String("A"),
    Value:   nginxIngressIpAddress.Address(),
    Proxied: jsii.Bool(true),
  })
```

Above Go code roughly translates to,

```hcl
variable "tenant_id" { type = string }

terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
      version = "4.15.0"
    }
  }
}

terraform {
  backend "gcs" {
    bucket = "gcs-bucket-name"
    # this actually won't work in terraform
    # backend block doesn't allow interpolations
    prefix = "tenants/${var.tenant_id}"
  }
}

provider "google" { }

data "google_cloud_sql_instance" "cloud-sql-instance" {
  name = ""
}

resource "cloudflare_record" "magic-example-com" {
  name = "magic-${var.tenant_id}.example.com"
  # ...
}
```

How do you actually apply the module or stack you define in go?

You can do so with `cdktf-cli` and just run `cdktf deploy`. But we will need to provision the stack dynamically and we don't want to "shell it out",

```go
func main() {
  tempDir, err := os.MkdirTemp("", "magic-instance-maker-")
  if err != nil {
    return nil, err
  }
  defer os.RemoveAll(tempDir)

  app := cdktf.NewApp(&cdktf.AppOptions{Outdir: jsii.String(tempDir)})
  sharedtenant.NewStack(app, name, cluster)
  app.Synth()
}
```

Now let's try running `go run main.go`. Wait, it doesn't do anything? The `app.Synth()` invocation only synthesizes the module defined in Go into a JSON file without actually applying it. The great thing about HCL is that it is mostly interchangeable with JSON. In fact, if you `cd` into the `tempDir`, you can run the usual `terraform init` and `terraform apply` commands to apply your terraform module. This is exactly what the `cdktf deploy` command is doing behind the scene, it simply runs the `terraform` command for you. Unfortunately, when it comes to applying the terraform module, we still have to fall back to using the terraform CLI.

We will utilize this nice wrapper [hashicorp/terraform-exec](https://github.com/hashicorp/terraform-exec) to apply the synthesized Terraform module from Go.

```go
import (
  "context"
  "log"
  "os"
  "path/filepath"

  jsii "github.com/aws/jsii-runtime-go"
  "github.com/hashicorp/go-version"
  "github.com/hashicorp/hc-install/product"
  "github.com/hashicorp/hc-install/releases"
  "github.com/hashicorp/terraform-cdk-go/cdktf"
  "github.com/hashicorp/terraform-exec/tfexec"
  tfjson "github.com/hashicorp/terraform-json"
)

func main() {
  tempDir, err := os.MkdirTemp("", "magic-instance-maker-")
  if err != nil {
    return nil, err
  }
  defer os.RemoveAll(tempDir)

  app := cdktf.NewApp(&cdktf.AppOptions{Outdir: jsii.String(tempDir)})
  NewStack(app, name, cluster)
  app.Synth()

  installer := &releases.ExactVersion{
    Product: product.Terraform,
    Version: version.Must(version.NewVersion("1.1.4")),
  }

  execPath, err := installer.Install(context.Background())
  if err != nil {
    log.Fatalf("error installing Terraform: %s", err)
  }

  workingDir := filepath.Join(tempDir, "stacks", name)
  tf, err := tfexec.NewTerraform(workingDir, execPath)
  if err != nil {
    log.Fatalf("error running NewTerraform: %s", err)
  }

  err = tf.Init(context.Background(), tfexec.Upgrade(true))
  if err != nil {
    log.Fatalf("error running Init: %s", err)
  }

  err = tf.Apply(context.Background())
  if err != nil {
    log.Fatalf("error running Apply: %s", err)
  }
}
```

Run `go run main.go` again, and all your resources should be live.

## Thoughts

cdktf is a really cool project that allows us to actually "code" the infrastructure, and it provides a more convenient way to interact with Terraform programmatically. You can utilize the typical flow control or whatever convention you are already familar with, instead of being limited by Terraform's own DSL (HCL). 

Now, what's the catch?

### Performance Issues with `cdktf get`

We only have a few providers in `cdktf.json` and the command still takes a good chunk of time to finish. This might have something to do with compiling a lot of providers' code on every run. Below is some unscientific benchmark:

On a maxed out M1 Max MacBook,

```
Generated go constructs in the output directory: generated
________________________________________________________
Executed in   75.17 secs    fish           external
   usr time   92.10 secs   63.00 micros   92.10 secs
   sys time   12.05 secs  863.00 micros   12.05 secs
```

Docker for Mac,

```
[cdktf-builder 6/6] RUN --mount=type=cache,target=/tmp/terraform-plugin-cache cdktf get  854.4s
```

We also tried [caching providers](https://www.terraform.io/cdktf/concepts/providers-and-resources#provider-caching), but it didn't help. Perhaps this can be greatly improved when Hashicorp starts publishing [pre-built providers](https://github.com/hashicorp/terraform-cdk/issues/723) for Go, or if we can maintain our own registry?

### Performance Issues at Build Time

> Disclaimer: by no means I am an expert in Go and there must be some optimization you can do to the compiler

Prior to introducing cdktf in our Go program, it takes somewhere around 15 seconds to build the binary during the docker image build. After adding cdktf, it takes over two minutes to build.

Moreover, if you want to build a `linux/amd64` image, it takes over 15 minutes to compile! Of course, this is mostly due to the poor performance of `qemu` emulation.

Faster turnaround is key to development velocity and developers' happiness :(

### Unintuitive Usage of cdktf in Go

You may notice the usage of [jsii](https://aws.github.io/jsii/) everywhere in the module/stack we defined earlier, and it is required for the Go library to interact with the underlying `node` runtime.

### Lack of Go Support

There is not much documentation for Go example. We are mostly relying on reading TypeScript examples and autocomplete of the generated providers' code to write the module. Again, Go is the one of the cdktf supported languages that lack [pre-built providers](https://github.com/hashicorp/terraform-cdk/issues/723).

## Final Words

> Just write [TypeScript](https://youtu.be/Uo3cL4nrGOk)!

cdktf is still an early project and the support for Go is still experimental. The idea is great, but I wouldn't be comfortable using it in a real project just yet. The Go port definitely deserves more love :)

As I mentioned earlier, HCL and JSON are mostly interchangeable, so we can also handcraft the JSON to represent the Terraform module using any programming language or utilize the [HCL parser](https://github.com/hashicorp/hcl).
