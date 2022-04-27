import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const data = () => (
  <Layout>
    <Seo title="Raw Data" description="Download Canadian political data" />
    <h1>Data Downloads</h1>
    <h2>Polling Canada database</h2>
    <p><Link to="/polls.zip">polls.json</Link> (45 KB)</p>
    <p>The complete Polling Canada database, in JSON format. This is the same file used to generate all the content on this site. Contains information about polling company, methodology, field date, sample size, and margin of error.</p>
    <h2>2021 election results by polling division</h2>
    <p><Link to="/2021_polls.zip">2021_polls.csv</Link> (1.07 MB)</p>
    <p>This .csv file is designed for mapping, and can be easily joined to Elections Canada shapefiles. Some polling places are duplicated, so this file should <strong>not</strong> be used to calculate sums. Pairs with <a href="https://open.canada.ca/data/en/dataset/0ed37cd6-d831-4183-bf43-b05e29570298" target="_blank" rel="noreferrer">Polling Division Boundaries (2021)</a> and <a href="https://open.canada.ca/data/en/dataset/34a8484d-5a00-4e34-a235-75881141385e" target="_blank" rel="noreferrer">Advance Polling District Boundaries (2021)</a>.</p>
    <h3>Instructions for using in QGIS</h3>
    <ol>
        <li>Download and unzip the file</li>
        <li>Import it into QGIS with <span className="docs">Layer ► Add Layer ► Add Delimited Text Layer</span></li>
        <li>Download and unzip the Government of Canada polling division boundaries</li>
        <li>Import them into QGIS with <span className="docs">Layer ► Add Layer ► Add Vector Layer</span></li>
        <li>Click the polling divisions in the <span className="docs">Layers Panel</span> and then <span className="docs">Open Field Calculator</span></li>
        <li>Check <span className="docs">Create virtual field</span></li>
        <li>Set <span className="docs">Output field name</span> to <span className="docs">Key</span></li>
        <li>Set <span className="docs">Output field type</span> to <span className="docs">Text (string)</span></li>
        <li>Enter the expression <span className="docs">"FED_NUM" || '_' || "PD_NUM"</span></li>
        <li>Press <span className="docs">OK</span></li>
        <li>Double-click the polling divisions in the <span className="docs">Layers Panel</span> to open the <span className="docs">Layer Properties</span></li>
        <li>Navigate to <span className="docs">Joins</span></li>
        <li><span className="docs">Add Vector Join</span> by pressing the <span className="docs">+</span></li>
        <li>Set <span className="docs">Join layer</span> to <span className="docs">2021_polls</span></li>
        <li>Set <span className="docs">Join field</span> to <span className="docs">Key</span></li>
        <li>Set <span className="docs">Target field</span> to <span className="docs">Key</span></li>
        <li>Check the <span className="docs">Custom field name prefix</span> box</li>
        <li>Delete all text under <span className="docs">Custom field name prefix</span></li>
        <li>Press <span className="docs">OK</span></li>
    </ol>
    <p>This joins both files, associating each polling division boundary with its local election results.</p>
  </Layout>
)

export default data