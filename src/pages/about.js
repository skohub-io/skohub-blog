import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const About = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="About" />
      <p>
      SkoHub supports a novel approach for finding content on the web. The general idea is to extend 
      the scope of Knowledge Organization Systems (KOS) to also act as communication hubs for publishers 
      and information seekers. In effect, SkoHub allows to follow specific subjects in order to be notified 
      when new content about that subject is published.
      </p>
      <p>
      The approach is realized by putting Knowledge Organization Systems online according to the SKOS 
      standard. Additionally, they are exposed using the (social) networking protocols
      {` `}
      <a href="https://activitypub.rocks/">ActivityPub</a>
      {` `}and{` `}
      <a href="https://www.w3.org/TR/ldn/">Linked Data Notifications</a>
      . This effectively turns the published vocabularies into hubs that provide structured metadata 
      about and links to web content in real time.  
      </p>
      
      <p>
      The project to create a production-ready version of SkoHub has been carried out by the
      {` `}
      <a href="https://www.hbz-nrw.de/">North-Rhine Westphalian Library Service Centre (hbz)</a>
      {` `}
      in cooperation with
      {` `}
      <a href="http://graphthinking.com/">graphthinking GmbH</a>
      {` `}
      with four deliverables. The core is the back end infrastructure for publishing vocabularies 
      on the web (Skohub Vocabs) and for receiving and pushing notifications (SkoHub PubSub). 
      Additionally, we provide an editor to describe web resources according to a common metadata 
      schema and to send notifications (SkoHub Editor). The editor can also be used as a browser 
      plugin for Firefox and Chrome (SkoHub Extension).
      </p>

    </Layout>
  )
}

export default About

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`