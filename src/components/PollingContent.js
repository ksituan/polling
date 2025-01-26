import * as React from "react"
import { Link } from "gatsby"

import parties from "../../content/parties.json"

import "../css/sandbox.css"
import { useState } from "react";

import PartyList from "../components/PartyList.js"

import BarChart from "../components/polling-pages/BarChart.js"

import Scatterplot from "../components/Scatterplot.js"
import SinglePollingAverage from "../components/SinglePollingAverage.js"

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
    "gray" : "#d0d0d0",
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
    
  function Row({poll, lastElection, active, onClickRow}) {

    let bj = poll.jurisdiction.split("_")[0];
    let pinfo = parties.content[bj];

    let field = new Date(poll.field + "T00:00");
  
    poll.poll = poll.poll.sort((a, b) => b.score - a.score);
    
    return (
      <div className="pollRow">
      {active && <BarChart poll={poll} id={PollID(poll)} lastElection={lastElection} parties={parties} title={title} brandColours={brandColours} />}
      <button className="pollLink" onClick={onClickRow}>
        <p className={poll.last && lastElection.nextWrit && new Date(poll.field) > new Date(lastElection.nextWrit) ? "pollInfo lastPoll" : "pollInfo"} bgcolor="white">{poll.company}</p>
        <p className="pollInfo pollDate" bgcolor="white">{field.toLocaleString("en-CA",{"dateStyle":"medium"})}</p>
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
    validParties = validParties.filter(x => !["AIP", "PVQ"].includes(x[0])).map(y => y[0]); // Yeah, I excluded the Alberta Independence Party from having a trendline

    return(validParties);
  }

  function Checkboxes({companies, checked, handleCompanyClick}) {

    return(
      <div className="checkboxes">
        {companies.map((company, index) =>
        <div>
          <input type="checkbox" name={company} value={company} checked={checked[index]} onChange={() => handleCompanyClick(index)} />
          <div style={{textAlign: "center"}}>{company}</div>
        </div>
          )}
      </div>
    )
  }
  
  function PollingContent({polls, jurisdiction, election, nextElection, name}) {
    let pollList = polls;
    let [livePolls, setLivePolls] = useState(polls);
    let [pollsActive, setPollsActive] = useState(null);
    let validParties = listValidParties(polls);

    let companies = polls.map(poll => poll.company);
    companies = [...new Set(companies)];
    companies = companies.sort()

    for (let company of companies) {
      let pidx = pollList.findIndex(x => x.company === company);
      if (pidx > -1) {(pollList[pidx]).last = true}
    }

    const relevantParties = parties.content[jurisdiction.split("_")[0]];
    const endDate = nextElection ? new Date(nextElection.date) : new Date();

    let todaysAverage = SinglePollingAverage(livePolls.filter(x => x.last), endDate, relevantParties);
  
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

    const [checked, setChecked] = useState(
      new Array(companies.length).fill(true)
    );

    const handleCompanyClick = (position) => {
      let updatedChecked = checked.map((item, index) =>
      index === position ? !item : item)
      if(updatedChecked.reduce((a,b) => a || b)) { // Don't uncheck the last box
        setChecked(updatedChecked);
      } else {
        updatedChecked = checked;
      }

      let checkedCompanies = companies.filter((company, index) => updatedChecked[index]);
      let filteredPolls = polls.filter(x => checkedCompanies.includes(x.company));
      setLivePolls(filteredPolls);
    }

    return(
      <div>
        <div>
          <h2>{name + " trendlines"}</h2>
          <div className="credit">Polling Canada / Alex McPhee{election.credit && " / " + election.credit}</div>
        </div>
        <PartyList todaysAverage={todaysAverage} relevantParties={relevantParties} election={election} brandColours={brandColours} />
        <Scatterplot polls={livePolls} jurisdiction={jurisdiction} election={election} nextElection={nextElection} validParties={validParties} onClickPoll={handleClickPoll} brandColours={brandColours} parties={parties} />
        <Checkboxes companies={companies} checked={checked} handleCompanyClick={handleCompanyClick} />
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