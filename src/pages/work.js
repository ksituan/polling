import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

import at from "../images/at.svg"

const work = () => (
  <Layout>
    <Seo title="Work" description="Hire Polling Canada's Curtis Fric" />
    <h1>Work</h1>
    <div className="formalContainer"><StaticImage className="formalCurtis" src="../images/curtis_1.jpg" alt="A formal headshot of Curtis." width={320} /></div>
    <p className="formalCaption"><em>Appearances in a three-piece suit cost extra (2022)</em></p>
    <h2>Background</h2>
    <p>I'm Curtis Fric, a social media manager with data, community, and Canadian politics experience. All over the country, campaigns promote me when they're ahead, and ignore me when they're behind. Perhaps you're looking to hire me?</p>
    <h2>Experience</h2>
    <p className="dateText">2024-present</p>
    <p><span className="colourfulText">Cardinal Research</span> Lead Researcher</p>
    <p className="dateText">2017-present</p>
    <p><span className="colourfulText">Polling Canada</span> Owner & Operator</p>
    <p className="dateText">2023-2024</p>
    <p><span className="colourfulText">Decision Desk HQ</span> Data Entry</p>
    <p className="dateText">2022-2024</p>
    <p><span className="colourfulText">Brock University, Dept. of Labour Studies</span> Research Assistant</p>
    <p className="dateText">2020-2023</p>
    <p><span className="colourfulText">Mainstreet Research</span> Social Media Manager & Digital Analyst</p>
    <p className="dateText">2022</p>
    <p><span className="colourfulText">MPP Chris Glover</span> Social Media Co-ordinator</p>
    <p className="dateText">2021</p>
    <p><span className="colourfulText">McMaster University, School of Labour Studies</span> Research Assistant</p>
    <p className="dateText">2018</p>
    <p><span className="colourfulText">Ontario NDP</span> Candidate (Niagara West)</p>

    <h2>Education</h2>
    <p className="dateText">2020</p>
    <p><span className="colourfulText">Brock University</span> B.A. (Honours) Political Science</p>

    <h2>My Secret</h2>
    <p>I love tabletop and video games (And of course politics)! It's always been a dream of mine to work in the gaming industry. </p>

    <h2>Contact</h2>
    <p>You can reach me at <span className="colourfulText">cfpolling<img className="at" src={at} alt=" at "/>gmail.com</span>.</p>

  </Layout>
)

export default work