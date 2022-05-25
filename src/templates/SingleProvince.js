import * as React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import PollingContent from "../components/PollingContent";
import Seo from "../components/seo"

let provinceOrder = ['BC', 'AB', 'SK', 'MB', 'ON', 'QC', 'NB', 'PE', 'NS', 'NL'];

let title = {
  Canada: "Federal polling",
  Canada_BC: "British Columbia federal polling",
  Canada_AB: "Alberta federal polling",
  Canada_SKMB: "Sask./Man. federal polling",
  Canada_ON: "Ontario federal polling",
  Canada_QC: "Quebec federal polling",
  Canada_ATL: "Atlantic federal polling",
  BC: "British Columbia provincial polling",
  AB: "Alberta provincial polling",
  SK: "Saskatchewan provincial polling",
  MB: "Manitoba provincial polling",
  ON: "Ontario provincial polling",
  QC: "Quebec provincial polling",
  NB: "New Brunswick provincial polling",
  PE: "Prince Edward Island provincial polling",
  NS: "Nova Scotia provincial polling",
  NL: "Nfld. & Lab. provincial polling",
  YT: "Yukon territorial polling",
}

export default function SingleProvince({pageContext, data}) {
    const {jurisdiction, jurisdictionName, beforeDate} = pageContext;
    const polls = data.allPollsJson.nodes;
    const election = data.prevElection;
    const pageTitle = `${jurisdictionName} ${jurisdiction.split("_")[0] !== "Canada" ? (jurisdiction === "YT" ? "territorial" : "provincial") : ""} polling`;

    const lastProvince = jurisdiction === 'BC' ? 'NL' : provinceOrder[provinceOrder.findIndex(x => x === jurisdiction) - 1];
    const nextProvince = jurisdiction === 'NL' ? 'BC' : provinceOrder[provinceOrder.findIndex(x => x === jurisdiction) + 1];

    return(
        <Layout>
        <Seo title={pageTitle} description={`Database of polls conducted since the ${new Date(election.date).getFullYear()} ${jurisdiction.split("_")[0] === "Canada" ? "federal" : jurisdictionName + " " + (jurisdiction === "YT" ? "territorial" : "provincial")} election.`} />
            <h1>{pageTitle}</h1>
            <p>This page lists every publicly accessible poll conducted by a reputable firm after the {new Date(election.date).getFullYear()} {jurisdiction.split("_")[0] === "Canada" ? "federal" : jurisdictionName + " " + (jurisdiction === "YT" ? "territorial" : "provincial")} election. Many polls are privately commissioned and go unreleased, but some are leaked after the fact. To learn more about Polling Canada's standards, check the <Link to="/faq">FAQ</Link>.</p>
            <PollingContent polls={polls} jurisdiction={jurisdiction} name={jurisdictionName} election={election} nextElection={data.nextElection} />
            <Link to={"/" + lastProvince} className="navArrow leftArrow">{title[lastProvince]}</Link>
            <Link to={"/" + nextProvince} className="navArrow rightArrow">{title[nextProvince]}</Link>
        </Layout>
    )
}

export const query = graphql`
query MyQuery($jurisdiction: String, $afterDate: Date, $beforeDate: Date) {
  allPollsJson(
    filter: {jurisdiction: {eq: $jurisdiction}, field: {gte: $afterDate, lt: $beforeDate}}
    sort: {order: DESC, fields: field}
  ) {
    nodes {
      date
      company
      field
      jurisdiction
      method
      moe
      n
      poll {
        party
        score
      }
    }
  }
  prevElection: electionsJson(date: {eq: $afterDate}, jurisdiction: {eq: $jurisdiction}) {
    date
    nextWrit
    credit
    results {
      party
      score
    }
  }
  nextElection: electionsJson(date: {eq: $beforeDate}, jurisdiction: {eq: $jurisdiction}) {
    date
    nextWrit
    credit
    results {
      party
      score
    }
  }
}
`