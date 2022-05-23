/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faTwitter, faMastodon } from '@fortawesome/free-brands-svg-icons'

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
            twitter
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
  const social = data.site.siteMetadata?.social

  return (
    <div  className="bio">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["AUTO", "WEBP", "AVIF"]}
        src="../images/skohub.png"
        width={50}
        height={50}
        quality={95}
        alt="Skohub logo"
      />
      {author?.name && (
       <div>
        <p>
          {description}
          {` `}
          This blog is maintained by <strong>{author.name}</strong>.
        </p>
        <p>
          <a href={`https://github.com/${social?.github || ``}`}
             style={{
              fontSize: `1.75em`,
              padding: `0em 0.2em`,
              color: `#000`,
              boxShadow: `none`,
            }}>
          <FontAwesomeIcon icon={faGithub}/>
          </a>
          {` | `}
          <a href={`https://twitter.com/${social?.twitter || ``}`}
             style={{
              fontSize: `1.75em`,
              padding: `0em 0.2em`,
              color: `#005b99`,
              boxShadow: `none`,
          }}>
          <FontAwesomeIcon icon={faTwitter}/>
          </a>
          {` | `}
          <a href={`https://openbiblio.social/@${social?.mastodon || ``}`}
             style={{
              fontSize: `1.75em`,
              padding: `0em 0.2em`,
              color: `#3088d4`,
              boxShadow: `none`,
          }}>
          <FontAwesomeIcon icon={faMastodon}/>
          </a>
        </p>
       </div>
      )}
    </div>
  )
}

export default Bio
