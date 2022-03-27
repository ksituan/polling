import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const maps = () => (
  <Layout>
    <Seo title="Maps" />
    <h1>Election Maps</h1>
    <h2>Printed in Canada</h2>
    <p>Can't wait for the next election? Polling Canada is pleased to sell a variety of unique election maps designed by our trusty staff cartographer, <a href="https://www.awmcphee.ca" >Alex McPhee</a>.</p>
    <h2>Federal Elections</h2>
    <p>Even in the world's largest democracy, land doesn't vote. Ever wonder why federal campaigns mostly revolve around suburban Toronto? These innovative "cartograms" provide a detailed and unbiased look into every riding.</p>
    <h2>Provincial Elections</h2>
    <p>Printing at a whopping 6 feet wide, this is the most spectacular way to study Canada's provincial legislatures. Subscription plan available for high rollers who need theirs updated every election, please inquire.</p>
    <h2>Shopping Cart</h2>
    <div className="cart">
    <p>Click a product above to get started!</p>
    </div>
  </Layout>
)

export default maps