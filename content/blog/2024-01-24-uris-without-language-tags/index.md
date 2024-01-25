---
title: Breaking Improvement - SkoHub Vocabs Without Language Tags in URLs
date: "2024-01-24"
authors: [{lastname: "Rörtgen",
           firstname: "Steffen",
           id: "https://lobid.org/team/sr#"}]
---

If you have worked with SkoHub Vocabs before, you might have noticed that the URLs in the address bar had a little special feature that you don't encounter very often, a language tag before the `.html`:

`https://skohub.io/dini-ag-kim/hochschulfaechersystematik/heads/master/w3id.org/kim/hochschulfaechersystematik/scheme.de.html`

Why did we need this?

We wanted Internationalization features to be able to navigate multiple languages.
Normally this is done via a subdomain or adding a language tag behind the domain name like `https://w3id.org/kim/hochschulfaechersystematik/en/`.
But this does not work for SkoHub Vocabs since the we use the URIs from the turtle files as IDs for the concept.
Changing the URI by adding a language tag somewhere would break the whole concept of SkoHub Vocabs.

So it was decided to add the language at the end of the URL by using Apache Multiviews features.
But this lead to some inconveniences:

- SkoHub Vocabs needed to be served by an Apache Webserver
- The webserver needed special configuration
- [SkoHub Docker Vocabs](https://github.com/skohub-io/skohub-docker-vocabs), which is served via GitHub Pages, always needed a specific link to an index.{language}.html file, since GitHub Pages only looks for an `index.html`
- The build directory grew quite a bit, since there were dedicated html pages built for every language

In order to overcome these issues we decided to change this behaviour and just build one html page with a functionality to switch languages.

The shown language is now chosen the following way:

- by using your browser language
- if you switched languages in the application the chosen language is taken
- if a language is not present, a default language present in the vocabulary is used

To point users to a specific language, you can use a query parameter `lang=` like:

`https://w3id.org/kim/hcrt/scheme?lang=uk`

Since SkoHub Vocabs also used the language tag of the URL internally to determine which language to serve a lot of changes had to be done in the codebase.
But overall this resulted in a much reduced size of the built vocabularies and more flexibility on serving the vocabularies.

## What to do if I'm running my own webhook server?

If you are running your own webhook server, you should upgrade the following way:

- follow the steps outlined in the webhook repository to [rebuild vocabularies](https://github.com/skohub-io/skohub-webhook#rebuilding-vocabularies)
- this will rebuild all still existing branches you are currently serving
- setup a redirect in your apache config, so that links that still have `...de.html` will be redirected to `...html?lang=de`:
```
# Redirect from ...filename.LANGCODE.html to ...filename.html?lang=LANGCODE
        RewriteRule ^(.+)\.([a-z]{2})\.html$ $1.html?lang=$2 [L,R=301]
```
- after that you should be good!

## Anything else?

During developing the script to rebuild all existing vocabularies, I noticed that we are serving a lot of branches that do not exist anymore.
SkoHub Webhook builds a vocabulary for every branch, you are setting up and pushing to.
But the webhook service does not get notified, when a branch is deleted.
This way we end up having lots of files for branches that no one needs anymore.
In order to clean this up a bit, we will soon add a script to clean the dist directory up and remove those no longer needed files.

