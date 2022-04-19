/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "../css/style.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  React.useEffect(() => {
    window.addEventListener("scroll", () => {
      // Dealing with Safari difference.
      // look into scrollingElement https://caniuse.com/#feat=document-scrollingelement
      let scrollTop = document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop; 
      let newPos = scrollTop + "px";
      document.documentElement.style.setProperty('--scrollPos', newPos);
    });
  }, []);

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div>
        <main>{children}</main>
        <footer>
          <p>🄯 {new Date().getFullYear()} {"//"} site by <a href="https://awmcphee.ca" target="_blank" rel="noreferrer">Prairie Heart Workshop</a></p>
          <p>Creative Commons (<a href="https://creativecommons.org/licenses/by-nc-sa/4.0" target="_blank" rel="noreferrer">CC BY-NC-SA 4.0</a>)</p>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
