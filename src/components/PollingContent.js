import * as React from "react"
import { Link } from "gatsby"

import parties from "../../content/parties.json"

import "../css/sandbox.css"
import { useState } from "react";

import Scatterplot from "../components/Scatterplot.js"

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
    Canada: "Federal polling",
    Canada_BC: "British Columbia federal polling",
    Canada_AB: "Alberta federal polling",
    Canada_SKMB: "Sask./Man. federal polling",
    Canada_ON: "Ontario federal polling",
    Canada_QC: "Quebec federal polling",
    Canada_ATL: "Atlantic federal polling",
    BC: "British Columbia provincial polling",
    AB: "Alberta provincial polling",
    SK: "Saskatchewan provincial polling",
    MB: "Manitoba provincial polling",
    ON: "Ontario provincial polling",
    QC: "Quebec provincial polling",
    NB: "New Brunswick provincial polling",
    PE: "Prince Edward Island provincial polling",
    NS: "Nova Scotia provincial polling",
    NL: "Nfld. & Lab. provincial polling",
    YT: "Yukon territorial polling",
  }
  
  function labely(historical, current, scale) {
  
    let y = 0;
  
    if (historical * scale > 160 && current * scale > 160) {
      y = 790;
    } else if (historical*scale - current*scale > 160) {
      y = 790 - current * scale;
    } else if (current*scale - historical*scale > 160) {
      y = 790 - historical * scale;
    } else {
      y = 790 - Math.max(historical, current) * scale;
    }
  
    return(y);
  }
  
  function change(n) {
  
    n = Math.round(n)
  
    let text = "-";
  
    if (n > 0) {
      text = "+" + String(n);
    }
  
    if (n < 0) {
      text = String(n);
    }
  
    return(text);
  }
  
  function Chart({poll, id, lastElection}) {
  
      let minBar = Math.min(...poll.poll.map(party => party.score)); // Shrink the chart if the last bar is tall

      let chartWidth = 1600;
      let chartHeight = 900;
      let barPadding = 20;
      let bottom = 250;
      let right = poll.poll.length <= 3 ? 600 : (poll.poll.length <= 4 || minBar >= 8) ? 400 : 200;
  
      let barWidth = (chartWidth - right) / poll.poll.length;
  
      // Find the most recent party
  
      let bj = poll.jurisdiction.split("_")[0];
      let pinfo = parties.content[bj];
  
      let maxBar = Math.max(...poll.poll.map(party => party.score));
      let maxHist = Math.max(...lastElection.results.map(party => party.score));
      let barScale = (chartHeight - bottom - barPadding * 2) / Math.max(maxBar, maxHist);
  
      return (
  
        <svg id={id} className="poll" viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
          {poll.poll.map((party, i) => {
            let ac = party.party;
            let pp = Math.round(party.score);
            let hist = Math.round(lastElection.results.filter(party => party.party === ac)[0]?.score || -1);
            return(
            <g>
              <rect
                width={barWidth - barPadding * 2}
                height={barScale * pp}
                x = {i * barWidth + barPadding}
                y = {chartHeight-barScale*pp - barPadding - bottom}
                fill = {brandColours[pinfo[ac]?.colour || "gray"]} />
              
              {hist >= 0 && ac !== "Others" && <path
                className="benchmark"
                stroke="black"
                strokeWidth="10px"
                strokeLinecap="round"
                d={`M ${i * barWidth + barPadding} ${chartHeight - barScale * hist - barPadding - bottom} h ${barWidth - 2 * barPadding}`} />}
  
              {ac !== "Others" && <path d = {pinfo[ac].logo}
                fill = {brandColours[pinfo[ac].colour]}
                transform = {"translate(" + ((i + 0.5) * barWidth - 50) + " " + 680 + ")"} />}
  
              <text className="numeric" textAnchor="middle" fontWeight="bold" fontSize="48pt"
                x={(i + 0.5) * barWidth}
                y={890 - barPadding}>
                  {ac}
              </text>
              
              <text className="numeric" textAnchor="middle" fontWeight="bold" fontSize="48pt"
                x={(i + 0.5) * barWidth}
                y={labely(hist, pp, barScale) - bottom + (ac === "Others" ? 60 : 0)}>
                  {Math.round(pp)}%
              </text>
              
              {ac !== "Others" && <text className="numeric" textAnchor="middle" fontWeight="bold" fontSize="48pt"
                x={(i + 0.5) * barWidth}
                y={labely(hist, pp, barScale) + 60 - bottom}>
                  ({hist >= 0 ? change(pp - Math.round(hist)) : "new"})
              </text>}
            </g>)
        })}
  
            <g className="pollingCanada" stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round" stroke="black" transform="scale(3) translate(397 42)">
        <path
           fill="#c94141"
           d="m 123.94611,189.49703 -5.45888,3.15168 v 6.30338 l 5.45888,3.15168 5.44675,-3.14468 -5.44675,-3.15868 z" />
        <path
           d="m 118.48722,186.34534 v 6.30337 l -5.45889,3.15169 -5.45888,-3.15168 v -6.28938 l 5.45888,3.13769 z"
           fill="#85ab53" />
        <path
           d="m 102.11058,189.49702 5.45888,3.15168 v 6.30338 l -5.45888,3.15168 -5.446759,-3.14467 5.446759,-3.15869 z"
           fill="#e69f4a" />
        <path
           d="m 123.94611,214.71052 -5.45888,-3.15168 v -6.30338 l 5.45888,-3.15168 5.44675,3.14468 -5.44675,3.15868 z"
           fill="#598dab" />         
        <path
           d="m 102.11058,214.71053 5.45888,-3.15168 v -6.30339 l -5.45888,-3.15168 -5.446759,3.14468 5.446759,3.15869 z"
           fill="#88c9c3" />
        <path
           d="m 107.56946,198.95208 v 6.30338 l 5.43463,3.16569 5.48313,-3.16569 v -6.30338 l -5.48313,-3.16569 z"
           fill="#bea79f" />
        <path
           d="m 107.56946,198.95209 5.45888,3.15168 5.45888,-3.15168 -5.45888,-3.15168 z"
           fill="#ddcdc8" />
        <path
           d="m 113.04044,202.10377 -0.0242,6.31738"
           fill="none" />
        <path
           d="m 111.93427,198.95208 h 2.18813"
           fill="none" />
        <path
           d="m 113.01624,208.42115 -0.0121,6.30336"
           fill="#85ab53"/>
      </g>
      <text textAnchor="end" fontWeight="bold" fontSize="48pt" x={1600 - barPadding} y="50">Polling Canada</text>
          <text className="numeric" textAnchor="end" fontSize="40pt" x={1600 - barPadding} y="120">{title[poll.jurisdiction]}</text>
          <text className="numeric" textAnchor="end" fontSize="32pt" x={1600 - barPadding} y="190">{poll.company}</text>
          <text className="numeric" textAnchor="end" fontSize="32pt" x={1600 - barPadding} y="240">{poll.date}</text>
          {poll.n && <text className="numeric" textAnchor="end" fontSize="32pt" x={1600 - barPadding} y="310">Sample size = {poll.n.toLocaleString("en-US")}</text>}
          <text className="numeric" textAnchor="end" fontSize="32pt" x={1600 - barPadding} y="360">{poll.method}</text>
          {poll.moe && <text className="numeric" textAnchor="end" fontSize="32pt" x={1600 - barPadding} y="410">±{poll.moe}%</text>}
        </svg>
  
      );
  }
  
  function Row({poll, lastElection, active, onClickRow}) {

    let bj = poll.jurisdiction.split("_")[0];
    let pinfo = parties.content[bj];

    let field = new Date(poll.field);
  
    poll.poll = poll.poll.sort((a, b) => b.score - a.score);
    
    return (
      <div className="pollRow">
      {active && <Chart poll={poll} id={PollID(poll)} lastElection={lastElection}/>}
      <button className="pollLink" onClick={onClickRow}>
        <p className={poll.last ? "pollInfo lastPoll" : "pollInfo"} bgcolor="white">{poll.company}</p>
        <p className="pollInfo pollDate" bgcolor="white">{new Date(new Date(field).setDate(new Date(field).getDate() + 1)).toLocaleString("en-CA",{"dateStyle":"short"})}</p>
        <div className="entryContainer">
      {poll.poll.map((party, i) => {
        let hist = Math.round(lastElection.results.filter(x => x.party === party.party)[0]?.score);
        return (hist < party.score || Number.isNaN(hist)) ?
        <div className="pollEntry" style={{backgroundColor: brandColours[pinfo[party.party]?.colour || "gray"], borderColor: brandColours[pinfo[party.party]?.colour || "gray"]}}>
          <div className="pollScore" style={{color: (party.party === "Others" || pinfo[party.party]?.colour === "yellow") ? "black" : "white"}}>{Math.round(party.score)}</div>
          <div className="pollParty" style={{color: (party.party === "Others" || pinfo[party.party]?.colour === "yellow") ? "black" : "white"}}>{party.party}</div>
        </div> :
        <div className="pollEntry" style={{borderColor: brandColours[pinfo[party.party]?.colour || "gray"]}}>
          <div className="pollScore">{Math.round(party.score)}</div>
          <div className="pollParty">{party.party}</div>
        </div>
      })}
      </div>
      </button>
      </div>
    );
  }
  
  function ResultsTable({pollList, lastElection, activePoll, onClickRow}) {

    // Get poll years

    let pollYears = pollList.map((a) => new Date(a.field).getFullYear())

    // Get unique poll years

    let boundaryIndex = pollYears.reduce(
      function (a, b) {
        if (a.indexOf(b) === -1) {
          a.push(b)
        }
        return a
      }, []);

    // Find the index of the first appearance of each unique poll year

    boundaryIndex = boundaryIndex.map(x => pollYears.indexOf(x));

    return(
      <div className="pollTable">
        {pollList.map((poll, index) => 
        <div>
          {boundaryIndex.includes(index) && <h3>{new Date(poll.field).getFullYear()}</h3> }
          <Row poll={poll} lastElection={lastElection} active={activePoll===index} onClickRow={onClickRow(index)}/>
        </div>)}
      </div>
    );
  }
    
  function PollID(poll) {
    let id = poll.company.toLowerCase().replace(" ","-").replace(".","") + "-" + poll.field;
    return(id);
  }

  function listEndParties(pollList, jurisdiction, parties, nextElection) {

    // Get a list of every party that appears more than twice...

    let partyArray = [];
    pollList.map(x => x.poll.map(y => y.party !== "Others" && partyArray.push(y.party)));

    const partyCount = {};

    const endDate = nextElection ? new Date(nextElection.date) : new Date()

    for (const party of partyArray) {
      let end = parties.content[jurisdiction][party].end;
      console.log(jurisdiction);
      console.log(end);
      if (!end || (new Date(end) > endDate)) {
        if (partyCount[party]) {
            partyCount[party] += 1;
        } else {
            partyCount[party] = 1;
        }
      }
    }

    let validParties = Object.entries(partyCount);
    validParties = validParties.filter(x => x[0] !== "AIP").map(y => y[0]); // Yeah, I excluded the Alberta Independence Party from having a trendline

    return(validParties);
  }

  function listValidParties(pollList) {

    // Get a list of every party that appears more than twice...

    let partyArray = [];
    pollList.map(x => x.poll.map(y => y.party !== "Others" && partyArray.push(y.party)));

    const partyCount = {};

    for (const party of partyArray) {
        if (partyCount[party]) {
            partyCount[party] += 1;
        } else {
            partyCount[party] = 1;
        }
    }

    let validParties = Object.entries(partyCount);
    validParties = validParties.filter(x => x[0] !== "AIP").map(y => y[0]); // Yeah, I excluded the Alberta Independence Party from having a trendline

    return(validParties);
  }

  function PartyList({validParties, jurisdiction, polls, election, nextElection}) {

    let bj = jurisdiction.split("_")[0];

    return(
        <div className="partyContainer">
          {validParties.map(function(acronym) {
            let average = currentAverage(polls, acronym, nextElection);
            return (
          <a className="party" href={parties.content[bj][acronym].url ?? "https://en.wikipedia.org/wiki/Politics_of_Canada"} target="_blank" rel="noreferrer">
          <svg className="partyLogo" viewBox="0 0 100 100"><path fill={brandColours[parties.content[bj][acronym].colour]} d={parties.content[bj][acronym].logo} /></svg>
          <div className="partyText">
            <h3 className="partyTitle">{acronym}</h3>
            <p className="partyScore" style={{color: brandColours[parties.content[bj][acronym].colour]}}>
              {average > (election.results.filter(x => x.party === acronym)[0]?.score || 0) ? "▲" : "▼"}
              {average}
              %
            </p>
            <p className="partyName">{parties.content[bj][acronym].fullName}</p>
          </div>
          </a>
          );}
          )}
        </div>
    );
  }

  function currentAverage(polls, party, nextElection) {

    const endDate = nextElection ? new Date(nextElection.date) : new Date()

    // We only care about polls with the relevant party

    let partyPolls = polls.filter(x => x.poll.map(x => x.party).includes(party));
    let weightedPolls = partyPolls.map(
      function (poll) {
        poll.weight = 0.95**((endDate-new Date(poll.field))/(24*60*60*1000));
        poll.value = poll.poll.filter(x => x.party === party)[0].score;
        return(poll);
      }
    );

    // Collect values for the relevant party

    weightedPolls = weightedPolls.map(poll => {poll.value = poll.poll.filter(x => x.party === party)[0].score; return(poll)});
    let weightSum = weightedPolls.reduce((a, b) => a + b.weight, 0);

    let avg = weightedPolls.map(poll => poll.value*(poll.weight/weightSum)).reduce((x,y)=>x+y,0);

    avg = Math.round(avg*10)/10

    return(avg);
  }
  
  function PollingContent({polls, jurisdiction, election, nextElection, name}) {
    let pollList = polls;
    let [pollsActive, setPollsActive] = useState(null);
    let validParties = listValidParties(polls);
    let endParties = listEndParties(polls, jurisdiction, parties, nextElection);
  
    function handleClickRow(rowIndex) {
      if (rowIndex === pollsActive) {
        return () => setPollsActive(null);
      } else {
      return () => setPollsActive(rowIndex);
      }
    }
  
    function handleClickPoll(rowIndex) {
      return () => setPollsActive(rowIndex);
    }

    if (election.nextWrit) {
      const companies = [...new Set(pollList.map(x => x.company))]
      for (let company of companies) {
        let pidx = pollList.findIndex(x => x.company === company && new Date(x.field) > new Date(election.nextWrit));
        if (pidx > -1) {(pollList[pidx]).last = true}
      }
    }
 
    return(
      <div>
        <div>
          <h2>{name + " trendlines"}</h2>
          <div className="credit">Polling Canada / Prairie Heart{election.credit && " / " + election.credit}</div>
        </div>
        <PartyList validParties={endParties} jurisdiction={jurisdiction} polls={polls} election={election} nextElection={nextElection} />
        <Scatterplot polls={polls} jurisdiction={jurisdiction} election={election} nextElection={nextElection} validParties={validParties} onClickPoll={handleClickPoll} brandColours={brandColours} parties={parties} />
        <p>Outside of an election, nobody can guarantee that trendlines describe the past or predict the future: they just indicate where market research firms are willing to stake their reputations.</p>
        <h2>{name + " polling database"}</h2>
        <p>A solid box indicates that a party is polling above its last election result. {election.nextWrit && "A star indicates the last poll issued by a company during a writ period. "}Click any poll to see a chart with more information.</p>
        {polls.length > 0 ? <ResultsTable pollList={pollList} lastElection={election} onClickRow={handleClickRow} activePoll={pollsActive} /> : <p>There have been no polls conducted since the last election.</p>}
        {['BC','AB','SK','MB','ON','QC','NB','PE','NS','NL'].includes(jurisdiction) && <p>For other years, check out the <Link to="/timeline">provincial timeline</Link>.</p>}
        {jurisdiction.split('_')[0] === 'Canada' && <p>For other years, check out the <Link to="/federal-timeline">federal timeline</Link>.</p>}
      </div>
    )
  }
  
  export default PollingContent