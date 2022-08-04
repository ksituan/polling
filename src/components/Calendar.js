import * as React from "react"

import events from "../../content/events.json"
import parties from "../../content/parties.json"

import BC from '../images/flags/BC.png'
import AB from '../images/flags/AB.png'
import SK from '../images/flags/SK.png'
import MB from '../images/flags/MB.png'
import ON from '../images/flags/ON.png'
import QC from '../images/flags/QC.png'
import NB from '../images/flags/NB.png'
import PE from '../images/flags/PE.png'
import NS from '../images/flags/NS.png'
import NL from '../images/flags/NL.png'
import NU from '../images/flags/NU.png'
import NT from '../images/flags/NT.png'
import YT from '../images/flags/YT.png'
import Canada from '../images/flags/Canada.png'

// I understand this is terrible code but I don't care right now

const flags = {
    BC: BC,
    AB: AB,
    SK: SK,
    MB: MB,
    ON: ON,
    QC: QC,
    NB: NB,
    PE: PE,
    NS: NS,
    NL: NL,
    NU: NU,
    NT: NT,
    YT: YT,
    Canada: Canada
}

const jurisdictions = {
    BC: "British Columbia",
    AB: "Alberta",
    SK: "Saskatchewan",
    MB: "Manitoba",
    ON: "Ontario",
    QC: "Quebec",
    NB: "New Brunswick",
    PE: "Prince Edward Island",
    NS: "Nova Scotia",
    NL: "Newfoundland and Labrador",
    YT: "Yukon",
    NT: "Northwest Territories",
    NU: "Nunavut",
    Canada: "Canada"
};

let titles = {municipal: "Municipal elections",
legislative: "General election"}

function Calendar() {

    let fevents = events.map(function(event) { event.date = new Date(event.date + "T00:00"); return(event) });
    fevents = fevents.filter(event => event.date > new Date() && (event.date - new Date() < 365*24*60*60*1000 || event.minority));
    fevents = fevents.sort((a,b) => a.date - b.date);
    console.log(fevents)

    return(
        <div className="calendar">
        {fevents.map((event, n) =>
            <div className={n < 10 ? "event" : "event hidden" }>
                <div className="jurisdiction">
                    <img className="flag" src={flags[event.jurisdiction]} alt="" width="25" />
                    <div className="desc">{jurisdictions[event.jurisdiction]}</div>
                </div>
                <div className="desc">{event.type === "leadership" ? parties.content[event.jurisdiction][event.party].fullName + " leadership election" : titles[event.type]}</div>
                <div className="date">{event.date.toLocaleDateString('en-CA', {year: "numeric", month: "long", day: "numeric"})}</div>
                <div className="date">{event.date - new Date() > 24*60*60*1000 ? Math.ceil((event.date - new Date())/(24*60*60*1000)) + " days" : "Tomorrow"}</div>
                {event.type === "legislative" && <div className="warning">{event.minority ? "ⓘ Or earlier (minority government)" : "ⓘ Or earlier"}</div>}
                {event.note && <div className="note">{event.note}</div>}
            </div>)}
        </div>
    );
}

export default Calendar