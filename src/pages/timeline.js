import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

import parties from "../../content/parties.json"
import polls from "../../content/polls.json"
import elections from "../../content/elections.json"

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

let ideology = { // This is totally arbitrary but it makes the graphs look nice!
    Canada: ['GPC','NDP','LPC','Others','BQ','PCPC','CPC','RPC','PPC'],
    BC: ['GPBC','NDP','Others','BCLP','CPBC'],
    AB: ['GPA','NDP','ALP','Others','ABP','PCA','UCP','WRP','WIP','AIP'],
    SK: ['GPS','NDP','SLP','Others','SKP','PCS','BPS'],
    MB: ['GPM','NDP','MLP','Others','PCPM'],
    ON: ['GPO','NDP','OLP','Others','PCPO','NBP'],
    QC: ['QS','PVQ','PQ','Others','PLQ','CAQ','PCQ'],
    NB: ['NDP','GPNB','NBLA','Others','PCNB','PANB'],
    PE: ['NDP','GPPEI','LPPEI','Others','PEIPC'],
    NS: ['NDP','GPNS','NSL','Others','PCNS'],
    NL: ['NDP','LPNL','Others','PCNL'],
    YT: ['YGP','NDP','YLP','Others','YP']
}

function TimeColumn({jurisdiction, column}) {
    let bj = jurisdiction.split("_")[0];
    let pinfo = parties.content[bj];

    let relevantElections = elections.filter(x => x.jurisdiction === jurisdiction)
    relevantElections = relevantElections.sort((a,b) => new Date(b.date) - new Date(a.date))

    relevantElections = relevantElections.map(function(elec, i) {
        elec.date = new Date(elec.date)
        if (i === 0) {
            elec.next = new Date()
        } else {
            elec.next = new Date(relevantElections[i-1].date)
        }
        return(elec)
    })

    let relevantPolls = polls.filter(x => x.jurisdiction === jurisdiction)
    relevantPolls = relevantPolls.sort((a,b) => new Date(b.field) - new Date(a.field))

    return(
        <div style={{gridColumn: column, width: "100%"}}>
            <h3 style={{textAlign: "center"}}>{jurisdiction}</h3>
            {relevantElections.map(function (elec) {
                let elecPolls = relevantPolls.filter(x => new Date(x.field) >= new Date(elec.date) && new Date(x.field) <= elec.next)

                elecPolls = elecPolls.map(function(poll, i) {
                    if (i === 0) {
                        poll.time = (elec.next - new Date(elecPolls[i].field))/(24*60*60*1000)
                    } else {
                        poll.time = (new Date(elecPolls[i-1].field) - new Date(elecPolls[i].field))/(24*60*60*1000)
                    }
                    return(poll)
                })
                //console.log(jurisdiction)
                //console.log(elec.next)
                //console.log(elec.date)
                //console.log(elecPolls)

                return(<div className="timelineElection" style={{border: "4px solid black", margin: "0 -2px -4px -2px"}}>{
                    elecPolls.map(function (x) {
                    let pollSum = x.poll.reduce((a,b) => b.score + a, 0);
                    if (pollSum < 100) {
                        x.poll.push({party: "Others", score: 100 - pollSum})
                    }
                    if (ideology[jurisdiction]) {
                        x.poll = x.poll.sort((a, b) => ideology[jurisdiction].indexOf(a.party) - ideology[jurisdiction].indexOf(b.party))
                    }
                    return(<div className="timelinePoll" style={{margin: "0", fontSize: "0"}}>
                        {x.poll.map(function (entry) {
                        return(<div className="timelineParty" style={{display: "inline-block",
                                                        backgroundColor: brandColours[pinfo[entry.party]?.colour|| "gray"],
                                                        width: (pollSum > 100 ? 100 * entry.score / pollSum : entry.score) + "%",
                                                        height: x.time}} />)}
                        )}
                    </div>)}
                    )}</div>)
                })}
        </div>
    )
}

const timeline = () => (
  <Layout>
    <Seo title="Timeline" description="Timeline of Canadian politics" />
    <h1>Timeline</h1>
    <p>Click on an election to view the relevant page.</p>
    <div className="timeline">
        <TimeColumn jurisdiction="BC" column="1" />
        <TimeColumn jurisdiction="AB" column="2" />
        <TimeColumn jurisdiction="SK" column="3" />
        <TimeColumn jurisdiction="MB" column="4" />
        <TimeColumn jurisdiction="ON" column="5" />
        <TimeColumn jurisdiction="QC" column="6" />
        <TimeColumn jurisdiction="NB" column="7" />
        <TimeColumn jurisdiction="PE" column="8" />
        <TimeColumn jurisdiction="NS" column="9" />
        <TimeColumn jurisdiction="NL" column="10" />
    </div>
  </Layout>
)

export default timeline