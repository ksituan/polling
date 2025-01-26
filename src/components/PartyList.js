import * as React from "react"

export default function PartyList({todaysAverage, relevantParties, election, brandColours}) {

    return(
        <div className="partyContainer">
          {todaysAverage.map(event =>
          <a className="party" href={relevantParties[event.party].url ?? "https://en.wikipedia.org/wiki/Politics_of_Canada"} target="_blank" rel="noreferrer">
          <svg className="partyLogo" viewBox="0 0 100 100"><path fill={brandColours[relevantParties[event.party].colour]} d={relevantParties[event.party].logo} /></svg>
          <div className="partyText">
            <h3 className="partyTitle">{event.party}</h3>
            <p className="partyScore" style={{color: brandColours[relevantParties[event.party].colour]}}>
              {event.score > (election.results.filter(x => x.party === event.party)[0]?.score || 0) ? "▲" : "▼"}
              {event.score % 1 === 0 ? String(event.score) + ".0" : event.score}
              %
            </p>
            <p className="partyName">{relevantParties[event.party].fullName}</p>
          </div>
          </a>
          )}
        </div>
    );
  }