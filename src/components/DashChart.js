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

const partylist = parties;

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

        // Also have to manually cut off certain parties

        const j = jurisdiction.split("_")[0];

        if (partylist.content) {
        if (Object.hasOwn(partylist?.content[j][party], "end")) {
            positions = positions.filter(sample => sample <= xMap(new Date(partylist.content[j][party].end)));
        }
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

    // Add major ticks

    let scoreTicks = Math.round((highScore - 5)/10);
    let scoreArray = [];
    
    for (let n = 0; n <= scoreTicks; n++) {
      scoreArray.push(n*10);
    }

    // Plot polls

    let bj = jurisdiction.split("_")[0];

    return(
        <div className={className + (election.nextWrit ? " writ" : "")}>
            <svg viewBox={`0 0 ${plotWidth} ${plotHeight}`}>
                <rect fill="white" width={plotWidth} height={plotHeight} />

                <g className="ticks timeTicks">

            {election.nextWrit && <g>
              <path
                className="writLine"
                d={`M ${xMap(new Date(election.nextWrit))} ${padding} v ${plotHeight-padding*2}`}
                stroke="#b0b0b0"
                strokeLinecap="round"
                strokeWidth="2"
              />
            </g>}
            </g>

                <g className="ticks scoreTicks">
                    {scoreArray.map(score =>
                                <path
                                className="major"
                                d={`M ${padding} ${yMap(score)} h ${plotWidth-padding*2}`}
                                stroke="#b0b0b0"
                                strokeLinecap="round"
                                strokeWidth="2" />
                    )}
                </g>

                {validParties.length > 0 && validParties.map(party => { let line = rollingAverage(samplePositions, party);
                    return <path
                    className="trendline"
                    stroke={brandColours[parties.content[bj][party]?.colour || "gray"]}
                    fill="none"
                    strokeWidth="5"
                    d={"M " + line.map(event => String(event.x) + " " + String(yMap(event.score))).join(" L ")}/>
                })}

                {(validParties.length === 0 && jurisdiction !== 'Canada') &&
                <g className="pollingCat" transform="scale(2) translate(52 109)">
                <path fill="#52475b" d="m 39.128317,5.2279665 c -3.015211,-0.009 -3.954722,2.9289878 -5.675622,5.7722585 H 23.928727 C 22.114635,8.2471772 20.728292,5.7090743 18.156471,5.7090743 c -6.327958,0 -10.8706535,23.2798757 -10.8706535,31.2652757 0,14.985679 5.2715145,19.001919 11.8328685,23.56962 h 53.77656 c 4.33395,-3.07843 11.44788,-10.759202 11.44788,-23.184631 0,-0.06724 -0.003,-0.132463 -0.004,-0.199472 6.46185,-2.367526 11.14653,-7.265537 13.57902,-11.845271 a 3,3 0 0 0 -1.24178,-4.056599 3,3 0 0 0 -1.39889,-0.351401 3,3 0 0 0 -2.65823,1.593701 c -1.53829,2.896201 -4.7687,6.385399 -8.87181,8.382434 -1.94915,-10.291373 -8.4067,-16.929571 -14.79703,-18.92029 -7.52976,-2.3456773 -14.341913,-3.0335516 -23.954093,-0.673346 0,0 -2.115323,-6.0498837 -5.868376,-6.0611285 z" />
                <path fill="#382f45" d="M 56.299362,9.8251019 C 52.871351,9.8072719 49.20202,10.256505 44.996693,11.289095 49.422,23.217818 49.51838,28.893705 49.51838,28.893705 61.82387,25.135396 72.795866,26.176976 83.302876,28.893189 80.944996,19.735986 74.919166,13.821713 68.950786,11.962441 64.715296,10.642995 60.706804,9.848028 56.299362,9.8251019 Z" />
                <g stroke="black" fill="none" strokeWidth="1.5">
                    <path d="m 39.128317,5.2279665 c -3.015211,-0.009 -3.954722,2.9289878 -5.675622,5.7722585 H 23.928727 C 22.114635,8.2471772 20.728292,5.7090743 18.156471,5.7090743 c -6.327958,0 -10.8706535,23.2798757 -10.8706535,31.2652757 0,14.985679 5.2715145,19.001919 11.8328685,23.56962 h 53.77656 c 4.33395,-3.07843 11.44788,-10.759202 11.44788,-23.184631 0,-0.06724 -0.003,-0.132463 -0.004,-0.199472 6.46185,-2.367526 11.14653,-7.265537 13.57902,-11.845271 a 3,3 0 0 0 -1.24178,-4.056599 3,3 0 0 0 -1.39889,-0.351401 3,3 0 0 0 -2.65823,1.593701 c -1.53829,2.896201 -4.7687,6.385399 -8.87181,8.382434 -1.94915,-10.291373 -8.4067,-16.929571 -14.79703,-18.92029 -7.52976,-2.3456773 -14.341913,-3.0335516 -23.954093,-0.673346 0,0 -2.115323,-6.0498837 -5.868376,-6.0611285 z" />
                    <path d="m 45.766363,20.427988 c 4.232844,0 7.599881,0.481004 7.599881,0.481004" />
                    <path d="m 45.381558,17.638158 c 4.617649,-1.731619 7.599881,-1.443017 7.599881,-1.443017" />
                    <path d="M 10.50096,17.814314 C 5.2657265,16.387544 2.4758965,16.579946 2.4758965,16.579946" />
                    <path d="m 9.6333465,21.063715 c -5.425832,-0.539528 -7.92706,0.133879 -7.92706,0.133879" />
                </g>
                <path fill="#c02f42" stroke="black" strokeWidth="1.5" d="M 36.128272,6.6482342 C 33.391973,2.3471992 29.520899,1.5245961 29.520899,1.5245961 l 0.629051,2.1290931 c 0,0 -3.822687,-1.306489 -5.806612,-1.451653 l 1.354874,1.935535 c 0,0 -1.418807,0.07776 -2.854915,0.629052 -2.839741,1.090124 -4.209793,5.8066088 -4.209793,5.8066088 l 2.758138,-0.8226008 -1.693598,4.3549558 c 0,0 3.847352,-2.436429 13.754651,-3.105362 z" />
                <circle r="1.924" cy="20.139" cx="19.696" fill="black" />
                <circle r="1.924" cy="20.139" cx="37.493" fill="black" />
                <path fill="none" stroke="black" strokeWidth="1.5" d="M 34.698225,25.125069 C 33.518849,27.741 29.055469,27.019839 28.625961,24.23811 28.196453,27.019842 23.733073,27.741 22.553697,25.12507" />
                </g>}

                {(validParties.length === 0 && jurisdiction === 'Canada') &&
                <g className="pollingCat" transform="scale(2) translate(200 134)">
                <path fill="#52475b" d="m 39.128317,5.2279665 c -3.015211,-0.009 -3.954722,2.9289878 -5.675622,5.7722585 H 23.928727 C 22.114635,8.2471772 20.728292,5.7090743 18.156471,5.7090743 c -6.327958,0 -10.8706535,23.2798757 -10.8706535,31.2652757 0,14.985679 5.2715145,19.001919 11.8328685,23.56962 h 53.77656 c 4.33395,-3.07843 11.44788,-10.759202 11.44788,-23.184631 0,-0.06724 -0.003,-0.132463 -0.004,-0.199472 6.46185,-2.367526 11.14653,-7.265537 13.57902,-11.845271 a 3,3 0 0 0 -1.24178,-4.056599 3,3 0 0 0 -1.39889,-0.351401 3,3 0 0 0 -2.65823,1.593701 c -1.53829,2.896201 -4.7687,6.385399 -8.87181,8.382434 -1.94915,-10.291373 -8.4067,-16.929571 -14.79703,-18.92029 -7.52976,-2.3456773 -14.341913,-3.0335516 -23.954093,-0.673346 0,0 -2.115323,-6.0498837 -5.868376,-6.0611285 z" />
                <path fill="#382f45" d="M 56.299362,9.8251019 C 52.871351,9.8072719 49.20202,10.256505 44.996693,11.289095 49.422,23.217818 49.51838,28.893705 49.51838,28.893705 61.82387,25.135396 72.795866,26.176976 83.302876,28.893189 80.944996,19.735986 74.919166,13.821713 68.950786,11.962441 64.715296,10.642995 60.706804,9.848028 56.299362,9.8251019 Z" />
                <g stroke="black" fill="none" strokeWidth="1.5">
                    <path d="m 39.128317,5.2279665 c -3.015211,-0.009 -3.954722,2.9289878 -5.675622,5.7722585 H 23.928727 C 22.114635,8.2471772 20.728292,5.7090743 18.156471,5.7090743 c -6.327958,0 -10.8706535,23.2798757 -10.8706535,31.2652757 0,14.985679 5.2715145,19.001919 11.8328685,23.56962 h 53.77656 c 4.33395,-3.07843 11.44788,-10.759202 11.44788,-23.184631 0,-0.06724 -0.003,-0.132463 -0.004,-0.199472 6.46185,-2.367526 11.14653,-7.265537 13.57902,-11.845271 a 3,3 0 0 0 -1.24178,-4.056599 3,3 0 0 0 -1.39889,-0.351401 3,3 0 0 0 -2.65823,1.593701 c -1.53829,2.896201 -4.7687,6.385399 -8.87181,8.382434 -1.94915,-10.291373 -8.4067,-16.929571 -14.79703,-18.92029 -7.52976,-2.3456773 -14.341913,-3.0335516 -23.954093,-0.673346 0,0 -2.115323,-6.0498837 -5.868376,-6.0611285 z" />
                    <path d="m 45.766363,20.427988 c 4.232844,0 7.599881,0.481004 7.599881,0.481004" />
                    <path d="m 45.381558,17.638158 c 4.617649,-1.731619 7.599881,-1.443017 7.599881,-1.443017" />
                    <path d="M 10.50096,17.814314 C 5.2657265,16.387544 2.4758965,16.579946 2.4758965,16.579946" />
                    <path d="m 9.6333465,21.063715 c -5.425832,-0.539528 -7.92706,0.133879 -7.92706,0.133879" />
                </g>
                <path fill="#c02f42" stroke="black" strokeWidth="1.5" d="M 36.128272,6.6482342 C 33.391973,2.3471992 29.520899,1.5245961 29.520899,1.5245961 l 0.629051,2.1290931 c 0,0 -3.822687,-1.306489 -5.806612,-1.451653 l 1.354874,1.935535 c 0,0 -1.418807,0.07776 -2.854915,0.629052 -2.839741,1.090124 -4.209793,5.8066088 -4.209793,5.8066088 l 2.758138,-0.8226008 -1.693598,4.3549558 c 0,0 3.847352,-2.436429 13.754651,-3.105362 z" />
                <circle r="1.924" cy="20.139" cx="19.696" fill="black" />
                <circle r="1.924" cy="20.139" cx="37.493" fill="black" />
                <path fill="none" stroke="black" strokeWidth="1.5" d="M 34.698225,25.125069 C 33.518849,27.741 29.055469,27.019839 28.625961,24.23811 28.196453,27.019842 23.733073,27.741 22.553697,25.12507" />
                </g>}

                <path
                    className="axis"
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