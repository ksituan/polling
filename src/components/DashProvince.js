import * as React from "react"
import DashChart from "./DashChart.js"
import SinglePollingAverage from "../components/SinglePollingAverage.js"
import MarkLastPolls from "../components/MarkLastPolls"
import parties from "../../content/parties.json"
import {Link} from "gatsby"

let brandColours = {
    "maroon" : "#8b4943",
    "red" : "#c94141",
    "orange" : "#e69f4a",
    "yellow" : "#ebc53f",
    "green" : "#85ab53",
    "darkGreen" : "#5f7b3b",
    "teal" : "#88c9c3",
    "blue" : "#598dab",
    "darkBlue" : "#52709e",
    "purple" : "#af7ac8",
    "gray" : "#ddd",
}

let title = {
    BC: "British Columbia",
    AB: "Alberta",
    SK: "Saskatchewan",
    MB: "Manitoba",
    ON: "Ontario",
    QC: "Quebec",
    NB: "New Brunswick",
    PE: "Prince Edward Island",
    NS: "Nova Scotia",
    NL: "Newfoundland & Lab.",
    YT: "Yukon",
    Canada_BC: "British Columbia",
    Canada_AB: "Alberta",
    Canada_SKMB: "Sask./Man.",
    Canada_ON: "Ontario",
    Canada_QC: "Quebec",
    Canada_ATL: "Atlantic",
    Canada: "Canada"
}

function DashProvince({polls, jurisdiction, election}) {

    const relevantParties = parties.content[jurisdiction.split("_")[0]];
    let todaysAverage = SinglePollingAverage(MarkLastPolls(polls), new Date(), relevantParties);

    let majorAverage = todaysAverage.filter(party => party.score >= 10); // Only parties over 10%
    
    //if (majorAverage.length > 3) { // Only the top 3 parties
    //    majorAverage = majorAverage.slice(0,3);
    //}

    return (
        <Link className="dashProvince" to={`/${jurisdiction.replace("_","-")}-${election.year}`} style={{textDecoration: "none"}}>
            <DashChart polls={polls} jurisdiction={jurisdiction} election={election} plotWidth={400} plotHeight={350} className="dashChart" /> 
            <div className="dashPartyContainer">
            {majorAverage.length > 0 ? majorAverage.map(event =>
                <div className="dashParty">
                        <div className="dashName" style={{color: brandColours[relevantParties[event.party].colour]}}>{event.party}</div>
                        <div className="dashScore" style={{color: event.score > (election.results.filter(x => x.party === event.party)[0]?.score || 0) ? brandColours["green"] : brandColours["red"]}}>
                            {event.score > (election.results.filter(x => x.party === event.party)[0]?.score || 0) ? "▲" : "▼"}
                            {event.score % 1 === 0 ? String(event.score) + ".0" : event.score}
                        </div>
                </div>
            ) : <div className="dashParty">
                    <div className="dashName" style={{color: "#B0B0B0"}}>Gone fishing</div>
                    <div className="dashScore" style={{color: "#B0B0B0"}}>No new polls yet</div>
                </div>}
            </div> 
            <div className="dashTitle">{title[jurisdiction]}</div>
        </Link>
    )
}

export default DashProvince