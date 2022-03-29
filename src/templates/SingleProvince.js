import * as React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import PollingContent from "../components/PollingContent";
import Seo from "../components/seo"

export default function SingleProvince({pageContext, data}) {
    const {jurisdiction, jurisdictionName, beforeDate} = pageContext;
    const polls = data.allPollsJson.nodes;
    const election = data.electionsJson;
    const pageTitle = `${jurisdictionName} ${jurisdiction.split("_")[0] !== "Canada" ? (jurisdiction === "YT" ? "territorial" : "provincial") : ""} polling`;
    return(
        <Layout>
        <Seo title={pageTitle} />
            <h1>{pageTitle}</h1>
            <p>This page lists every publicly accessible poll conducted by a reputable firm since the {new Date(election.date).getFullYear()} {jurisdiction.split("_")[0] === "Canada" ? "federal" : jurisdictionName + " " + (jurisdiction === "YT" ? "territorial" : "provincial")} election. Many polls are privately commissioned and go unreleased, but some are leaked after the fact. To learn more about Polling Canada's standards, check the <Link to="/faq">FAQ</Link>.</p>
            <PollingContent polls={polls} jurisdiction={jurisdiction} name={jurisdictionName} election={election} endDate={new Date(beforeDate)}/>
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
  electionsJson(date: {eq: $afterDate}, jurisdiction: {eq: $jurisdiction}) {
    date
    results {
      party
      score
    }
  }
}
`