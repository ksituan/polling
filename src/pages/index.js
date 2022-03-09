import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

import PollingContent from "../components/PollingContent"

import polls from "../../content/polls.json"
import elections from "../../content/elections.json"
import parties from "../../content/parties.json"

const IndexPage = () => (
  <Layout>
    <Seo title="Polling Canada" />
    <h1>Polling Canada</h1>
    <h2>Welcome to Polling Canada!</h2>
    <p>I'm Curtis, and these are my posts.</p>
    <h2>Canada</h2>
    <PollingContent jurisdiction="Canada" election={elections.content.Canada[0]} />
    <h2>British Columbia</h2>
    <PollingContent jurisdiction="BC" election={elections.content.BC[0]} />
    <h2>Alberta</h2>
    <PollingContent jurisdiction="AB" election={elections.content.AB[0]} />
    <h2>Saskatchewan</h2>
    <PollingContent jurisdiction="SK" election={elections.content.SK[0]} />
    <h2>Manitoba</h2>
    <PollingContent jurisdiction="MB" election={elections.content.MB[0]} />
    <p>
      <Link to="/faqs/">Frequently Asked Questions</Link>
    </p>
  </Layout>
)

export default IndexPage
