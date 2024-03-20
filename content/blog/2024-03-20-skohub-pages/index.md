---
title: Publishing SKOS the easy way
date: "2024-03-21"
authors: [{lastname: "Rörtgen",
           firstname: "Steffen",
           id: "https://lobid.org/team/sr#"}]
---

## A simple workflow for publishing your SKOS vocab

With [SkoHub Pages](https://github.com/skohub-io/skohub-pages) we now provide a very simple way for publishing your SKOS vocabulary from a GitHub repository. It only involves 5-6 steps:

### 1 Fork the skohub-pages repo.

⚠️ **Uncheck the box to only fork the main branch**.

![Create fork, uncheck to only fork main branch](./create_fork.png)

### 2 Activate GitHub Actions

Go to "Actions" tab and if not already activated, activate GitHub Actions.

### 3 Configue GitHub Pages branch

Go to "Settings", navigate to the "Pages" setting and select `gh-pages` as the branch your site is being built from.

![Set gh-pages branch](./set_gh_pages.png)

### 4 Update pages URL

Go back to the main page of your repo and click the little gear icon in the top right of the "About" section. Check the box at "Use your GitHub Pages website".

![Edit "About" section of the repository](./click_gear_icon.png)
![Set URL of repository](./use_gh_pages_website.png)

### 5 Start committing

Add a commit to the main branch and your vocabulary will be automatically published (sometimes it takes a little to see the changes, remember to do some hard refreshing).

### (6) Set your GitHub Pages URL as namespace

See section "Resolving custom domains" below ⬇️


## Utilizing GitHub Actions & Pages

Not all projects or individuals involved in the creation of controlled vocabularies are able or have the resources to run their own infrastructure.
Therefore, some time ago we pursued an approach that also makes it possible to use [SkoHub Vocabs](https://github.com/skohub-io/skohub-vocabs) based only on GitHub infrastructure.
The workflow is documented in the [SkoHub Pages](https://github.com/skohub-io/skohub-pages) repository.
To make this happen, we utilize "[GitHub Pages](https://docs.github.com/de/pages/getting-started-with-github-pages)" and "[GitHub Actions](https://docs.github.com/en/actions)"
With GitHub Pages it is possible to host websites on the GitHub infrastructure.
GitHub Actions are used for automated tests and deployments.

We have written a "GitHub Action" that ensures that a process is started after each push to the repository, which builds the vocabularies with SkoHub Vocabs.
The built vocabulary is then pushed to a separate git branch "gh-pages".
"GitHub Pages" in turn is configured to deliver HTML pages from this "gh-pages" branch.

We have also used this approach in various workshops to introduce SKOS and SkoHub.
However, the workflow required some adjustments in the GitHub action, so that some errors could quickly creep in.

We are happy to having improved this considerably! 🎉

The relevant information is now set directly as environment variables and all other customizations can be changed via the GitHub GUI, so the workflow is now much more user-friendly.

But that's not all!

## Resolving custom domains

Although with the presented approach the custom vocabulary could be provided without own infrastructure, the domains did not resolve to the GitHub pages.
This means that a concept scheme with an `@base` based on the GitHub Pages domain (e.g. `https://skohub-io.github.io/skohub-docker-vocabs/`) could not be resolved so far, which is why we recommended setting up a redirect via [w3id](https://w3id.org/) or [purl.org](https://purl.archive.org/).
It still makes sense to set up a redirect (in case the vocabulary moves somewhere else), but it is now also possible to use the domain that is assigned via GitHub Pages.

To do this, a [`config.yaml`](https://github.com/skohub-io/skohub-pages/blob/main/config.yaml) must be created in the repo.
The respective domain must then be entered under the `custom_domain`.
Example: Your GitHub Pages domain is: https://skohub-io.github.io/skohub-docker-vocabs/ Then provide https://skohub-io.github.io/skohub-docker-vocabs/ as `custom_domain` in your config.yaml.

The base of your concept scheme could then be something like: https://skohub-io.github.io/skohub-docker-vocabs/colours/

```yaml
#config.yaml
---
# [...]
custom_domain: "https://skohub-io.github.io/skohub-docker-vocabs/"
#[...]
```

```turtle
# colors.ttl
@prefix colour: <https://skohub-io.github.io/skohub-docker-vocabs/colours/> .
@prefix dct: <http://purl.org/dc/terms/> .
@prefix skos: <http://www.w3.org/2004/02/skos/core#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

colour: a skos:ConceptScheme ;
    dct:title "Colour Vocabulary"@en, "Farbvokabular"@de ;
    dct:creator "Hans Dampf"@de ;
    dct:created "2021-11-02"^^xsd:date ;
    dct:license <https://creativecommons.org/publicdomain/zero/1.0/> ;
    skos:hasTopConcept colour:violet, colour:blue .

colour:violet a skos:Concept ;
    skos:prefLabel "Violett"@de, "violet"@en;
    skos:altLabel "Lila"@de, "purple"@en ;
    skos:topConceptOf colour: .

colour:blue a skos:Concept ;
    skos:prefLabel "Blau"@de, "blue"@en ;
    skos:topConceptOf colour: .
```

Feel free to try out our simplified approach and let us know if something does not work: <https://github.com/skohub-io/skohub-pages>

## Outlook: Supporting other forges

There are lots of reasons why people might not want to use GitHub infrastructure owned by Microsoft for their SKOS publication workflows. That's why we will be looking into replacing as much as possible by generic git-based tooling for triggering the build and will think about providing alternatives for building vocabs on Microsoft servers: https://github.com/skohub-io/skohub-pages/issues/19

