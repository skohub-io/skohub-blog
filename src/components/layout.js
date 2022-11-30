import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faMastodon, faTwitter } from '@fortawesome/free-brands-svg-icons'
import skohubsvg from '../images/skohub-signet-color.svg'

const Layout = ({ location, title, children  }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header
  let footer
  const data = useStaticQuery(graphql`
    query SocialQuery {
      site {
        siteMetadata {
          social {
            github
            twitter
            mastodon
          }
        }
      }
    }
  `)
  const social = data.site.siteMetadata?.social
  const email = data.site.siteMetadata.email


  header = (
    <div>
      <div className="skohub-logo">
        <Link to="/"><img className="skohub-img" src={skohubsvg} alt="SkoHub" />
        <span className="skohub-title">{title}</span></Link>
      </div>
      <ul className="skohub-nav">
          <li><Link className="header-link" to="/">Blog</Link></li>
          <li><Link className="header-link" to="/about">About</Link></li>
          <li><Link className="header-link" to="https://skohub.io">Website</Link></li>
      </ul>
    </div>
  )

  footer = (
    <div className="wrapper-footer">
        <div className="footer-navigation">
          <ul>
            <li><Link to="/contact">Contact</Link></li>
            <li><a href="https://skohub.io" target="_blank">skohub.io</a></li>
            <li><a href="rss.xml">RSS-Feed</a></li>
            <li><a href={`https://openbiblio.social/@${social?.mastodon || ``}`}>
            Mastodon <FontAwesomeIcon icon={faMastodon}/></a></li>
            <li><a href={`https://twitter.com/${social?.twitter || ``}`}>
            Twitter <FontAwesomeIcon icon={faTwitter}/></a></li>
            <li><a href={`https://github.com/${social?.github || ``}`}>
            GitHub <FontAwesomeIcon icon={faGithub}/></a></li>
          </ul>
        </div>
    </div>
  )

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer>{footer}</footer>
    </div>
  )
}

export default Layout
