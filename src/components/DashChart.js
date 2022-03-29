import * as React from "react"
import { graphql, Link } from "gatsby"

import parties from "../../content/parties.json"

import "../css/sandbox.css"

let title = {
    BC: "British Columbia",
    AB: "Alberta",
    SK: "Saskatchewan",
    MB: "Manitoba",
    ON: "Ontario",
    QC: "Quebec",
    NB: "New Brunswick",
    PE: "Prince Edward Island",
    NS: "Nova Scotia",
    NL: "Newfoundland & Lab.",
    YT: "Yukon",
    Canada_BC: "British Columbia",
    Canada_AB: "Alberta",
    Canada_SKMB: "Sask./Man.",
    Canada_ON: "Ontario",
    Canada_QC: "Quebec",
    Canada_ATL: "Atlantic",
    Canada: "Canada"
  }

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

function DashChart({polls, jurisdiction, election, plotWidth, plotHeight, className}) {

    let padding = 50;

    let electionObject = {field: election.date, poll: election.results.sort((a, b) => a.score - b.score)};
    let pollList = [...polls];
    pollList.push(electionObject);
  
    let startDate = new Date(election.date);

    let endDate = new Date();
    
    // We can now scale objects based on the graph's span
  
    function xMap(date) {
      let x = (plotWidth-padding*2)*(date-startDate)/(endDate-startDate) + padding;
      return(x);
    }
  
    // Let's also scale objects vertically based on the highest poll value
  
    let highScore = Math.max(...pollList.map(poll => Math.max(...poll.poll.map((party) => party.score))));
  
    function yMap(score) {
      let y = (plotHeight-padding*2)*(1-score/highScore) + padding;
      return(y);
    }
  
    // Generate the date arrays needed for horizontal marker lines + statistical calculations
  
    let tickDay = new Date(startDate);

    let dayArray = [new Date(tickDay)];

    while (tickDay < endDate) {
        tickDay = new Date(tickDay).setDate(new Date(tickDay).getDate() + 1);
        dayArray.push(new Date(tickDay));
    }

    dayArray.splice(-1);

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

    return(
        <div className={className}>
        <Link to={`/${jurisdiction.replace("_","-")}-${election.year}`} style={{textDecoration: "none"}}>
        <svg viewBox={`0 0 ${plotWidth} ${plotHeight}`}>
            <rect width={plotWidth} height={plotHeight} fill="white" />
            {validParties.map(party => { let line = rollingAverage(dayArray, party);
                return <path
                stroke={brandColours[parties.content[bj][party]?.colour || "gray"]}
                fill="none"
                strokeWidth="4"
                d={"M " + line.map(event => String(xMap(event.date)) + " " + String(yMap(event.score))).join(" L ")}/>
            })}

            <path
                d ={`M ${padding} ${padding} v ${plotHeight-padding*2} h ${plotWidth-padding*2}`}
                stroke = "black"
                fill = "none"
                strokeWidth = "4px"
            />

        </svg>
        <div className={`${className}Title`}>{title[jurisdiction]}</div>
        </Link>
        </div>
    );
}

export default DashChart;

export const pollQuery = graphql`
    fragment PollInformation on PollsJson {
        field
        poll {
            party
            score
        }
    }

    fragment ElectionInformation on ElectionsJson {
        date
        results {
            party
            score
        }
    }
`