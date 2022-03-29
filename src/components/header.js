import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import logo from "../images/can_poll_logo.svg"

const Header = ({ siteTitle }) => (
  <header>
      <Link
          to="/"
          style={{
            color: `black`,
            textDecoration: `none`
          }}
        >
      <div>
      <img src={logo} alt="" width="80px" style={{ padding: "1rem"}} />
      <h1 className="siteTitle" style={{ margin: 0, backgroundImage: `none`, textAlign: "left", display: "inline", position: "relative", top: "-2.25rem" }}>
          {siteTitle}
      </h1>
      </div>
      </Link>
      <div className="navMenu">
      <Link to="/faq" className="headerLink">FAQ</Link>
      <Link to="/maps" className="headerLink">Maps</Link>
      <Link to="/work" className="headerLink">Work</Link>
      </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
