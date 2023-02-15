import * as React from "react"

import events from "../../content/events.json"
import parties from "../../content/parties.json"

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
import NU_flag from '../images/flags/NU.png'
import NT_flag from '../images/flags/NT.png'
import YT_flag from '../images/flags/YT.png'
import Canada_flag from '../images/flags/Canada.png'

// I understand this is terrible code but I don't care right now

const flags = {
    BC: BC_flag,
    AB: AB_flag,
    SK: SK_flag,
    MB: MB_flag,
    ON: ON_flag,
    QC: QC_flag,
    NB: NB_flag,
    PE: PE_flag,
    NS: NS_flag,
    NL: NL_flag,
    NU: NU_flag,
    NT: NT_flag,
    YT: YT_flag,
    Canada: Canada_flag
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

function Calendar() {

    let fevents = events.filter(event => (!event.date) || (new Date(event.date + "T00:00") - new Date()) > -24*60*60*1000 && (new Date(event.date + "T00:00") - new Date() < 365*24*60*60*1000 || event.minority));
    fevents = fevents.map(function(event) { event.date = new Date(event.date + "T00:00"); return(event) });
    fevents = fevents.sort((a,b) => a.date - b.date);
    console.log(fevents);

    return(
        <div className="calendar">
        {fevents.map((event, n) =>
            <div className={n < 10 ? "event" : "event hidden" }>
                <div className="jurisdiction">
                    <img className="flag" src={flags[event.jurisdiction]} alt="" width="25" />
                    <div className="desc">{jurisdictions[event.jurisdiction]}</div>
                </div>
                {event.type === "leadership" && <div className="desc">{parties.content[event.jurisdiction][event.party].fullName + " leadership election"}</div>}
                {event.type === "legislative" && <div className="desc">General election</div>}
                {event.type === "municipal" && <div className="desc">Municipal elections</div>}
                {event.type === "by" && <div className="desc">{event.riding + " by-election"}</div>}
                <div className="date">{(!isNaN(event.date)) && event.date.toLocaleDateString('en-CA', {year: "numeric", month: "long", day: "numeric"})}</div>
                <div className="date">{isNaN(event.date) ? "Date not selected" : (Math.ceil((event.date - new Date())/(24*60*60*1000)) === 1 ? "1 day" : Math.ceil((event.date - new Date())/(24*60*60*1000)) + " days")}</div>
                {(event.type === "legislative" && event.future) && <div className="warning">{event.minority ? "ⓘ Or earlier (minority government)" : "ⓘ Or earlier"}</div>}
                {event.note && <div className="note">{event.note}</div>}
            </div>)}
        </div>
    );
}

export default Calendar