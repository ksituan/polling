import * as React from "react"
import { Link } from "gatsby"

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
    Canada: ['LPP','GPC','NDP','CCF','LPC','BPC','Others','BQ','Con','PCPC','CPC','ND','SCP','RCC','RPC','CRCA','PPC'],
    BC: ['GPBC','NDP','Others','BCLP','CPBC'],
    AB: ['GPA','NDP','ALP','Others','ABP','PCA','UCP','WRP','WIP','AIP','FCP'],
    SK: ['GPS','NDP','SLP','Others','SKP','PCS','BPS'],
    MB: ['GPM','NDP','MLP','Others','PCPM'],
    ON: ['GPO','NDP','OLP','Others','PCPO','NBP'],
    QC: ['QS','ON','PVQ','PQ','Others','PLQ','ADQ','CAQ','PCQ'],
    NB: ['NDP','GPNB','NBLA','Others','PCNB','PANB'],
    PE: ['NDP','GPPEI','LPPEI','Others','PEIPC'],
    NS: ['NDP','GPNS','NSL','Others','PCNS'],
    NL: ['NDP','LPNL','Others','NLA','PCNL'],
    YT: ['YGP','NDP','YLP','Others','YP']
}

function TimeColumn({jurisdiction, column, parties, polls, elections}) {
    let bj = jurisdiction.split("_")[0];

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

    polls = polls.sort((a,b) => new Date(b.field) - new Date(a.field))

    return(
        <div className="timelineColumn" style={{gridColumn: column, width: "100%"}}>
            <h3 style={{textAlign: "center", margin: "0", backgroundColor: "white", position: "sticky", zIndex: "10"}}>{jurisdiction}</h3>
            {relevantElections.map(function (elec) {
                let elecPolls = polls.filter(x => new Date(x.field) >= new Date(elec.date) && new Date(x.field) <= elec.next)

                if (elecPolls.length > 0) {

                elecPolls.push({poll: elec.results, field: elec.date})

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

                return(<Link to={"/"+jurisdiction+"-"+elec.date.getFullYear()}><div className="timelineElection" style={{filter: "drop-shadow(2px 2px 2px #b0b0b0)"}}>{
                    elecPolls.map(function (x) {
                    let pollSum = x.poll.reduce((a,b) => b.score + a, 0);
                    let pollMax = Math.max(...x.poll.map(y => y.score))
                    console.log(pollMax)
                    if (pollSum < 100) {
                        x.poll.push({party: "Others", score: 100 - pollSum})
                    }
                    if (ideology[jurisdiction]) {
                        x.poll = x.poll.sort((a, b) => ideology[jurisdiction].indexOf(a.party) - ideology[jurisdiction].indexOf(b.party))
                    }
                    return(<div className="timelinePoll" style={{margin: "0", fontSize: "0"}}>
                        {x.poll.map(function (entry, i) {
                        return(<div className={entry.score === pollMax ? "timelineParty largest" : "timelineParty"} style={{display: "inline-block",
                                                        backgroundColor: brandColours[parties[entry.party]?.colour|| "gray"],
                                                        width: (pollSum > 100 ? 100 * entry.score / pollSum : entry.score) + "%",
                                                        height: x.time / 4}} />)}
                        )}
                    </div>)}
                    )}
                    {elecPolls.length > 0 && <div className="timelineYear">{elec.date.getFullYear()}</div>}
                    </div></Link>)}
                })}
        </div>
    )
}

export default TimeColumn