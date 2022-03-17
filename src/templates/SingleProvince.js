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
            <h2>{jurisdictionName}</h2>
            <PollingContent polls={polls} jurisdiction={jurisdiction} election={election} endDate={new Date(beforeDate)}/>
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