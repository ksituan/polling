import * as React from "react"

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
  
      let chartWidth = 1600;
      let chartHeight = 900;
      let barPadding = 20;
      let bottom = 250;
      let right = poll.poll.length <= 4 ? 400 : 200;
  
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
      <div className="pollLink" onClick={onClickRow}>
        <p className="pollInfo" bgcolor="white">{poll.company}</p>
        <p className="pollInfo pollDate" bgcolor="white">{new Date(new Date(field).setDate(new Date(field).getDate() + 1)).toLocaleString("en-CA",{"dateStyle":"short"})}</p>
        <div className="entryContainer">
      {poll.poll.map((party, i) => {
        let hist = Math.round(lastElection.results.filter(x => x.party === party.party)[0]?.score);
        return (hist < party.score || Number.isNaN(hist)) ?
        <div className="pollEntry" style={{backgroundColor: brandColours[pinfo[party.party]?.colour || "gray"], borderColor: brandColours[pinfo[party.party]?.colour || "gray"]}}>
          <div className="pollScore">{Math.round(party.score)}</div>
          <div className="pollParty">{party.party}</div>
        </div> :
        <div className="pollEntry" style={{borderColor: brandColours[pinfo[party.party]?.colour || "gray"]}}>
          <div className="pollScore">{Math.round(party.score)}</div>
          <div className="pollParty">{party.party}</div>
        </div>
      })}
      </div>
      </div>
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
  
  function Scatterplot({polls, jurisdiction, election, endDate, onClickPoll}) {

    let plotWidth = 1600;
    let plotHeight = 900;
    let padding = 50;
  
    let electionObject = {field: election.date, poll: election.results.sort((a, b) => a.score - b.score)};
    let pollList = [...polls];
    pollList.push(electionObject);
  
    let startDate = new Date(election.date);
  
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

        let period = (endDate - startDate)/(24*60*60*1000);

        let weightedPolls = polls.map(poll => {let d = (new Date(poll.field) - day)/(24*60*60*1000)/(period/60); poll.weight = 1/(Math.exp(d) + 2 + Math.exp(-d)); return(poll)}) // Weight function

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
    validParties = validParties.filter(x => x[1] > 2 && x[0] !== "AIP").map(y => y[0]);

    // Plot polls

    let bj = jurisdiction.split("_")[0];
  
    return (
      <svg className="scatter" viewBox={`0 0 ${plotWidth} ${plotHeight}`}>
          <g className="timeTicks">
            {monthArray.map(day =>
              <g>
                <path
                d={`M ${xMap(day)} ${padding} v ${plotHeight-padding*2}`}
                stroke="#b0b0b0"
                strokeLinecap="round"
                strokeWidth={(day.getMonth() === 0 ? "2" : "0.5")}/>
                {day.getMonth() === 0 && <text className="timeLabel" fontSize="20pt" textAnchor="middle" x={xMap(day)} y={935-padding}>{day.getYear() + 1900}</text>}
              </g>
            )}</g>
  
          <g className="scoreTicks">
            {scoreArray.map(score =>
              <text fontSize="20pt" x={padding - 5} y={yMap(score)} textAnchor="end">{score}</text>
              )}</g>

            {validParties.map(party => { let line = rollingAverage(dayArray, party);
                return <path
                stroke={brandColours[parties.content[bj][party]?.colour || "gray"]}
                className={"trendline"}
                fill="none"
                d={"M " + line.map(event => String(xMap(event.date)) + " " + String(yMap(event.score))).join(" L ")}/>
            })}
  
          <g className="scatterElection">
            {election.results.map(line => 
              <g>
                <circle className="electionHalo" r="22"
                cx={xMap(new Date(election.date))}
                cy={yMap(line.score)}
                fill="white"/>
                <circle className="electionHalo" r="16"
                  cx={xMap(new Date(election.date))}
                  cy={yMap(line.score)}
                  fill="none"
                  stroke={brandColours[parties.content[bj][line.party]?.colour || "gray"]}
                  strokeWidth="4"/>
                <circle r="8"
                  cx={xMap(new Date(election.date))}
                  cy={yMap(line.score)}
                  fill={brandColours[parties.content[bj][line.party]?.colour || "gray"]}/>
                </g>)}
              </g>
  
          {pollList.map((poll, index) => poll.company && <g className="scatterPoll"><a href={"#"+PollID(poll)} onClick={onClickPoll(index)}>{poll.poll.map(line => 
                poll.field !== election.date && <circle r="8"
                  className={line.party}
                  cx={xMap(new Date(poll.field))}
                  cy={yMap(line.score)}
                  fill={brandColours[parties.content[bj][line.party]?.colour || "gray"]}
                  />
            )}</a></g>)}
  
      </svg>
    );
  
  }

  function PollingContent({polls, jurisdiction, election, endDate, name}) {
    let pollList = polls;
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

    console.log(polls);
  
    
    return(
      <div>
        <div>
          <h2>{name + " trendlines"}</h2>
          <div className="credit">Polling Canada / Prairie Heart</div>
        </div>
        <Scatterplot polls={polls} jurisdiction={jurisdiction} election={election} endDate={endDate} onClickPoll={handleClickPoll} />
        <p>Outside of an election, nobody can guarantee that trendlines describe the past or predict the future: they just indicate where market research firms are willing to stake their reputations.</p>
        <h2>{name + " polling database"}</h2>
        <p>A solid box indicates that a party is polling above its last election result. Click any poll to see a chart with more information.</p>
        {polls.length > 0 ? <ResultsTable pollList={pollList} lastElection={election} onClickRow={handleClickRow} activePoll={pollsActive} /> : <p>There have been no polls conducted since the last election.</p>}
      </div>
    )
  }
  
  export default PollingContent