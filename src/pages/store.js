import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const store = () => (
  <Layout>
    <Seo title="Store" />
    <h1>Map Store</h1>
    <h2>Printed in Canada</h2>
    <p>Can't wait for the next election? Now's the time to study past ones. Polling Canada is pleased to ship a variety of unique election maps designed by our trusty staff cartographer, <a href="https://www.awmcphee.ca" >Alex McPhee</a>.</p>
    <h2>Federal Elections</h2>
    <p>Land doesn't vote. These innovative "cartograms" provide a detailed and unbiased look into every riding, while promoting a greater understanding of Canada's population density.</p>
    <h2>Provincial Elections</h2>
    <p>Printing at a whopping 6 feet wide, this is the most spectacular way to study Canada's provincial legislatures.</p>
    <p>High rollers may inquire about our subscription plan, where your map will be updated after every provincial election.</p>
    <h2>Shopping Cart</h2>
    <div className="cart">
    <p>Click a product above to get started!</p>
    </div>
  </Layout>
)

export default store