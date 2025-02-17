import * as React from "react"
import { graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import at from "../images/at.svg"

import Layout from "../components/layout"
import Seo from "../components/seo"

import DashProvince from "../components/DashProvince"
import DashCanada from "../components/DashCanada"
import DashFedProvince from "../components/DashFedProvince"
import Calendar from "../components/Calendar"
import Sovereignty from "../components/Sovereignty"

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
    <div className="curtisContainer" style={{display: "flex", gap: "2rem", alignItems: "center"}}>
      <StaticImage className="curtis" src="../images/curtis_1.jpg" alt="An informal headshot of Curtis." width={100} height={120} />
      <p style={{margin: 0}}>Isn't it nice how this site has no ads? Why not help keep it that way by donating to my <a href="https://ko-fi.com/polling" target="_blank" rel="noreferrer">Ko-fi</a>, or send an Interac e-transfer to <span className="colourfulText">cfpolling<img className="at" src={at} alt=" at "/>gmail.com</span>.</p>
    </div>
    {data.electionCanada.nodes[0].nextWrit ?
    <div>
      <h1>Federal Polls</h1>
      <DashCanada polls={data.pollsCanada} election={data.electionCanada.nodes[0]}/>
      <div className="dashFed">
        {federalJurisdictions.map(jurisdiction => (
          <DashFedProvince jurisdiction={jurisdiction} polls={data[`polls${jurisdiction}`]} election={data[`election${jurisdiction}`].nodes[0]}  />
        ))}
      </div>
      <h1>Provincial Polls</h1>
      <div className="dashProvs">
        {provinces.map(jurisdiction => (
          <DashProvince jurisdiction={jurisdiction} polls={data[`polls${jurisdiction}`]} election={data[`election${jurisdiction}`].nodes[0]}  />
        ))} 
      </div>
    </div>
    :
    <div>
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
          <DashFedProvince jurisdiction={jurisdiction} polls={data[`polls${jurisdiction}`]} election={data[`election${jurisdiction}`].nodes[0]}  />
        ))}
      </div>
    </div>
    }

    {/* <h1>Sovereignty</h1>
    <Sovereignty polls={data[`pollsSovereignty`]} election={data[`electionSovereignty`].nodes[0]} /> */}

    {/* <h1>Election Calendar</h1>
    <Calendar /> */}

    <h1>About</h1>
    <p>My name is Curtis Fric, and I've been running Polling Canada since 2017.  I was a bored university student in my second year, and figured there had to be a better way to gather public polling from around the country. From humble beginnings, P.C. & Co. now enjoys 204,000 followers across multiple platforms, with millions of views every month.</p>
    <p>My message to campaigns: If you misrepresent publicly available numbers, I will find you.</p>
    <p>Follow me on <a href="https://twitter.com/CanadianPolling" target="_blank" rel="noreferrer">Twitter</a>, <a href="https://bsky.app/profile/canadianpolling.bsky.social" target="_blank" rel="noreferrer">Bluesky</a>, <a href="https://www.facebook.com/CanadianPolling" target="_blank" rel="noreferrer">Facebook</a>, and <a href="https://canadianpolling.substack.com/" target="_blank" rel="noreferrer">Substack</a> or help me keep this site ad-free by <a href="https://ko-fi.com/polling" target="_blank" rel="noreferrer">sending me money</a>.</p>
    
    <h1>Fun Stuff</h1>
    <div className="gameBox">
      <Link className="gameCard" to="/mp-name-game">
        <StaticImage src="../images/name_game.png" alt="A screenshot of the MP Name Game" />
        <p>MP Name Game</p>
      </Link>
      <a className="gameCard" href="https://pronghornmaps.com/census-game" target="_blank" rel="noreferrer">
        <StaticImage src="../images/census_game.png" alt="A screenshot of Alex's Census Game" />
        <p>Alex's Census Game</p>
      </a>
      <a className="gameCard" href="http://www.election-atlas.ca" target="_blank" rel="noreferrer">
        <StaticImage src="../images/election_atlas.png" alt="A screenshot of the Election Atlas" />
        <p>election-atlas.ca</p>
      </a>
    </div>
    </Layout>
)

export default IndexPage
export const query = graphql`
{
  pollsCanada: recentElectionPolls(jurisdiction: "Canada") {
    ...PollInformation
    company
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
    company
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
    company
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
    company
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
    company
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
    company
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
    company
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
    company
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
    company
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
    company
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
    company
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
    company
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
    company
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
    company
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
    company
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
    company
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
    company
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
  pollsSovereignty: recentElectionPolls(jurisdiction: "Sovereignty") {
    ...PollInformation
    company
  }
  electionSovereignty: allElectionsJson(
    filter: {jurisdiction: {eq: "Sovereignty"}}
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
