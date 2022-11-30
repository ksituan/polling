import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

import AB_flag from '../images/flags/AB.png'
import SK_flag from '../images/flags/SK.png'
import MB_flag from '../images/flags/MB.png'

const maps = () => (
  <Layout>
    <Seo title="Maps"  description="Election map gallery" />
    <h1>Election Maps</h1>
    <p>Can't wait for the next election? Polling Canada is pleased to host a variety of unique election maps designed by our trusty staff cartographer, <a href="https://www.awmcphee.ca" target="_blank" rel="noreferrer">Alex McPhee</a>.</p>
    <h2>Do It Yourself</h2>
    <p>Make your own election predictions with PC DIY, our in-house map painting app.</p>
    <div className="diyContainer">
      <Link className="diyLink" to="/diy/ab" style={{backgroundColor: "#0D3692b0"}}><img className="flag" src={AB_flag} alt="" width="25" /><p>Alberta provincial legislature</p></Link>
      <Link className="diyLink" to="/diy/sk" style={{backgroundColor: "#046A21b0"}}><img className="flag" src={SK_flag} alt="" width="25" /><p>Sask. provincial legislature</p></Link>
      <Link className="diyLink" to="/diy/mb" style={{backgroundColor: "#C8102Eb0"}}><img className="flag" src={MB_flag} alt="" width="25" /><p>Manitoba provincial legislature</p></Link>
    </div>
    <h2>Federal Elections</h2>
    <p>Even in the world's largest democracy, land doesn't vote. Ever wonder why federal campaigns mostly revolve around suburban Toronto? These innovative "cartograms" provide a detailed and unbiased look into every riding.</p>
    <div>
      <StaticImage src="../images/canada_2021.png" alt="A map of the 2021 federal election." />
      <p style={{"text-align": "center", "margin": "0.5rem 0 1rem 0", "font-size": "24pt", "color": "#b0b0b0"}}>2021</p>
    </div>
    <div className="mapGallery">
      <div><StaticImage src="../images/canada_2019.png" alt="A map of the 2019 federal election." /><p>2019</p></div>
      <div><StaticImage src="../images/canada_2015.png" alt="A map of the 2015 federal election." /><p>2015</p></div>
      <div><StaticImage src="../images/canada_2011.png" alt="A map of the 2011 federal election." /><p>2011</p></div>
      <div><StaticImage src="../images/canada_2008.png" alt="A map of the 2008 federal election." /><p>2008</p></div>
      <div><StaticImage src="../images/canada_2006.png" alt="A map of the 2006 federal election." /><p>2006</p></div>
      <div><StaticImage src="../images/canada_2000.png" alt="A map of the 2000 federal election." /><p>2000</p></div>
      <div><StaticImage src="../images/canada_1993.png" alt="A map of the 1993 federal election." /><p>1993</p></div>
      <div><StaticImage src="../images/canada_1988.png" alt="A map of the 1988 federal election." /><p>1988</p></div>
      <div><StaticImage src="../images/canada_1984.png" alt="A map of the 1984 federal election." /><p>1984</p></div>
      <div><StaticImage src="../images/canada_1968.png" alt="A map of the 1968 federal election." /><p>1968</p></div>
      <div><StaticImage src="../images/canada_1962.png" alt="A map of the 1962 federal election." /><p>1962</p></div>
      <div><StaticImage src="../images/canada_1958.png" alt="A map of the 1958 federal election." /><p>1958</p></div>
    </div>
    <h2>Shop</h2>
    <div className="cart">
    <p>Willing to pay $50 for a 36" satin art print of your favourite election? You may be in luck very soon. <a href="https://forms.gle/eCnu78tenNvY5MjC8" target="_blank" rel="noreferrer">Leave your name on our contact list.</a></p>
    </div>
  </Layout>
)

export default maps