import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

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
          }
        }
      }
    }
  `)
  const social = data.site.siteMetadata?.social
  const email = data.site.siteMetadata.email


  header = (
    <div>
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
      <Link className="header-link" to="/">
        Blog
      </Link>
      {` | `}
      <Link className="header-link" to="/about">
        About
      </Link>
    </div>
  )

  footer = (
    <div>
      <Link to="/contact">Contact</Link>
      {` | `}
      <a href="http://www.skohub.io">skohub.io</a>
      {` | `}
      <a href={`https://github.com/${social?.github || ``}`}>
        GitHub <FontAwesomeIcon icon={faGithub} style={{ color: `#000`}}/>
      </a>
      {` | `}
      <a href="rss.xml">Feed</a>
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
