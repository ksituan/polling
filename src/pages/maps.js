import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

import Canada_flag from '../images/flags/Canada.png'
import BC_flag from '../images/flags/BC.png'
import AB_flag from '../images/flags/AB.png'
import SK_flag from '../images/flags/SK.png'
import MB_flag from '../images/flags/MB.png'
import ON_flag from '../images/flags/ON.png'
import QC_flag from '../images/flags/QC.png'
import NB_flag from '../images/flags/NB.png'
import PE_flag from '../images/flags/PE.png'
import NS_flag from '../images/flags/NS.png'
import NL_flag from '../images/flags/NL.png'

const maps = () => (
  <Layout>
    <Seo title="Maps"  description="Election map gallery" />
    <h1>Election Maps</h1>
    <p>Can't wait for the next election? Polling Canada is pleased to host a variety of unique election maps designed by our trusty staff cartographer, <a href="https://pronghornmaps.com" target="_blank" rel="noreferrer">Alex McPhee</a>.</p>
    <h2>Do It Yourself</h2>
    <p>Make your own election predictions with PC DIY, our in-house map painting app.</p>
    <div className="diyContainer">
      <Link className="diyLink" to="/diy/canada" style={{backgroundColor: "#d06060b0"}}><img className="flag" src={Canada_flag} alt="" width="25" /><p>House of Commons</p></Link>
      <Link className="diyLink" to="/diy/bc" style={{backgroundColor: "#D1242Eb0"}}><img className="flag" src={BC_flag} alt="" width="25" /><p>B.C. provincial legislature</p></Link>
      <Link className="diyLink" to="/diy/ab" style={{backgroundColor: "#0D3692b0"}}><img className="flag" src={AB_flag} alt="" width="25" /><p>Alberta provincial legislature</p></Link>
      <Link className="diyLink" to="/diy/sk" style={{backgroundColor: "#046A21b0"}}><img className="flag" src={SK_flag} alt="" width="25" /><p>Sask. provincial legislature</p></Link>
      <Link className="diyLink" to="/diy/mb" style={{backgroundColor: "#C8102Eb0"}}><img className="flag" src={MB_flag} alt="" width="25" /><p>Manitoba provincial legislature</p></Link>
      <Link className="diyLink" to="/diy/on" style={{backgroundColor: "#C8102Eb0"}}><img className="flag" src={ON_flag} alt="" width="25" /><p>Ontario provincial legislature</p></Link>
      <Link className="diyLink" to="/diy/qc" style={{backgroundColor: "#003DA5b0"}}><img className="flag" src={QC_flag} alt="" width="25" /><p>Quebec provincial legislature</p></Link>
      <Link className="diyLink" to="/diy/nb" style={{backgroundColor: "#F4C600b0"}}><img className="flag" src={NB_flag} alt="" width="25" /><p>N.B. provincial legislature</p></Link>
      <Link className="diyLink" to="/diy/pe" style={{backgroundColor: "#D23B3Eb0"}}><img className="flag" src={PE_flag} alt="" width="25" /><p>P.E.I. provincial legislature</p></Link>
      <Link className="diyLink" to="/diy/ns" style={{backgroundColor: "#0047B6b0"}}><img className="flag" src={NS_flag} alt="" width="25" /><p>Nova Scotia provincial legislature</p></Link>
      <Link className="diyLink" to="/diy/nl" style={{backgroundColor: "#003361b0"}}><img className="flag" src={NL_flag} alt="" width="25" /><p>Nfld. provincial legislature</p></Link>
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
    <p>Has it been a while since you scrolled to the bottom of this page? Prints of these maps are finally for sale <a href="https://pronghornmaps.com/commons" target="_blank" rel="noreferrer">here!!!</a></p>
    </div>
  </Layout>
)

export default maps