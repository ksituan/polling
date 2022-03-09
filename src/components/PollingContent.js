import * as React from "react"

import polls from "../../content/polls.json"
import elections from "../../content/elections.json"
import parties from "../../content/parties.json"

import "../css/sandbox.css"
import { useState } from "react";

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
  
  function getElection(jurisdiction, date) {
  
    // Returns the last election before a particular date
  
    let relevantElections = elections.content[jurisdiction];
    relevantElections.map(election => {election.delta = (date - new Date(election.date)); return(election)});
    let relevantElection = relevantElections.filter(election => election.delta >= 0);
    let latestDate = Math.min(...relevantElection.map(election => election.delta));
    relevantElection = relevantElection.filter(election => election.delta === latestDate)[0];
  
    return(relevantElection);
    
  }
  
  function Chart({poll, id}) {
  
      let chartWidth = 1600;
      let chartHeight = 900;
      let barPadding = 20;
      let bottom = 250;
      let right = poll.poll.length <= 4 ? 400 : 200;
  
      let barWidth = (chartWidth - right) / poll.poll.length;
  
      // Find the most recent party
  
      let pinfo = parties.content[poll.jurisdiction];
  
      // Find the last election before this poll
  
      let relevantElection = getElection(poll.jurisdiction, new Date(poll.field));
  
      let maxBar = Math.max(...poll.poll.map(party => party.score));
      let maxHist = Math.max(...relevantElection.results.map(party => party.score));
      let barScale = (chartHeight - bottom - barPadding * 2) / Math.max(maxBar, maxHist);
  
      return (
  
        <svg id={id} className="poll" viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
          {poll.poll.map((party, i) => {
            let ac = party.party;
            let pp = Math.round(party.score);
            let hist = Math.round(relevantElection.results.filter(party => party.party === ac)[0]?.score || -1);
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
              
              <text aria-hidden="true" visibility="hidden">{pinfo[ac]?.fullName || "Others"}</text>
  
              {ac !== "Others" && <path d = {pinfo[ac].logo}
                fill = {brandColours[pinfo[ac].colour]}
                transform = {"translate(" + ((i + 0.5) * barWidth - 50) + " " + 680 + ")"} />}
  
              <text textAnchor="middle" fontWeight="bold" fontSize="48pt"
                x={(i + 0.5) * barWidth}
                y={890 - barPadding}>
                  {ac}
              </text>
              
              <text textAnchor="middle" fontWeight="bold" fontSize="48pt"
                x={(i + 0.5) * barWidth}
                y={labely(hist, pp, barScale) - bottom + (ac === "Others" ? 60 : 0)}>
                  {Math.round(pp)}%
              </text>
              
              {ac !== "Others" && <text textAnchor="middle" fontWeight="bold" fontSize="48pt"
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
          <text textAnchor="end" fontSize="40pt" x={1600 - barPadding} y="120">{title[poll.jurisdiction]}</text>
          <text textAnchor="end" fontSize="32pt" x={1600 - barPadding} y="190">{poll.company}</text>
          <text textAnchor="end" fontSize="32pt" x={1600 - barPadding} y="240">{poll.date}</text>
          {poll.n && <text textAnchor="end" fontSize="32pt" x={1600 - barPadding} y="310">Sample size = {poll.n.toLocaleString("en-US")}</text>}
          <text textAnchor="end" fontSize="32pt" x={1600 - barPadding} y="360">{poll.method}</text>
          {poll.moe && <text textAnchor="end" fontSize="32pt" x={1600 - barPadding} y="410">±{poll.moe}%</text>}
        </svg>
  
      );
  }
  
  function Row({poll, active, onClickRow}) {
  
    let pinfo = parties.content[poll.jurisdiction];
    let field = new Date(poll.field);
  
    poll.poll = poll.poll.sort((a, b) => b.score - a.score);
    
    return (
      <div className="pollRow">
      {active && <Chart poll={poll} id={PollID(poll)} />}
      <a className="pollLink" href={"#" + PollID(poll)} onClick={onClickRow}>
        <div className="pollInfo" bgcolor="white">{field.getFullYear()}-{field.getMonth()+1}-{field.getDate()}</div>
        <div className="pollInfo" bgcolor="white">{poll.company}</div>
      {poll.poll.map((party, i) => (
        <div className="pollEntry" style={{backgroundColor: brandColours[pinfo[party.party]?.colour || "gray"]}}>
          {Math.round(party.score)}
        </div>
      ))}
      </a>
      </div>
    );
  }
  
  function filterPolls(polls, jurisdiction, election) {
  
    let filtered = polls.content.filter(poll => poll.jurisdiction === jurisdiction);
    filtered = filtered.sort((a, b) => new Date(b.field) - new Date(a.field));
  
    let startDate = new Date(election.date);
  
    // List either ends today, or at the next election
  
    let elecs = elections.content[jurisdiction]
    elecs = elecs.filter(election => new Date(election.date) > startDate);
    let nextElec = Math.min.apply(null, elecs.map(election => new Date(election.date)));
  
    let endDate = new Date(nextElec !== Infinity ? nextElec : Date());
  
    filtered = filtered.filter(poll => new Date(poll.field) > startDate && new Date(poll.field) < endDate);
  
    return(filtered);
  }
  
  function ResultsTable({pollList, activePoll, onClickRow}) {
    return(
      <table>
        {pollList.map((poll, index) => <Row poll={poll} active={activePoll===index} onClickRow={onClickRow(index)}/>)}
      </table>
    );
  }
  
  function PollingContent({jurisdiction, election}) {
    let pollList = filterPolls(polls, jurisdiction, election);
    let [pollsActive, setPollsActive] = useState(null);
  
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
  
    return(
      <div>
        <Scatterplot jurisdiction={jurisdiction} election={election} onClickPoll={handleClickPoll} />
        <ResultsTable pollList={pollList} onClickRow={handleClickRow} activePoll={pollsActive} />
      </div>
    )
  }
  
  function PollID(poll) {
    let id = poll.company.toLowerCase().replace(" ","-") + "-" + poll.field.join('-');
    return(id);
  }
  
  function Scatterplot({jurisdiction, election, onClickPoll}) {
  
    let plotWidth = 1600;
    let plotHeight = 900;
    let padding = 50;
  
    let electionObject = {field: election.date, poll: election.results.sort((a, b) => a.score - b.score)};
    let pollList = filterPolls(polls, jurisdiction, election);
    pollList.push(electionObject);
  
    let startDate = new Date(election.date);
  
    // Chart either ends today, or at the next election
  
    let elecs = elections.content[jurisdiction]
    elecs = elecs.filter(election => new Date(election.date) > startDate);
    let nextElec = Math.min.apply(null, elecs.map(election => new Date(election.date)));
  
    let endDate = new Date(nextElec !== Infinity ? nextElec : Date());
  
    // We can now scale objects based on the graph's span
  
    function xMap(date) {
      let x = (plotWidth-padding*2)*(date-startDate)/(endDate-startDate) + padding + 25;
      return(x);
    }
  
    // Let's also scale objects vertically based on the highest poll value
  
    let highScore = Math.max(...pollList.map(poll => Math.max(...poll.poll.map((party) => party.score))));
  
    function yMap(score) {
      let y = (plotHeight-padding*2)*(1-score/highScore) + padding;
      return(y);
    }
  
    // Generate the date arrays needed for horizontal marker lines + statistical calculations
  
    let tickMonth = new Date(startDate).setDate(0);
  
    let monthArray = [new Date(tickMonth)];
  
    while (tickMonth < endDate) {
      tickMonth = new Date(tickMonth).setMonth(new Date(tickMonth).getMonth() + 1);
      monthArray.push(new Date(tickMonth));
    }
  
    monthArray.shift(1);
    monthArray.splice(-1);

    let tickDay = new Date(startDate);

    let dayArray = [new Date(tickDay)];

    while (tickDay < endDate) {
        tickDay = new Date(tickDay).setDate(new Date(tickDay).getDate() + 1);
        dayArray.push(new Date(tickDay));
    }

    dayArray.splice(-1); 
      
    // Generate vertical marker lines
  
    let scoreTicks = Math.round((highScore - 5)/10);
    let scoreArray = [];
    
    for (let n = 0; n <= scoreTicks; n++) {
      scoreArray.push(n*10);
    }
  
    // Weight polls

    function weightPolls(day, polls) {
        let weightedPolls = polls.map(poll => {let d = Math.abs((new Date(poll.field) - day)/(24*60*60*1000)); poll.weight = (d+1)**-3; return(poll)}) // Weight function
        return(weightedPolls);
    }

    // Generate trendlines

    function rollingAverage(days, party) {
      
        let output = [];

        // We only care about polls with the relevant party

        let partyPolls = pollList.filter(x => x.poll.map(x => x.party).includes(party));

        // If the party didn't contest the last election, we have to cut its line short somewhere

        if (!election.results.map(x => x.party).includes(party)) {

            let appearances = partyPolls.map(x => new Date(x.field));
            let firstAppearance = Math.min.apply(null, appearances);
            let lastAppearance = Math.max.apply(null, appearances);

            days = days.filter(day => new Date(day) >= new Date(firstAppearance) && new Date(day) <= new Date(lastAppearance));
        }

        for (let day of days) {

            let weightedPolls = weightPolls(day, partyPolls);

            // Collect values for the relevant party

            weightedPolls = weightedPolls.map(poll => {poll.value = poll.poll.filter(x => x.party === party)[0].score; return(poll)});
            let weightSum = weightedPolls.reduce((a, b) => a + b.weight, 0);
    
            let avg = weightedPolls.map(poll => poll.value*(poll.weight/weightSum)).reduce((x,y)=>x+y,0);
    
            output.push({date: day, score: avg});

        }
    
        return(output);
    }

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
    validParties = validParties.filter(x => x[1] > 2).map(y => y[0]);

    // Plot polls
  
    return (
      <svg className="scatter" viewBox={`0 0 ${plotWidth} ${plotHeight}`}>
          <g className="timeTicks" stroke="#b0b0b0" strokeLinecap="round">
            {monthArray.map(day =>
              <g>
                <path
                d={`M ${xMap(day)} ${padding} v ${plotHeight-padding*2}`}
                strokeWidth={(day.getMonth() === 0 ? "2" : "0.5")}/>
                {day.getMonth() === 0 && <text fontSize="20pt" textAnchor="middle" x={xMap(day)} y={940-padding}>{day.getYear() + 1900}</text>}
              </g>
            )}</g>
  
          <g className="scoreTicks">
            {scoreArray.map(score =>
              <text fontSize="20pt" x={padding - 5} y={yMap(score)} textAnchor="end">{score}</text>
              )}</g>

            {validParties.map(party => { let line = rollingAverage(dayArray, party);
                return <path
                stroke={brandColours[parties.content[jurisdiction][party]?.colour || "gray"]}
                fill="none"
                strokeWidth="2"
                d={"M " + line.map(event => String(xMap(event.date)) + " " + String(yMap(event.score))).join(" L ")}/>
            })}
  
          <g className="scatterElection">
            {election.results.map(line => 
              <g>
                <circle r="22"
                cx={xMap(new Date(election.date))}
                cy={yMap(line.score)}
                fill="white"/>
                <circle r="16"
                  cx={xMap(new Date(election.date))}
                  cy={yMap(line.score)}
                  fill="none"
                  stroke={brandColours[parties.content[jurisdiction][line.party]?.colour || "gray"]}
                  strokeWidth="4"/>
                <circle r="8"
                  cx={xMap(new Date(election.date))}
                  cy={yMap(line.score)}
                  fill={brandColours[parties.content[jurisdiction][line.party]?.colour || "gray"]}/>
                </g>)}
              </g>
  
          {pollList.map((poll, index) => poll.company && <g className="scatterPoll"><a href={"#"+PollID(poll)} onClick={onClickPoll(index)}>{poll.poll.map(line => 
                poll.field !== election.date && <circle r="8"
                  cx={xMap(new Date(poll.field)) + Math.floor(Math.random()*6) - 3}
                  cy={yMap(line.score) + Math.floor(Math.random()*6) - 3}
                  fill={brandColours[parties.content[jurisdiction][line.party]?.colour || "gray"]}
                  />
            )}</a></g>)}
  
      </svg>
    );
  
  }
  
  export default PollingContent