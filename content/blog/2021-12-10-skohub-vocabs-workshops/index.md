---
title: SKOS Introduction workshops with SkoHub Vocabs
date: "2021-12-10"
description: We facilitated two workshops in November with the goal to introduce participants into Simple Knowledge Organization System (SKOS) by hands-on learning how to publish a small vocabulary with SkoHub Vocabs.
authors: [{lastname: "Pohl",
           firstname: "Adrian",
           id: "http://lobid.org/team/ap#" },
           {lastname: "Rörtgen",
           firstname: "Steffen"}]
---

We facilitated two workshops in November with the goal to introduce participants into Simple Knowledge Organization System (SKOS) by hands-on learning how to publish a small vocabulary with SkoHub Vocabs. The first one "Eine Einführung in SKOS mit SkoHub Vocabs" was held as a cooperation between the Hochschulbibliothekszentrum NRW and the Göttingen eResearch Alliance with 14 German-speaking participants on 2021-11-02, see the [workshop pad](https://pad.gwdg.de/s/OCbQBibi2) and the [slides](https://pad.gwdg.de/p/einfuehrung-in-skos-mit-skohub).

As the workshop worked quite well, we applied the same approach to our Workshop "An Introduction to SKOS with SkoHub-Vocabs" on 2021-11-30 at [SWIB21](https://swib.org/swib21) ([slides](https://pad.gwdg.de/p/introduction-in-skos-with-skohub)) with around 20 participants.

[![First slide of the SKOS introduction workshop at SWIB21](/slides.png)](https://pad.gwdg.de/p/introduction-in-skos-with-skohub)

Generally, we had the impression that participants of both workshops where having a good time, at least nobody left the conference room before the end of the workshop. Here are some notes and lessons learned we collected after the SWIB workshop:

- We invited participants to share their screen to not be talking to the void. Around 4-5 participants followed our invitation which was ok for us.
- Many participants joined without their microphones connected. We missed to explicitly ask them to turn their mics on.
- We introduced ourselves and used the BigBlueButton poll feature to get to know the participants and their previous experience bit more.
- We divided the workshop into two parts: an introduction as a frontal presentation and a hands-on part with discussion and Q&A phases in between. Though this worked quite well, we think it might be nice to switch more often between explanatory parts and hands-on parts.
- Participants were a bit shy. We got some good feedback in the chat at the end but only from some participants. Next time, we should prepare another poll for getting feedback at the end of the workshop

With regard to the further development of SkoHub Vocabs, it became clear during the workshops that it would be great to have an automatic test with each commit that lets you know whether a SKOS/Turtle file in a repo is "SkoHub-ready", i.e. conforms to the pattern that is supported by SkoHub Vocabs. [Issue #91](https://github.com/skohub-io/skohub-vocabs/issues/91) is already addressing this need and should be worked on to accomplish this.
