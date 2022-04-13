---
date: '2020-12-22'
title: 'A combined approach using gettext and Rails I18n for Rails Internationalization'
social_card_title: 'A combined approach using gettext and Rails I18n for Rails Internationalization'
description: "A combined approach using gettext and Rails I18n for Rails Internationalization"
---

With the increasing need for e-learning solutions in the pandemic era, our team at IBM is seeking to help organizations all around the world to host and operate their own e-learning platforms through our e-learning platform, [Cognitive Class](https://cognitiveclass.ai/business).

GLaDOS is a Ruby on Rails application that acts as the user interface and the administrative management console of Cognitive Class. One of the technical debts we have with GLaDOS is its poor handling of strings, making it hard to provide localized platforms and interfaces for learners who don't speak English. In order to expand our business into non-English speaking countries, we are currently in the process of bringing internationalization (i18n) support to GLaDOS. In this blog post, I will discuss the process of i18n for GLaDOS, as well as integrating GLaDOS with Pontoon, an open source localization platform offered by Mozilla.

## Overview

One thing that I have learned from working with Ruby on Rails applications is to play by its rules and follow its conventions in order to avoid unexpected errors. Even though the most commonly used i18n system is gettext, Ruby on Rails approaches i18n by putting locale strings into YAML files instead of Portable Object (PO) files.

We decided to start things the [Rails way](https://guides.rubyonrails.org/i18n.html).

![baby yoda meme](./this-is-the-way.png)

We use Pontoon, an open source localization platform built by Mozilla, to do the actual translation work. Why not other paid solutions? First of all, good luck getting a big corp to pay for any services on short notice. Moreover, we operate many Kubernetes (K8S) clusters and have an easy workflow to deploy anything onto K8S. 

Checkout our [Pontoon Helm Chart][] if you are looking to self-host Pontoon on your own K8S infrastructure.

## String Extraction from View Templates

Prior to i18n, all strings are hardcoded in GLaDOS view templates. In order to make GLaDOS i18n-ready, the first thing we need to do is to extract and replace these strings with variables.

Most of our templates are written in [Slim][], and thanks to the magical OSS world, [slimkeyfy][] helped us automate 90% of the string extraction work.

Here is the file tree of `${RAILS_ROOT}/config/locales` to demostrate how we organize these YAML files.

```
📦locales
 ┣ 📂admin
 ┃ ┗ 📜courses.en.yml
 ┣ 📂layouts
 ┃ ┗ 📜admin.en.yml
 ┣ 📂models
 ┃ ┗ 📜courses.en.yml
 ┣ 📜.gitignore
 ┣ 📜courses.en.yml
 ┗ 📜helpers.en.yml
```

### Caveats

- Slimkeyfy will always falsely identify inline JavaScript code in the view template
- Help text (or any other arbitrary values in the `options` hash) in form fields are usually not extracted
- Slimkeyfy may also fail to extract overridden labels of form builder submit buttons


```slim
= bootstrap_form_for [@foo] do |form|
  = form.text_field :bar1, help: "Dummy message."
  = form.text_field :bar2, help: "Dummy message."
```

## Integrating with Pontoon

Pontoon works with many [i18n files formats][]. Unfortunately, the Rails way doesn't work with it out of the box. We decided to use a combined approach with Rails and gettext. In the upcoming sections, I will explain how we work with YAML and PO/POT (gettext) files together.

### Uploading Strings for Translation

One of the things I love about Pontoon is that it supports syncing translation files with external VCS (Git and Mercurial). In the GLaDOS Git repository, we consider the English locale strings as the source-of-truth. Therefore, we only track English locale strings in Git, and store a copy of these English strings with all other locale strings in a separate Git repository called the translation repo.

Here is a demonstration of what our translation repo looks like.

> NOTE: We don't encode the locale code into `PO` file name.

```
📦locales
 ┣ 📂templates
 ┃ ┗ 📜courses.en.pot
 ┣ 📂uk
 ┃ ┗ 📜courses.en.po
 ┗ 📂zh-CN
   ┗ 📜courses.en.po
```

We implemented a utility script in Python named `i18n_tool` (I stole the name from [edx/i18n-tools][]). It's heavily influenced by the [puentue][] project from Mozilla. The script does the following during the `uploading` process.

- Fetch the translation repo
- Convert all YAML locale files to Portable Object Template (POT) files using the [yaml2po][] utility script
- For existing PO files, run [msgmerge][] to update the PO file from the corresponding POT file
- If there is no corresponding PO file, run [msginit][] to initialize a new PO file from the POT file
- All changes are committed and pushed to the translation repo

Changes will be picked up by Pontoon in an asynchronous manner, and be available for translators.

To better show the result, here is an example.

For `zh-CN`, one of our supported locale, the `i18n_tool` can convert `courses.en.yml` to `courses.en.pot`, then either initialize a new `courses.en.po` or update the existing `courses.en.po` file based on the updated `POT` file in the corresponding locale directory.

`courses.en.yml`
```yml
en:
  courses:
    show:
      enroll: Enroll
```

`courses.en.pot`
```
msgctxt "courses:show:enroll"
msgid "Enroll"
msgstr ""
```

`courses.en.po`
```
"Language: zh-CN\n"

msgctxt "courses:show:enroll"
msgid "Enroll"
msgstr "注册"
```

### Downloading Translated Strings

We ship GLaDOS as a Docker image, so locale files are pulled from the translation repo during build time. The `i18n_tool` is also used and does the following:

- Fetch the translation repo
- Convert all supported locales PO files to YAML using the [po2yaml][] utility script

## Wrapping Up

This is how we deal with i18n internally at Cognitive Class and make the service available to our clients worldwide. While the rest of the internet is still in debate whether gettext or Rails i18n (YAML) is superior to one another, I wanted to share my experience approaching i18n in a Ruby on Rails application by combining both tools in a way that separates the concerns of developers and translators. With our methods, developers only need to understand framework defaults without learning another tool (aka gettext), and translators don't need to worry about where their translations are going to end up.

By all means, I am not an i18n expert, so take this post with a grain of salt. Hopefully, I've at least provided you some insight on the topic of i18n.

## Resources

- <https://guides.rubyonrails.org/i18n.html>
- <https://mozilla-l10n.github.io/documentation>
- <https://kuma.readthedocs.io/en/latest>
- <https://github.com/mozilla/pontoon>

[i18n files formats]: https://mozilla-pontoon.readthedocs.io/en/latest/index.html#pontoon-mozilla-s-localization-platform
[msginit]: https://www.gnu.org/software/gettext/manual/html_node/msginit-Invocation.html
[msgmerge]: https://www.gnu.org/software/gettext/manual/html_node/msgmerge-Invocation.html
[edx/i18n-tools]: https://github.com/edx/i18n-tools
[Pontoon Helm Chart]: https://github.com/ibm-skills-network/charts/tree/master/charts/pontoon
[Slim]: http://slim-lang.com/
[slimkeyfy]: https://github.com/phrase/slimkeyfy
[puentue]: https://github.com/mozilla/puente
[yaml2po]: https://github.com/ibm-skills-network/yaml2po
[po2yaml]: https://github.com/ibm-skills-network/yaml2po
