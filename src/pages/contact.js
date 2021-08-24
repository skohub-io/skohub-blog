import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Contact = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const email = data.site.siteMetadata.email
  const social = data.site.siteMetadata.social

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Contact" />
      <p>
        Contact via <a href={`mailto:${email}`}>e-mail</a> and feel free to open issues in the 
        different repositories of
        {` `}
        <a href={`https://github.com/${social?.github}/skohub-editor/issues?q=`}>Skohub Editor</a>
        ,{` `}
        <a href={`https://github.com/${social?.github}/skohub-vocabs/issues?q=`}>Skohub Vocabs</a>
        ,{` `}
        <a href={`https://github.com/${social?.github}/skohub-pubsub/issues?q=`}>Skohub Pubsub</a>
        {` `}and{` `} 
        <a href={`https://github.com/${social?.github}/skohub-extension/issues?q=`}>Skohub Extension</a>, 
        not only for bugs or enhancements, but also questions about Skohub usage, or to share your experiences.
      </p>
    </Layout>
  )
}

export default Contact

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        email
        social {
          github
        }
      }
    }
  }
`
