---
title: Development of SKOS SHACL shape
date: "2023-11-22"
authors: [{lastname: "Rörtgen",
           firstname: "Steffen",
           id: "https://lobid.org/team/sr#"}]
---

To improve the error messages thrown by SkoHub Vocabs for invalid RDF Turtle files, we decided to implement a validation step, before the static site of a vocabulary gets built with the [Gatsby framework](https://www.gatsbyjs.com/).
This validation step should provide more meaningful error messages than the currently cryptic ones thrown by Gatsby.
While we could have gone with one of the existing SKOS validator tools like [SKOS Play!](https://skos-play.sparna.fr/play/), [SKOSify](http://www.w3.org/2001/sw/wiki/Skosify) or [Poolparty](https://www.poolparty.biz/skos-and-skos-xl) (it's pretty epensive) we decided to go with a more generic approach and define the shape rules not in code, but in data.

<img src="shacl-logo.png" alt="SHACL logo" width="50"/>

If you want to validate the shape of an RDF graph, you currently have two options to do that. You can either use [Shape Expressions (ShEx)](https://shex.io/shex-primer/index.html) or the [Shapes Constraint Language (SHACL)](https://www.w3.org/TR/shacl/).
We decided to go with SHACL for the following reasons:

- slightly better tooling (e.g. the zazuko Team provides a JS Validation library [rdf-validte-shacl](https://github.com/zazuko/rdf-validate-shacl))
- there were some existing SKOS-XL SHACL definitions published by the Publications Office of the European Union: https://op.europa.eu/en/web/eu-vocabularies/application-profiles

Unfortunately the SKOS-XL shape did not work with our tooling ([Apache Jena SHACL](https://jena.apache.org/documentation/shacl/)) out of the box.
  Therefore we decided to build a SKOS shape from the ground up based on the [SKOS Reference](https://www.w3.org/TR/skos-reference/).

## SKOS Reference Shape

The goal was to implement every consistency example from the SKOS Reference as a test case for the shape.
To accomplish this it was on the one hand needed to formalize the class and property definitions from the spec as well as the integrity conditions.
On the other hand we needed a triple store with reasoning capabilities to apply these rules to the very basic examples in the reference.
We used the Apache Jena tooling for this and built a [jena-docker containers](https://github.com/skohub-io/jena-docker) based on the docker containers of [this repo](https://github.com/stain/jena-docker).
The SKOS class and property definitions are defined in [this file](https://github.com/skohub-io/shapes/blob/main/skosClassAndPropertyDefinitions.ttl).
The workflow for validating the SKOS shape is as follows:

1. The fuseki container is started with the [inference configuration](https://github.com/skohub-io/shapes/blob/main/fuseki/config_inference.ttl).
2. The class and property definitions are appended to `skos.shacl.ttl` file which is mounted in the container.
3. The respective example is mounted in the container as a ttl file (e.g. [example05](https://github.com/skohub-io/shapes/blob/main/tests/valid/skos.shacl.ttl/ex05.ttl) )
4. The validation result (which is itself a RDF graph) is temporarily stored
5. The validation result is [queried with SPARQL for errors](https://github.com/skohub-io/shapes/blob/main/scripts/checkForViolation.rq)
6. Based on the query result an error message is put out

This way we accomplished to validate all valid examples from the SKOS reference up to [example 68](https://www.w3.org/TR/skos-reference/#example-68) as valid and all the invalid examples as invalid (entailment vs non-entailment examples were left out).

## SkoHub Shape

In SkoHub Vocabs we are a bit stricter regarding some aspects of the SKOS reference.
For example we want every `skos:Concept` to have at least one `skos:prefLabel`.
Therefore we developed a SkoHub specific shape with [`skohub.shacl.ttl`](https://github.com/skohub-io/shapes/blob/main/skohub.shacl.ttl).
In contrast to the generic SKOS shape this shape does **not** contain any [SPARQL based SHACL constraints](https://www.w3.org/TR/shacl/#sparql-constraints).
Though it is possible and especially for more elaborated queries useful to use SPARQL to check constraints, the available tools (at least for javascript [rdf-validate-shacl](https://github.com/zazuko/rdf-validate-shacl)) do not support such queries.

As a result, validation errors and warnings help SkoHub users to improve the quality of their vocabularies. See for example the validation warning for no provided license:


```
-----------Warning--------------
Message:  [
  Literal {
    value: 'A provided license increases reusability of a vocabulary. Should be an URI.',
    language: '',
    datatype: NamedNode { value: 'http://www.w3.org/2001/XMLSchema#string' }
  }
]
Path:  http://purl.org/dc/terms/license
Node, where the error occured:  http://w3id.org/example-cs/
Severity of error:  http://www.w3.org/ns/shacl#Warning
```

Or the validation error if the object of `skos:hasTopConcept` is not a `skos:Concept`:


```
-----------Violation--------------
Message:  [
  Literal {
    value: 'The target class for hasTopConcept should be skos:Concept',
    language: '',
    datatype: NamedNode { value: 'http://www.w3.org/2001/XMLSchema#string' }
  }
]
Path:  http://www.w3.org/2004/02/skos/core#hasTopConcept
Node, where the error occured:  http://w3id.org/example-cs/
Severity of error:  http://www.w3.org/ns/shacl#Violation
```

## Outlook

We were quite a bit surprised that we did not find any usable existing SKOS SHACL shape.
Hopefully our work may help others validating their SKOS files and improve the overall quality of vocabularies.
There is currently still [an open ticket](https://github.com/skohub-io/shapes/issues/9) for implementing the [qSKOS best practice rules](https://github.com/cmader/qSKOS/wiki/Quality-Issues#Ambiguous_Notation_References).
Any feedback and collaboration on the shapes is welcome!

