---
title: Re-working SkoHub Vocabs internationalization features
date: "2024-01-31"
authors: [{lastname: "Rörtgen",
           firstname: "Steffen",
           id: "https://lobid.org/team/sr#"}]
---

## In the past: Internationalization with drawbacks

If you have worked with SkoHub Vocabs before, you might have noticed that the URLs in the address bar had a little special feature that you don't encounter very often, a language tag before the `.html`:

`https://skohub.io/dini-ag-kim/hochschulfaechersystematik/heads/master/w3id.org/kim/hochschulfaechersystematik/scheme.de.html`

Why did we need this?

We wanted Internationalization features to be able to navigate multiple languages.
Normally this is done via a subdomain or adding a language tag behind the domain name like `https://w3id.org/kim/hochschulfaechersystematik/en/`.
But this does not work for SkoHub Vocabs since the we use the URIs from the turtle files as IDs for the concept.
Changing the URI by adding a language tag somewhere would break the whole concept of SkoHub Vocabs.

So it was decided to add the language at the end of the URL by using Apache Multiviews features.
But this lead to some drawbacks:

- SkoHub Vocabs needed to be served by an Apache Webserver
- The webserver needed special configuration
- [SkoHub Docker Vocabs](https://github.com/skohub-io/skohub-docker-vocabs), which is served via GitHub Pages, always needed a specific link to an index.{language}.html file, since GitHub Pages only looks for an `index.html`
- The build directory grew quite a bit, since there were dedicated html pages built for every language

## Switching to one page for all languages

In order to overcome these issues we decided to change this behaviour and just build one html page with a functionality to switch languages. The shown language is now chosen the following way:

- by using your browser language
- if you switched languages in the application the chosen language is taken
- if a language is not present, a default language present in the vocabulary is used

To point users to a specific language, you can use a query parameter `lang=` like:

`https://w3id.org/kim/hcrt/scheme?lang=uk`

Since SkoHub Vocabs also used the language tag of the URL internally to determine which language to serve a lot of changes had to be done in the codebase.
But overall this resulted in a much reduced size of the built vocabularies and more flexibility on serving the vocabularies.

## Benefits of the new approach

This new internationalization approach brings lots of improvements:

- SkoHub Vocabs is now independent from the underlying webserver
- The size of the vocabularies is drastically reduced, especially for vocabularies with lots of languages
- [SkoHub Docker Vocabs](https://github.com/skohub-io/skohub-docker-vocabs) is now simpler to setup since we only have "normal" `index.html` files that it knows how to handle

## What to do if I'm running my own webhook server?

If you are running your own webhook server, you should upgrade the following way:

- Follow the steps outlined in the webhook repository to [rebuild vocabularies](https://github.com/skohub-io/skohub-webhook#rebuilding-vocabularies). This will rebuild all still existing branches you are currently serving.
- Set up a redirect in your apache config, so that links that still have `...de.html` will be redirected to `...html?lang=de`:
```
# Redirect from ...filename.LANGCODE.html to ...filename.html?lang=LANGCODE
        RewriteRule ^(.+)\.([a-z]{2})\.html$ $1.html?lang=$2 [L,R=301]
```
- After that you should be good!

## Anything else?

During developing the script to rebuild all existing vocabularies, I noticed that we are serving a lot of branches that do not exist anymore.
SkoHub Webhook currently builds a vocabulary for every branch, you are setting up and pushing to.
But the webhook service does not get notified, when a branch is deleted.
This way we end up having lots of files for branches that no one needs anymore.
In order to clean this up a bit, we will soon add a script to clean the dist directory up and remove those no longer needed files.

