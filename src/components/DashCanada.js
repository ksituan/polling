import * as React from "react"
import DashChart from "./DashChart.js"

function DashCanada({polls, election}) {
    return (
        <DashChart polls={polls} jurisdiction="Canada" election={election} plotWidth={1000} plotHeight={400} className="dashCanada" />
    )
}

export default DashCanada