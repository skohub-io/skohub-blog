/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
          }
          social {
            mastodon
            github
          }
          description
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const description = data.site.siteMetadata?.description

  return (
    <div  className="bio">
      {author?.name && (
       <div>
        <p>
          {description}
          {` `}
          This blog is maintained by <strong>{author.name}</strong>.
        </p>
       </div>
      )}
    </div>
  )
}

export default Bio
