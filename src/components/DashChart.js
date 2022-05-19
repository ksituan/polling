import * as React from "react"
import { graphql } from "gatsby"

import parties from "../../content/parties.json"

import "../css/sandbox.css"

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

    let padding = 10;

    let electionObject = {field: election.date, poll: election.results.sort((a, b) => a.score - b.score)};
    let pollList = [...polls];
    pollList.push(electionObject);
  
    let startDate = new Date(election.date);

    let endDate = new Date();

    let nextWrit = new Date(election.nextWrit);

    // We can now scale objects based on the graph's span

    let prewritPolls = pollList.filter(x => new Date(x.field) < nextWrit).length;
    let allPolls = pollList.length;

    function xMap(date) { 

      let x = (plotWidth-padding*2)*(date-startDate)/(endDate-startDate) + padding;

      // Time to make things more complicated. X is a discontinuous function that scales based on the writ (!!!)

      if (election.nextWrit) {
        let midpoint = (plotWidth-padding*2)*(prewritPolls/allPolls) + padding;
        if (date <= nextWrit) {
          x = (midpoint-padding*2)*(date-startDate)/(nextWrit-startDate) + padding;
        } 
        if (date > nextWrit) {
          x = (plotWidth-midpoint)*(date-nextWrit)/(endDate-nextWrit) + midpoint - padding;
        }
      }

      return(x);
    }
  
    // Let's also scale objects vertically based on the highest poll value
  
    let highScore = Math.max(...pollList.map(poll => Math.max(...poll.poll.map((party) => party.score))));
  
    function yMap(score) {
      let y = (plotHeight-padding*2)*(1-score/highScore) + padding;
      return(y);
    }
  
    // Generate the date arrays needed for horizontal marker lines + statistical calculations

    let positions = [...Array(plotWidth).keys()];

    let samplePositions = []
    for (var i = 0; i < positions.length; i = i+3) { // Only take every fourth position
        samplePositions.push(positions[i]);
    }

    samplePositions = samplePositions.filter(x => x >= padding && x < plotWidth - padding)

    // Weight polls

    function weightPolls(sample, polls) {

        let period = plotWidth/50;

        let weightedPolls = polls.map(poll => {
            let d = (xMap(new Date(poll.field)) - sample)/period;
            let weight = (poll.n**0.5/30 || 1)/(Math.exp(d) + 2 + Math.exp(-d));
            return({
                ...poll,
                weight
            });
        }) // Weight function

        return(weightedPolls);
    }

    let weightedPollsObject = Object.fromEntries(samplePositions.map(x => [[x], weightPolls(x, pollList)]));

    // Generate trendlines

    function rollingAverage(positions, party) {
    
        let output = [];

        // We only care about polls with the relevant party

        let partyPolls = pollList.filter(x => x.poll.map(x => x.party).includes(party));

        // If the party didn't contest the last election, we have to cut its line short somewhere

        if (!election.results.map(x => x.party).includes(party)) {

            let appearances = partyPolls.map(x => xMap(new Date(x.field)));
            let firstAppearance = Math.min.apply(null, appearances);

            positions = positions.filter(sample => sample >= firstAppearance);
        }

        for (const sample of positions) {

            let weightedPolls = weightedPollsObject[sample]

            // Collect values for the relevant party

            let weightSum = 0;
            let valueSum = 0
            for (const poll of weightedPolls) {
                let value = poll.poll.filter(x => x.party === party)[0]?.score;
                if (value !== undefined) {
                    weightSum += poll.weight;
                    valueSum += value * poll.weight;
                }
            }

            output.push({x: sample, score: valueSum/weightSum})
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

    console.log(election);

    return(
        <div className={className + (election.nextWrit ? " writ" : "")}>
            <svg viewBox={`0 0 ${plotWidth} ${plotHeight}`}>
                <rect fill="white" width={plotWidth} height={plotHeight} />
                {validParties.map(party => { let line = rollingAverage(samplePositions, party);
                    return <path
                    stroke={brandColours[parties.content[bj][party]?.colour || "gray"]}
                    fill="none"
                    strokeWidth="5"
                    d={"M " + line.map(event => String(event.x) + " " + String(yMap(event.score))).join(" L ")}/>
                })}

                <path
                    d ={`M ${padding} ${padding} v ${plotHeight-padding*2} h ${plotWidth-padding*2}`}
                    stroke = "black"
                    fill = "none"
                    strokeWidth = "5px"
                />
            </svg>
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
        nextWrit
        results {
            party
            score
        }
    }
`