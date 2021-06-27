---
date: '2021-01-26'
title: 'How to backup Hashicorp Vault with Raft storage on Kubernetes'
social_card_title: 'How to backup Hashicorp Vault with Raft storage on Kubernetes'
description: "How to backup Hashicorp Vault with Raft storage on Kubernetes"
---

## Context

Our team is experimenting with [Hashicorp Vault][] as our new credentials management solution. Thanks to the offical [Vault Helm Chart][], we are able to get an almost production-ready vault cluster running on our Kubernetes cluster with minimal effort.

## Architecture

Our 5-node vault cluster is highly available by using the provided [Integrated Storage Raft backend][]. The vault cluster is run as a [Kubernetes StatefulSet]() and each node has its own data storage. Each data storage is powered by a [Block Storage][] on IBM Cloud via [PersistentVolumeClaim][].

## The Problem

Unfortunately, the open source vault does not provide an out-of-the-box automated backup solution. It is only offer in [Vault Enterprise][]. Apprently, our team doesn't have a deep pocket to pay for the license fee.

That said, the backup feature is still accessible from cli and HTTP API, just not automated. We utilize the [snapshot save][] from vault cli to perform automated backup using a [CronJob][] running along with the vault Kubernetes deployment. The cronjob will periodically take a snapshot of the vault cluster and upload to our S3 storage.

## How?

### Prerequisite

- You have a working vault cluster
- You have sufficient access to the cluster
- You have a working S3 storage instance

### Setup Policy and Authentication

> This is mostly stolen from [adfinis-sygroup/vault-raft-backup-agent#approle-authentication](https://github.com/adfinis-sygroup/vault-raft-backup-agent)

Create a minimal policy for our snapshot agent to perform the backup job.

```bash
echo '
path "sys/storage/raft/snapshot" {
   capabilities = ["read"]
}' | vault policy write snapshot -
```

> The approle auth method allows machines or apps to authenticate with Vault-defined roles.

[AppRole][] auth method is perfectly suited for the snapshot agent to authenticate with our vault cluster. Notes `role-id` and `secret-id`, you will need them later.

```bash
vault auth enable approle
vault write auth/approle/role/snapshot-agent token_ttl=2h token_policies=snapshot
vault read auth/approle/role/snapshot-agent/role-id -format=json | jq -r .data.role_id
vault write -f auth/approle/role/snapshot-agent/secret-id -format=json | jq -r .data.secret_id
```

### Prepare Secrets

Let's save all our sensitive information as [Secrets][]. We will use them later.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: vault-snapshot-agent-token
type: Opaque
data:
  # we use gotmpl here
  # you can replace them with base64-encoded value
  VAULT_APPROLE_ROLE_ID: {{ .Values.approle.secretId | b64enc | quote }}
  VAULT_APPROLE_SECRET_ID: {{ .Values.approle.secretId | b64enc | quote }}
```

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: vault-snapshot-s3
type: Opaque
data:
  # we use gotmpl here
  # you can replace them with base64-encoded value
  AWS_ACCESS_KEY_ID: {{ .Values.backup.accessKeyId | b64enc | quote }}
  AWS_SECRET_ACCESS_KEY: {{ .Values.backup.secretAccesskey | b64enc | quote }}
  AWS_DEFAULT_REGION: {{ .Values.backup.region | b64enc | quote }}
```

### The CronJob

Let's create the [CronJob][] that actually does the work.

We configure `VAULT_ADDR` environment variable to `http://vault-active.vault.svc.cluster.local:8200`. Using `vault-active` [Service][] can make sure the snapshot request is made against the `leader` node, assuming you have enabled [Service Registration][], which is the [default](https://github.com/hashicorp/vault-helm/blob/f67b844d3027b981d12a56957f5fbcbf85ec5adc/values.yaml#L601). The exact url may vary depending on your vault helm chart deployment release name and targer namespace, [learn more](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/).

> I may have over-engineered the cronjob by using multiple containers to perform a simple backup and upload task. The intention is to avoid building custom images and I don't want to maintain yet another image.

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: vault-snapshot-cronjob
spec:
  schedule: "@every 12h"
  jobTemplate:
    spec:
      template:
        spec:
          volumes:
          - name: share
            emptyDir: {}
          containers:
          - name: snapshot
            image: vault:1.7.2
            imagePullPolicy: IfNotPresent
            command:
            - /bin/sh
            args:
            - -ec
            # The offical vault docker image actually doesn't come with `jq`. You can 
            # - install it during runtime (not a good idea and your security team may not like it)
            # - ship `jq` static binary in a standalone image and mount it using a shared volume from `initContainers`
            # - build your custom `vault` image
            - |
              curl -sS https://webinstall.dev/jq | sh
              export VAULT_TOKEN=$(vault write auth/approle/login role_id=$VAULT_APPROLE_ROLE_ID secret_id=$VAULT_APPROLE_SECRET_ID -format=json | /jq/jq -r .auth.client_token);
              vault operator raft snapshot save /share/vault-raft.snap; 
            envFrom:
            - secretRef:
                name: vault-snapshot-agent-token
            env:
            - name: VAULT_ADDR
              valut: http://vault-active.vault.svc.cluster.local:8200
            volumeMounts:
            - mountPath: /share
              name: share
          - name: upload
            image: amazon/aws-cli:2.2.14
            imagePullPolicy: IfNotPresent
            command:
            - /bin/sh
            args:
            - -ec
            # the script wait untill the snapshot file is available
            # then upload to s3
            # for folks using non-aws S3 like IBM Cloud Object Storage service, add a `--endpoint-url` option
            # run `aws --endpoint-url <https://your_s3_endpoint> s3 cp ...`
            # change the s3://<path> to your desired location
            - |
              until [ -f /share/vault-raft.snap ]; do sleep 5; done;
              aws s3 cp /share/vault-raft.snap s3://vault/vault_raft_$(date +"%Y%m%d_%H%M%S").snap;
            envFrom:
            - secretRef:
                name: vault-snapshot-s3
            volumeMounts:
            - mountPath: /share
              name: share
          restartPolicy: OnFailure
```

### Wrapping Up

Now you have all resources needed to automate vault backup for Raft backend. You can either just run `kubectl apply -f *` or build your own Helm Chart and distribute on your private chart repository.

[AppRole]: https://www.vaultproject.io/docs/auth/approle
[Block Storage]: https://cloud.ibm.com/docs/vpc?topic=vpc-block-storage-about
[Hashicorp Vault]: https://vaultproject.io
[Vault Enterprise]: https://www.vaultproject.io/docs/enterprise/automated-integrated-storage-snapshots
[Vault Helm Chart]: https://github.com/hashicorp/vault-helm
[Integrated Storage Raft backend]: https://www.vaultproject.io/docs/configuration/storage/raft
[Kubernetes StatefulSet]: https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/
[CronJob]: https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/
[PersistentVolumeClaim]: https://kubernetes.io/docs/concepts/storage/persistent-volumes/
[snapshot save]: https://www.vaultproject.io/docs/commands/operator/raft#snapshot-save
[Secrets]: https://kubernetes.io/docs/concepts/configuration/secret/
[Service]: https://kubernetes.io/docs/concepts/services-networking/service/
[Service Registration]: https://www.vaultproject.io/docs/configuration/service-registration/kubernetes#kubernetes-service-registration
