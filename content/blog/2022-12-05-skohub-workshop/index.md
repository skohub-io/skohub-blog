---
title: SkoHub Community Workshop
date: "2022-12-05"
description: SkoHub community discussed the current status of SkoHub and made plans for future development
authors: [{lastname: "Pohl",
           firstname: "Adrian",
           id: "http://lobid.org/team/ap#" },
           {lastname: "Rörtgen",
           firstname: "Steffen",
           id: "https://lobid.org/team/sr#"}]
---


Due to new funding for SkoHub development we conducted a workshop on the 17th of November with the SkoHub Community to talk about the following topics:

- Current state of SkoHub
- Introduction of Metadaten.nrw project
- Collection of requirements from the community regarding PubSub and SkoHub Reconcile
- Presentation of SkoHub Reconcile prototype by [Andreas Wagner](https://www.lhlt.mpg.de/wagner)

About 15 participants from three different countries participated.
We split the workshop in two parts, the first one gave a general overview about the current state of SkoHub, the metadaten.nrw project and we discussed about SkoHub PubSub as well as Andreas Wagners reconciliation prototype.

In the second half Andreas gave us a technical deep dive into his prototype, walked us through the code and we discussed the architecture as well as future development and integration into the SkoHub ecosystem.

### Current State of SkoHub

SkoHub Vocabs is by far the most used module of SkoHub.
It is used by the hbz, the metadata standardization groups around KIM, WirLernenOnline, The Institute for Educational Quality Improvement (IQB), in research projects in the area of digital humanities and by other people and institutes to publish their controlled vocabularies.
The SkoHub Editor, the browser plugin and PubSub haven't been used in production and have been shut down temporarily in March 2022 due to missing resources.

In 2022 the work on SkoHub started againg with the effective WEBWORK (eWW) company as we reported in this [blog post](https://blog.skohub.io/2022-05-eww-project-kickoff/).
They began working on a logo redesign, UI configuration, different design issues and the support of `skos:Collection`.

The general idea is to further decouple the software "SkoHub" from its running instances.
Therefore we also wanted eWW to work on UI configuration possibilities, so other institutes or projects can easily brand their SkoHub instance.
We will also move the hosted instance, currently running at [skohub.io](https://skohub.io) to [metadaten.nrw](http://metadaten.nrw), the project which grants the further development of SkoHub.

### Metadaten.nrw

In the end of 2021 hbz secured some funding by the Ministry of Culture and Science of North Rhine-Westphalia (MKW) for a project called Metadaten.nrw
It consists of two sub-projects, with one called "Infrastructure Initiative Metadata Services" being located in the Open Infrastructure team (OI) at hbz, where SkoHub development will take place.
We got four positions funded from which two are already filled:

- [Project coordination](https://blog.lobid.org/2022/08/19/job-projektkoordinatorin.html): Anna Keller (starts in December)
- SkoHub development: Steffen Rörtgen (started in November)
- DevOps developer: N.N. (will start in January)
- [Information specialist](https://blog.lobid.org/2022/07/26/job-informationsspezialistin.html): N.N. (need to publish second job posting)

The goal of the project is to expand the community of users for the existing metadata infrastructure provided by hbz/OI, with focus on libraries and scholars in North Rhine-Westphalia (NRW), and establish hbz as a competence center for metadata in NRW.
This means we will develop SkoHub further regarding the following topics:

- Further development of SkoHub PubSub in the context of a concrete use case
- Bringing the SkoHub reconciliation module into production
- Possibly picking up on [Annif](https://annif.org/) integration in a later project phase
- Training: SkoHub tutorials and workshops

### Community, PubSub & Reconciliation

To further encourage contributions like the one from Andreas with the reconciliation prototype, we reported to set up contributing guidelines to have a clear and transparent definition of the development and deployment process.

#### SkoHub PubSub

Afterwards we made a small (re)introduction to SkoHub PubSub and discussed about possible use cases.
We developed ideas about SkoHub PubSub serving as a communication hub between researchers for their research fields.
Certain research objects could be connected to concepts and central instances would be watching concepts inboxes to collect these objects and associated metadata.
This will be a decentralized approach of annotating objects with metadata with the help of open web technologies.
With the implementation of ActivityPub in Nextcloud this and further use cases could be facilitated.

Another topic was the idea of community building around concepts.
The Open Educational Resource Search Index as well as the WirLernenOnline project already use elaborated vocabularies to index their resources.
Interested humans could easily follow these concepts and engage in discussions around them.
This is also applicable to researchers that will be able to build up a topic-specific data base and open discussions about their research in the fediverse.
This also raised practical questions about what happens on the notification side with broader and narrower concepts.
If I'm following a concept do I also want to get notifications about its narrower or broader concepts?
These are questions that can be discussed further in our community.

#### SkoHub Reconciliation

Following the PubSub discussion Andreas presented his reconciliation prototype with already working implementations in OpenRefine as well as in TEI Publishers Annotation tool.
After showing the implementations with some examples we went into a technical deep dive.
Andreas walked us through the code and we discussed the current implementation as well as the future architecture of the SkoHub modules.

His current approach is based on the SkoHub Vocabs webhook part and reusing code from SkoHub PubSub regarding the elasticsearch indexing.
He integrated a `doreconc` query parameter to the webhook, which triggers a [script](https://github.com/mpilhlt/skohub-vocabs/blob/feature-reconc/src/populateReconciliation.js) that will populate the vocabulary to the [reconcile prototype](https://github.com/skohub-io/skohub-reconcile).
The prototype is based on the [Reconciliation API spec](https://reconciliation-api.github.io/), so it is interoperable and can be used for any kind of reconciliation supporting this specification.
The discussion also resulted in the proposal to separate SkoHub Vocabs from the webhook module to further separate concerns.

After the workshop we transferred the reconcile repository from Andreas to the SkoHub organization and are happy to start developing on it in the beginning of 2023.

### Final thoughts

The workshop was a great event to discuss with SkoHub users and those who want to be.
We collected valuable feedback and ideas for development in the upcoming two years.
Especially the sudden rise in awareness for the Fediverse opens up interesting use cases for SkoHub PubSub, which we are happy to engage in.
But the highglight of the workshop was the presentation of Andreas' reconciliation prototype and its transfer in the SkoHub organization.
This is a good example for the benefits of open source and use case driven development.
We are looking forward to future community events, more use cases and even more modules to be developed in the SkoHub ecosystem.

Links: 
- [Reconciliation API spec & ressources](https://reconciliation-api.github.io/) (e.g. a [list of databases offering a Reconciliation Endpoint](https://reconciliation-api.github.io/testbench/#/)) 
- [Reconciliation in OpenRefine](https://docs.openrefine.org/manual/reconciling), [lobid Blog entry](https://blog.lobid.org/2019/09/30/openrefine-examples.html), [HistHub Blog entry (dt.)](https://histhub.ch/reconciling/) 
- [Annotation in TEI Publisher](https://teipublisher.com/exist/apps/tei-publisher/doc/blog/tei-publisher-710.xml) 
- Prototype: [GitHub](https://github.com/skohub-io/skohub-reconcile)/[Test Instance](https://c111-064.cloud.gwdg.de/reconc/)
