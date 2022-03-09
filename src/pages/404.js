import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <Seo title="404" />
    <h1>404</h1>
    <p>This page has a sample size of zero, 19 times out of 20.</p>
  </Layout>
)

export default NotFoundPage
