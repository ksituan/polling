import * as React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import PollingContent from "../components/PollingContent";

export default function SingleProvince({pageContext, data}) {
    const {jurisdiction, jurisdictionName, beforeDate} = pageContext;
    const polls = data.allPollsJson.nodes;
    const election = data.electionsJson;
    return(
        <Layout>
            <h1>{jurisdictionName} {jurisdiction.split("_")[0] !== "Canada" && "provincial"} polling</h1>
            <p>This page lists every publicly accessible poll conducted by a reputable group since the {new Date(election.date).getFullYear()} {jurisdiction.split("_")[0] === "Canada" ? "federal" : jurisdictionName + " provincial"} election. Many polls are privately commissioned and go unreleased, but some are leaked after the fact. Click any poll to see a chart with more information.</p>
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