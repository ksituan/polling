import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import TimeColumn from "../components/TimeColumn"

import parties from "../../content/parties.json"
import polls from "../../content/polls.json"
import elections from "../../content/elections.json"

const federalTimeline = () => (
  <Layout>
    <Seo title="Federal Timeline" description="Timeline of Canadian politics" />
    <h1>Federal Timeline</h1>
    <p>Did you know Polling Canada also has a lot of historical data? This page gives a quick overview of all the federal elections in our database. Click any election to go to a more detailed page.</p>
    <div className="federalTimeline" style={{maxWidth: "none"}}>
        <TimeColumn jurisdiction="Canada" column="1" parties={parties.content["Canada"]} polls={polls.filter(x => x.jurisdiction === "Canada")} elections={elections} />
    </div>
    <h2>Got old polls?</h2>
    <p>We're always looking to push our coverage back even further. Please get in touch if you have any historical data for us!</p>
  </Layout>
)

export default federalTimeline