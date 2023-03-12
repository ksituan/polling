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

function DashCanada({polls, election}) {

    const relevantParties = parties.content["Canada"];
    let todaysAverage = SinglePollingAverage(MarkLastPolls(polls), new Date(), relevantParties);

    let majorAverage = todaysAverage //.filter(party => party.score >= 5);

    return (
        <Link className="dashCanada" to={`/Canada-${election.year}`} style={{textDecoration: "none"}}>
            <DashChart polls={polls} jurisdiction="Canada" election={election} plotWidth={1000} plotHeight={400} className="wideChart" />
            <div className="fedPartyContainer">
            {majorAverage.map((event, n) =>
                <div className="dashFedParty" key={n}>
                    <svg className="partyLogo" viewBox="0 0 100 100" style={{width: "1.5rem", height: "1.5rem", padding: "0.2rem", border: `2px solid ${brandColours[relevantParties[event.party].colour]}`, borderRadius: "0.25rem"}}><path fill={brandColours[relevantParties[event.party].colour]} d={relevantParties[event.party].logo} /></svg>
                    <div>
                        <div className="dashFedName" style={{color: brandColours[relevantParties[event.party].colour]}}>{event.party}</div>
                        <div className="dashFedScore" style={{color: event.score > (election.results.filter(x => x.party === event.party)[0]?.score || 0) ? brandColours["green"] : brandColours["red"]}}>
                            {event.score > (election.results.filter(x => x.party === event.party)[0]?.score || 0) ? "▲" : "▼"}
                            {event.score % 1 === 0 ? String(event.score) + ".0" : event.score}%
                        </div>
                    </div>
                </div>
            )}
            </div> 
            {/*<div className="dashTitle">House of Commons</div>*/}
        </Link>
    )
}

export default DashCanada