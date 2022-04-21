import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import TimeColumn from "../components/TimeColumn"

import parties from "../../content/parties.json"
import polls from "../../content/polls.json"
import elections from "../../content/elections.json"

const timeline = () => (
  <Layout>
    <Seo title="Timeline" description="Timeline of Canadian politics" />
    <h1>Provincial Timeline</h1>
    <p>Did you know Polling Canada also has a lot of historical data? This page gives a quick overview of all the provincial elections in our database. Click any election to go to a more detailed page.</p>
    <div className="timeline" style={{maxWidth: "none"}}>
        <TimeColumn jurisdiction="BC" column="1" parties={parties.content["BC"]} polls={polls.filter(x => x.jurisdiction === "BC")} elections={elections} />
        <TimeColumn jurisdiction="AB" column="2" parties={parties.content["AB"]} polls={polls.filter(x => x.jurisdiction === "AB")} elections={elections} />
        <TimeColumn jurisdiction="SK" column="3" parties={parties.content["SK"]} polls={polls.filter(x => x.jurisdiction === "SK")} elections={elections} />
        <TimeColumn jurisdiction="MB" column="4" parties={parties.content["MB"]} polls={polls.filter(x => x.jurisdiction === "MB")} elections={elections} />
        <TimeColumn jurisdiction="ON" column="5" parties={parties.content["ON"]} polls={polls.filter(x => x.jurisdiction === "ON")} elections={elections} />
        <TimeColumn jurisdiction="QC" column="6" parties={parties.content["QC"]} polls={polls.filter(x => x.jurisdiction === "QC")} elections={elections} />
        <TimeColumn jurisdiction="NB" column="7" parties={parties.content["NB"]} polls={polls.filter(x => x.jurisdiction === "NB")} elections={elections} />
        <TimeColumn jurisdiction="PE" column="8" parties={parties.content["PE"]} polls={polls.filter(x => x.jurisdiction === "PE")} elections={elections} />
        <TimeColumn jurisdiction="NS" column="9" parties={parties.content["NS"]} polls={polls.filter(x => x.jurisdiction === "NS")} elections={elections} />
        <TimeColumn jurisdiction="NL" column="10"parties={parties.content["NL"]} polls={polls.filter(x => x.jurisdiction === "NL")} elections={elections} />
    </div>
    <h2>Got old polls?</h2>
    <p>We're always looking to push our coverage back even further. Please get in touch if you have any historical data for us!</p>
  </Layout>
)

export default timeline