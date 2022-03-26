import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const work = () => (
  <Layout>
    <Seo title="Work" />
    <h1>Work</h1>
    <h2>Background</h2>
    <p>I'm a social media manager with data, community, and Canadian politics experience.</p>
    <p>Looking for social media or digital marketing services? Contact me at <span className="colourfulText">cfpolling🌀gmail.com</span>.</p>
    <h2>Experience</h2>
    <p><span className="colourfulText">2017-2022</span> Owner-operator, Polling Canada</p>
    <p><span className="colourfulText">2020-2022</span> Social media, Mainstreet Research</p>
    <p><span className="colourfulText">2022</span> Social media, Spadina—Fort York NDP</p>
  </Layout>
)

export default work