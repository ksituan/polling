import * as React from "react"
import { graphql } from "gatsby"
import at from "../images/at.svg"

import Layout from "../components/layout"
import Seo from "../components/seo"

import DashProvince from "../components/DashProvince"
import DashCanada from "../components/DashCanada"

const provinces = [
  "BC",
  "AB",
  "SK",
  "MB",
  "ON",
  "QC",
  "NB",
  "PE",
  "NS",
  "NL",
]

const federalJurisdictions = [
  "Canada_BC",
  "Canada_AB",
  "Canada_SKMB",
  "Canada_ON",
  "Canada_QC",
  "Canada_ATL",
]

const IndexPage = ({pageContext, data}) => (
  <Layout>
    <Seo title="Polling Canada" />
    <p>Polling Canada is your trusted source of raw political data. It's also a one-man project. Donate to my <a href="https://ko-fi.com/polling" target="_blank" rel="noreferrer">Ko-fi</a>, or send an Interac e-transfer to <span className="colourfulText">cfpolling<img className="at" src={at} alt=" at "/>gmail.com</span>.</p>
    <h1>Provincial Polls</h1>
    <div className="dashProvs">
      {provinces.map(jurisdiction => (
        <DashProvince jurisdiction={jurisdiction} polls={data[`polls${jurisdiction}`]} election={data[`election${jurisdiction}`].nodes[0]}  />
      ))} 
    </div>
    <h1>Federal Polls</h1>
      <DashCanada polls={data.pollsCanada} election={data.electionCanada.nodes[0]}/>
    <div className="dashFed">
      {federalJurisdictions.map(jurisdiction => (
        <DashProvince jurisdiction={jurisdiction} polls={data[`polls${jurisdiction}`]} election={data[`election${jurisdiction}`].nodes[0]}  />
      ))}
    </div>

    <h1>About</h1>

    <p>My name is Curtis Fric, and I've been running Polling Canada since 2017.  I was a bored university student in my second year, and figured there had to be a better way to gather public polling from around the country. From humble beginnings, P.C. now enjoys 45,000 followers across multiple platforms, with millions of views every month.</p>
    <p>My message to campaigns: If you misrepresent publicly available numbers, I will find you.</p>
    <p>Follow me on <a href="https://twitter.com/CanadianPolling" target="_blank" rel="noreferrer">Twitter</a> and <a href="https://www.facebook.com/CanadianPolling" target="_blank" rel="noreferrer">Facebook</a>.</p>
    </Layout>
)

export default IndexPage
export const query = graphql`
  query {
    pollsCanada: recentElectionPolls(jurisdiction: "Canada") {
      ...PollInformation
    }
    electionCanada: allElectionsJson(
      filter: {jurisdiction: {eq: "Canada"}}
      sort: {fields: date, order: DESC}
      limit: 1
    ) {
        nodes {
          ...ElectionInformation
          year: date(formatString: "YYYY")
        }
    }
    pollsBC: recentElectionPolls(jurisdiction: "BC") {
      ...PollInformation
    }
    electionBC: allElectionsJson(
      filter: {jurisdiction: {eq: "BC"}}
      sort: {fields: date, order: DESC}
      limit: 1
    ) {
        nodes {
          ...ElectionInformation
          year: date(formatString: "YYYY")
        }
    }
    pollsAB: recentElectionPolls(jurisdiction: "AB") {
      ...PollInformation
    }
    electionAB: allElectionsJson(
      filter: {jurisdiction: {eq: "AB"}}
      sort: {fields: date, order: DESC}
      limit: 1
    ) {
        nodes {
          ...ElectionInformation
          year: date(formatString: "YYYY")
        }
    }
    pollsSK: recentElectionPolls(jurisdiction: "SK") {
      ...PollInformation
    }
    electionSK: allElectionsJson(
      filter: {jurisdiction: {eq: "SK"}}
      sort: {fields: date, order: DESC}
      limit: 1
    ) {
        nodes {
          ...ElectionInformation
          year: date(formatString: "YYYY")
        }
    }
    pollsMB: recentElectionPolls(jurisdiction: "MB") {
      ...PollInformation
    }
    electionMB: allElectionsJson(
      filter: {jurisdiction: {eq: "MB"}}
      sort: {fields: date, order: DESC}
      limit: 1
    ) {
        nodes {
          ...ElectionInformation
            year: date(formatString: "YYYY")
        }
    }
    pollsON: recentElectionPolls(jurisdiction: "ON") {
      ...PollInformation
    }
    electionON: allElectionsJson(
      filter: {jurisdiction: {eq: "ON"}}
      sort: {fields: date, order: DESC}
      limit: 1
    ) {
        nodes {
          ...ElectionInformation
          year: date(formatString: "YYYY")
        }
    }
    pollsQC: recentElectionPolls(jurisdiction: "QC") {
      ...PollInformation
    }
    electionQC: allElectionsJson(
      filter: {jurisdiction: {eq: "QC"}}
      sort: {fields: date, order: DESC}
      limit: 1
    ) {
        nodes {
          ...ElectionInformation
          year: date(formatString: "YYYY")
        }
    }
    pollsNB: recentElectionPolls(jurisdiction: "NB") {
      ...PollInformation
    }
    electionNB: allElectionsJson(
      filter: {jurisdiction: {eq: "NB"}}
      sort: {fields: date, order: DESC}
      limit: 1
    ) {
        nodes {
          ...ElectionInformation
          year: date(formatString: "YYYY")
        }
    }
    pollsPE: recentElectionPolls(jurisdiction: "PE") {
      ...PollInformation
    }
    electionPE: allElectionsJson(
      filter: {jurisdiction: {eq: "PE"}}
      sort: {fields: date, order: DESC}
      limit: 1
    ) {
        nodes {
          ...ElectionInformation
          year: date(formatString: "YYYY")
        }
    }
    pollsNS: recentElectionPolls(jurisdiction: "NS") {
      ...PollInformation
    }
    electionNS: allElectionsJson(
      filter: {jurisdiction: {eq: "NS"}}
      sort: {fields: date, order: DESC}
      limit: 1
    ) {
        nodes {
          ...ElectionInformation
          year: date(formatString: "YYYY")
        }
    }
    pollsNL: recentElectionPolls(jurisdiction: "NL") {
      ...PollInformation
    }
    electionNL: allElectionsJson(
      filter: {jurisdiction: {eq: "NL"}}
      sort: {fields: date, order: DESC}
      limit: 1
    ) {
        nodes {
          ...ElectionInformation
          year: date(formatString: "YYYY")
        }
    }
    pollsCanada_BC: recentElectionPolls(jurisdiction: "Canada_BC") {
      ...PollInformation
    }
    electionCanada_BC: allElectionsJson(
      filter: {jurisdiction: {eq: "Canada_BC"}}
      sort: {fields: date, order: DESC}
      limit: 1
    ) {
        nodes {
          ...ElectionInformation
          year: date(formatString: "YYYY")
        }
    }
    pollsCanada_AB: recentElectionPolls(jurisdiction: "Canada_AB") {
      ...PollInformation
    }
    electionCanada_AB: allElectionsJson(
      filter: {jurisdiction: {eq: "Canada_AB"}}
      sort: {fields: date, order: DESC}
      limit: 1
    ) {
        nodes {
          ...ElectionInformation
          year: date(formatString: "YYYY")
        }
    }
    pollsCanada_SKMB: recentElectionPolls(jurisdiction: "Canada_SKMB") {
      ...PollInformation
    }
    electionCanada_SKMB: allElectionsJson(
      filter: {jurisdiction: {eq: "Canada_SKMB"}}
      sort: {fields: date, order: DESC}
      limit: 1
    ) {
        nodes {
          ...ElectionInformation
          year: date(formatString: "YYYY")
        }
    }
    pollsCanada_ON: recentElectionPolls(jurisdiction: "Canada_ON") {
      ...PollInformation
    }
    electionCanada_ON: allElectionsJson(
      filter: {jurisdiction: {eq: "Canada_ON"}}
      sort: {fields: date, order: DESC}
      limit: 1
    ) {
        nodes {
          ...ElectionInformation
          year: date(formatString: "YYYY")
        }
    }
    pollsCanada_QC: recentElectionPolls(jurisdiction: "Canada_QC") {
      ...PollInformation
    }
    electionCanada_QC: allElectionsJson(
      filter: {jurisdiction: {eq: "Canada_QC"}}
      sort: {fields: date, order: DESC}
      limit: 1
    ) {
        nodes {
          ...ElectionInformation
          year: date(formatString: "YYYY")
        }
    }
    pollsCanada_ATL: recentElectionPolls(jurisdiction: "Canada_ATL") {
      ...PollInformation
    }
    electionCanada_ATL: allElectionsJson(
      filter: {jurisdiction: {eq: "Canada_ATL"}}
      sort: {fields: date, order: DESC}
      limit: 1
    ) {
        nodes {
          ...ElectionInformation
          year: date(formatString: "YYYY")
        }
    }
  }
`
