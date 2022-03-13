import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

import PollingContent from "../components/PollingContent"
import DashProvince from "../components/DashProvince"
import DashCanada from "../components/DashCanada"

import polls from "../../content/polls.json"
import elections from "../../content/elections.json"
import parties from "../../content/parties.json"

const IndexPage = () => (
  <Layout>
    <Seo title="Polling Canada" />
    <h1>Welcome to Polling Canada!</h1>
    <h2>Provincial Polls</h2>
    <div className="dashProvs">
    <DashProvince jurisdiction="BC"/>
    <DashProvince jurisdiction="AB"/>
    <DashProvince jurisdiction="SK"/>
    <DashProvince jurisdiction="MB"/>
    <DashProvince jurisdiction="ON"/>
    <DashProvince jurisdiction="QC"/>
    <DashProvince jurisdiction="NB"/>
    <DashProvince jurisdiction="PE"/>
    <DashProvince jurisdiction="NS"/>
    <DashProvince jurisdiction="NL"/>
    </div>
    <h2>Federal Polls</h2>
    <DashCanada />
    <div className="dashFed">
    <DashProvince jurisdiction="Canada_BC"/>
    <DashProvince jurisdiction="Canada_AB"/>
    <DashProvince jurisdiction="Canada_SKMB"/>
    <DashProvince jurisdiction="Canada_ON"/>
    <DashProvince jurisdiction="Canada_QC"/>
    <DashProvince jurisdiction="Canada_ATL"/>
    </div>

    <h2>About Polling Canada</h2>

    <p>My name is Curtis Fric, and I've been running Polling Canada since 2017.  I was a bored university student in my second year, and figured there had to be a better way to collect various bits of polling from around the country.</p>
    <p>I ensure that reputable polling data is provided to the public in a way that's clear, concise, and free of political commentary.</p>
    <p>Find my accounts on Twitter here:</p>
    
    <p>
      <Link to="/faq/">Frequently Asked Questions</Link>
    </p>
  </Layout>
)

export default IndexPage
