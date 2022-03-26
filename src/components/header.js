import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import logo from "../images/can_poll_logo.svg"

const Header = ({ siteTitle }) => (
  <header
    style={{
      paddingBottom: "8rem",
    }}
  >
    <div
      style={{
        position: "fixed",
        width: "100%",
        backgroundColor: "white",
        margin: `0 auto`,
        zIndex: 5
      }}
    >
      <img src={logo} width="80px" style={{ padding: "1rem"}} />
      <h1 style={{ margin: 0, backgroundImage: `none`, textAlign: "left", display: "inline", position: "relative", top: "-2.25rem" }}>
        <Link
          to="/"
          style={{
            color: `black`,
            textDecoration: `none`
          }}
        >
          {siteTitle}
        </Link>
      </h1>
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
