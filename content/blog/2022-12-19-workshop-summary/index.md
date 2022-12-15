---
title: Notes from the November workshop
date: "2022-12-19"
description: Read the
authors: [{lastname: "Pohl",
           firstname: "Adrian",
           id: "http://lobid.org/team/ap#" },
           {lastname: "Rörtgen",
           firstname: "Steffen",
           id: "https://lobid.org/team/sr#"}]
---

Due to new funding for SkoHub development we conducted – as [previously announced](https://blog.skohub.io/2022-11-skohub-workshop/) – a workshop on the 17th of November. About [15 participants from three different countries](https://pad.gwdg.de/s/2022-11-17-skohub-workshop#Attendees) joined updates and discussion around the following topics:

1. Current state of SkoHub 
2. Introduction of Metadaten.nrw project
3. Collection of requirements from the community regarding PubSub and reconciliation 
4. Presentation of SkoHub Reconcile prototype by Andreas Wagner

We split the workshop in two parts, the first part gave a general overview about the current state of SkoHub and the renewed funding through the Metadaten.nrw project. Then we had a general discussion about SkoHub PubSub – the module to connect a SKOS vocab with the Fediverse – as well as Andreas Wagner's Reconciliation prototype. See also the [slides for the first part of the workshop](https://pad.gwdg.de/p/veKgVreqw).

In the second half Andreas gave us a technical deep dive into his reconciliation prototype, walked us through the code and we discussed the architecture as well as future development and integration into the SkoHub ecosystem.

In the following, we will go deeper into what happened in the different parts.

## Current state of SkoHub

Currently, SkoHub Vocabs is by far the most used SkoHub module which is . It is used by the [hbz](https://www.hbz-nrw.de/), the metadata standardization groups around [KIM](https://wiki.dnb.de/display/DINIAGKIM), [WirLernenOnline](https://wirlernenonline.de/), The [Institute for Educational Quality Improvement (IQB)](https://www.iqb.hu-berlin.de/), in research projects in the area of digital humanities and by other people and institutes to publish their controlled vocabularies.

The browser plugin  SkoHub Editor as well as the PubSub module haven't been used in production yet and have been shut down temporarily in March 2022 due to missing resources.

In 2022 the work on SkoHub started again when we [partnered with effective WEBWORK (eWW)](https://blog.skohub.io/2022-05-eww-project-kickoff/) to redesign the web pages, create a new logo, improve UI configuration and address other issues as for example the support of `skos:Collection`. (See the [project kanban](https://github.com/orgs/skohub-io/projects/2) for an overview.)

## Decouple software and services

The general idea is to further decouple the software "SkoHub" from its running instances. Therefore we also wanted eWW to work on UI configuration possibilities, so other institutes or projects can easily brand their SkoHub instance.

In the future, we will move the hosted instance, currently running at skohub.io to metadaten.nrw, the project which grants the further development of SkoHub.

## Metadaten.nrw

In the end of 2021 hbz secured some funding by the Ministry of Culture and Science of North Rhine-Westphalia (MKW) for a project called Metadaten.nrw. It consists of two sub-projects, with one called "Infrastructure Initiative Metadata Services" being located in the Open Infrastructure team (OI) at hbz, where SkoHub development will take place.

We got four positions funded from which two are already filled, amongst them Steffen for SkoHub development. The goal of the project is to expand the community of user for the existing metadata infrastructure provided by hbz/OI, with focus on libraries and scholars in North Rhine-Westphalia (NRW), and establish hbz as competence center for metadata in NRW.

Accordingly, we plan to develop SkoHub further regarding the following topics:

* Fediverse integration: Further development of SkoHub PubSub in the context of a concrete use case
* Reconciliation: Bringing the SkoHub reconciliation module into production
* Support Possibly picking up on [Annif](https://annif.org/) integration in a later project phase
* Offer SkoHub tutorials and workshops

## Community, PubSub & Reconciliation

To further encourage contributions like the one from Andreas with the reconciliation prototype, we will set up contributing guidelines to have a clear and transparent definition of the development and deployment processes.

### SkoHub PubSub

Afterwards we made a small (re)introduction to SkoHub PubSub and discussed possible use cases. We developed ideas about SkoHub PubSub serving as a communication hub between researchers for their research fields. Raphaëlle Lapotre came up with a conrete use case they currantly have some pains with in the context of [Timel Thesaurus](https://datu.ehess.fr/timel/en/) an indexing Thesaurus for huge amounts of digitized pictures of medieval iconography. Currently, there are problems with the task to store the large amounts of images centrally in a repository. Researcher could hold the files locally in their NextCloud and publish the image metadata to inboxes of SKOS concepts. A central service could then listen to the data provided by each concept's inbox and then display the metadata with a link pointing to the image in its storage location. There are actually two possible use cases : one with the digitized illuminations pictures of the Ahloma lab (EHESS, sample here : https://didomena.ehess.fr/collections/3x816n47s?locale=fr), the second one with painted ceilings pictures from all the mediterranean area, collected by an association of scholars and retired volunteers : https://rcppm.org/blog/histoire-et-decouverte/carte-interactive-des-plafonds-peints-medievaux/. Possibly, the [support for ActivityPub in Nextcloud](https://nextcloud.com/blog/nextcloud-introduces-social-features-joins-the-fediverse/) could help with such a project.

Another topic was the idea of community building around concepts. The Open Educational Resource Search Index as well as the WirLernenOnline project already use elaborated vocabularies to index their resources. Interested humans could easily follow these concepts and engage in discussions around them.

This is also applicable to researchers that will be able to build up a topic-specific data base and open discussions about their research in the fediverse. This also rose practical questions about what happens on the notification side with broader and narrower concepts. If I'm following a concept do I also want to get notifications about its narrower or broader concepts? These are questions that can be discussed further in our community.

### SkoHub Reconciliation

Following the PubSub discussion Andreas presented his reconciliation prototype. The reconciliation prototype is based on the [Reconciliation API spec](https://reconciliation-api.github.io/), so it is interoperable and can be in any kind of application that acts as a reconciliation client. Andreas implementation already worked in [OpenRefine](https://openrefine.org/) as well as in [TEI Publisher](https://teipublisher.com)'s annotation tool. After showing the implementations with some examples we went into a technical deep dive.

Andreas walked us through the code and we discussed the current implementation as well as the future architecture of the SkoHub modules. His current approach is based on implementations in SkoHub Vocabs webhook part and lending code from SkoHub PubSub regarding the elasticsearch indexing.

The discussion resulted in the proposal to separate SkoHub Vocabs from the webhook module and by this further separate concerns of the respective modules. He integrated a `doreconc` query parameter to the webhook, which triggers a [script](https://github.com/mpilhlt/skohub-vocabs/blob/feature-reconc/src/populateReconciliation.js) that will populate the vocabulary to the [reconcile prototype](https://github.com/skohub-io/skohub-reconcile).

After the workshop we transferred the reconcile repository from Andreas to the SkoHub organization and are happy to start further developing it in 2023.

## Final thoughts

The workshop was a great event to discuss with SkoHub users and those who want to be. We collected valuable feedback and ideas for development in the upcoming two years.
Especially the sudden rise in awareness for the Fediverse opens up interesting use cases for SkoHub PubSub, which we are happy to engage in. The highglight of the workshop was the presentation of Andreas' reconciliation prototype and its transfer in the SkoHub organization. This is a good example for the benefits of open source and use case driven development.

We are looking forward to future community events, more use cases and even more modules to be developed in the SkoHub ecosystem.

**More links:**
- [Reconciliation API spec & ressources](https://reconciliation-api.github.io/) (e.g.  a [list of databases offering a Reconciliation Endpoint](https://reconciliation-api.github.io/testbench/#/))
- [Reconciliation in OpenRefine](https://docs.openrefine.org/manual/reconciling), [GND reconciliation for OpenRefine](https://lobid.org/gnd/reconcile), [HistHub Blog entry (dt.)](https://histhub.ch/reconciling/)
- [Annotation in TEI Publisher](https://teipublisher.com/exist/apps/tei-publisher/doc/blog/tei-publisher-710.xml)
- SkoHub Reconcile prototype: [GitHub](https://github.com/skohub-io/skohub-reconcile)/[Test Instance](https://c111-064.cloud.gwdg.de/reconc/)