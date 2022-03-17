import * as React from "react"
import DashChart from "./DashChart.js"

function DashProvince({polls, jurisdiction, election}) {
    return (
        <DashChart polls={polls} jurisdiction={jurisdiction} election={election} plotWidth={400} plotHeight={350} className="dashProvince" /> 
    )
}

export default DashProvince