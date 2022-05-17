import * as React from "react"

function PollID(poll) {
    let id = poll.company.toLowerCase().replace(" ","-").replace(".","") + "-" + poll.field;
    return(id);
}

function Scatterplot({polls, jurisdiction, election, nextElection, validParties, onClickPoll, brandColours, parties}) {

    const endDate = nextElection ? new Date(nextElection.date) : new Date()

    let plotWidth = 1600;
    let plotHeight = 900;
    let ypadding = 40;
    let xpadding = 75;
    let circleSize = 8;
  
    let electionObject = {field: election.date, poll: election.results.sort((a, b) => a.score - b.score)};
    let pollList = [...polls];
    pollList.push(electionObject);
  
    let startDate = new Date(election.date);

    let nextWrit = new Date(election.nextWrit);
  
    // We can now scale objects based on the graph's span
  
    let prewritPolls = pollList.filter(x => new Date(x.field) < nextWrit).length;
    let allPolls = pollList.length;

    // Shrink dots if too many polls

    if (allPolls > 150) {
      circleSize = 4;
    }

    function xMap(date) { 

      let x = (plotWidth-xpadding*2)*(date-startDate)/(endDate-startDate) + xpadding;

      // Time to make things more complicated. X is a discontinuous function that scales based on the writ (!!!)

      if (election.nextWrit) {
        let midpoint = (plotWidth-xpadding*2)*(prewritPolls/allPolls) + xpadding;
        if (date <= nextWrit) {
          x = (midpoint-xpadding*2)*(date-startDate)/(nextWrit-startDate) + xpadding;
        } 
        if (date > nextWrit) {
          x = (plotWidth-midpoint)*(date-nextWrit)/(endDate-nextWrit) + midpoint - xpadding;
        }
      }

      return(x);
    }
  
    // Let's also scale objects vertically based on the highest poll value
  
    let highScore = Math.max(...pollList.map(poll => Math.max(...poll.poll.map((party) => party.score))));
  
    function yMap(score) {
      let y = (plotHeight-ypadding*2)*(1-score/highScore) + ypadding;
      return(y);
    }
  
    // Generate the date arrays needed for horizontal marker lines + statistical calculations
  
    let tickMonth = new Date(startDate).setDate(0);
  
    let monthArray = [new Date(tickMonth)];

    let samplePositions = [...Array(plotWidth).keys()];
    samplePositions = samplePositions.filter(x => x >= xpadding && x < plotWidth - xpadding)
  
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

    let writArray = dayArray.filter(x => x > nextWrit);
      
    // Generate vertical marker lines
  
    let scoreTicks = Math.round((highScore - 5)/10);
    let scoreArray = [];
    
    for (let n = 0; n <= scoreTicks; n++) {
      scoreArray.push(n*10);
    }
  
    // Weight polls

    function weightPolls(sample, polls) {

        //let period = (endDate - startDate)/(24*60*60*1000);

        let period = 24;

        let weightedPolls = polls.map(poll => {let d = (xMap(new Date(poll.field)) - sample)/period; poll.weight = (poll.n**0.5/30 || 1)/(Math.exp(d) + 2 + Math.exp(-d)); return(poll)}) // Weight function

        return(weightedPolls);
    }

    // Generate trendlines

    function rollingAverage(positions, party) {
      
        let output = [];

        // We only care about polls with the relevant party

        let partyPolls = pollList.filter(x => x.poll.map(x => x.party).includes(party));

        // If the party didn't contest the last election, we have to cut its line short somewhere

        if (!election.results.map(x => x.party).includes(party)) {

            let appearances = partyPolls.map(x => xMap(new Date(x.field)));

            let firstAppearance = Math.min(...appearances);

            positions = positions.filter(sample => sample >= firstAppearance);
        }

        // Also have to manually cut off certain parties

        if (['PCA','WRP'].includes(party)) {
          positions = positions.filter(sample => sample <= xMap(new Date("2017-07-22")));
        }

        for (let sample of positions) {

            let weightedPolls = weightPolls(sample, partyPolls);

            // Collect values for the relevant party

            weightedPolls = weightedPolls.map(poll => {poll.value = poll.poll.filter(x => x.party === party)[0].score; return(poll)});
            let weightSum = weightedPolls.reduce((a, b) => a + b.weight, 0);
    
            let avg = weightedPolls.map(poll => poll.value*(poll.weight/weightSum)).reduce((x,y)=>x+y,0);
    
            output.push({position: sample, score: avg});

        }

        return(output);
    }

    // Plot polls

    let bj = jurisdiction.split("_")[0];

    // Get an array of label positions

    let partyLabels = validParties;

    partyLabels = partyLabels.map(function(party) {
      return({party: party, score: rollingAverage([plotWidth-xpadding], party)})
    });
    partyLabels = partyLabels.filter(party => party.score.length > 0)

    partyLabels = partyLabels.map(function (party) {
      party.pos = yMap(party.score[0].score) + 7;
      return(party);
      });
    partyLabels = partyLabels.sort((a,b) => a.pos - b.pos);
    
    function sortLabels(labels, span, buffer) {
      function getDistance(labels) {
        labels = labels.sort((a,b) => a.pos - b.pos);
        labels.forEach(function (item, ix) {
          item.dabove = labels[ix-1] ? item.pos - labels[ix-1].pos : span;
          item.dbelow = labels[ix+1] ? labels[ix+1].pos - item.pos : span;
        return(item);
        });
        return(labels);
      }
      
      labels = getDistance(labels);

      function evalDistance(labels) {
        let distances = labels.map(item => item.dabove).concat(labels.map(item => item.dbelow));
        return (Math.min(...distances) < buffer);
      }
  
      while (evalDistance(getDistance(labels))) {
        labels = getDistance(labels);
        for (let item of labels) {
          if (item.dabove < buffer) {
            item.pos += 1;
          }
          if (item.dbelow < buffer) {
            item.pos -= 1;
          }
        }
      }

      return(labels);
    }

    partyLabels = sortLabels(partyLabels, plotHeight, 30)

    // Do the same for the x-axis

    let timeLabels = dayArray.filter(day => election.nextWrit ?
      (day.getMonth() === 0 && day.getDate() === 1) || day.getTime() === new Date(election.nextWrit).getTime() || (day > new Date(election.nextWrit) && day.getDate() === 1) :
      day.getMonth() === 0 && day.getDate() === 1);

    timeLabels = timeLabels.map(
      function (day) {
        let label
        if (day.getTime() === new Date(election.nextWrit).getTime()) {
          label = "Writ";
        } else if (day.getMonth() === 0) {
          label = day.getFullYear();
        } else {
          label = day.toLocaleDateString("en-CA", {month: "short"});
        }
        label = {label: label, pos: xMap(day)}
        return(label)
      }
    )

    timeLabels = sortLabels(timeLabels, plotWidth, 70);

    return (
      <svg className="scatter" viewBox={`0 0 ${plotWidth} ${plotHeight}`}>
          <g className="timeTicks">
            {monthArray.map(day =>
                <path
                className={(day.getMonth() === 0 ? "major" : "minor")}
                d={`M ${xMap(day)} ${ypadding} v ${plotHeight-ypadding*2}`}
                stroke="#b0b0b0"
                strokeLinecap="round"
                strokeWidth={(day.getMonth() === 0 ? "2" : "0.5")}/>
            )}
            {election.nextWrit && <g>
              <path
                className="writLine"
                d={`M ${xMap(new Date(election.nextWrit))} ${ypadding} v ${plotHeight-ypadding*2}`}
                stroke="#b0b0b0"
                strokeLinecap="round"
                strokeWidth="2"
              />
              {writArray.map(day => 
                <path
                className={(day.getDate() === 1 ? "major" : "minor")}
                d={`M ${xMap(day)} ${ypadding} v ${plotHeight-ypadding*2}`}
                stroke="#b0b0b0"
                strokeLinecap="round"
                strokeWidth={(day.getDate() === 1 ? "2" : "0.5")}/>)}
            </g>}
            </g>
  
          <g className="scoreTicks">
            {scoreArray.map(score =>
              <text fontSize="20pt" x={xpadding - 25} y={yMap(score)} textAnchor="end">{score}</text>
              )}</g>

            {validParties.map(party => { let line = rollingAverage(samplePositions, party);
                return <path
                stroke={brandColours[parties.content[bj][party]?.colour || "gray"]}
                className={"trendline"}
                fill="none"
                d={"M " + line.map(event => String(event.position) + " " + String(yMap(event.score))).join(" L ")}/>
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
            {nextElection && nextElection.results.sort((a,b) => a.score - b.score).map(line => 
              <g>
                <circle className="electionHalo" r="22"
                cx={xMap(new Date(nextElection.date))}
                cy={yMap(line.score)}
                fill="white"/>
                <circle className="electionHalo" r="16"
                  cx={xMap(new Date(nextElection.date))}
                  cy={yMap(line.score)}
                  fill="none"
                  stroke={brandColours[parties.content[bj][line.party]?.colour || "gray"]}
                  strokeWidth="4"/>
                <circle r="8"
                  cx={xMap(new Date(nextElection.date))}
                  cy={yMap(line.score)}
                  fill={brandColours[parties.content[bj][line.party]?.colour || "gray"]}/>
                </g>)}
              </g>
  
          {pollList.map((poll, index) => poll.company && <g className="scatterPoll"><a href={"#"+PollID(poll)} onClick={onClickPoll(index)}>{poll.poll.map(line => 
                poll.field !== election.date && <circle r={circleSize}
                  className={line.party}
                  cx={xMap(new Date(poll.field))}
                  cy={yMap(line.score)}
                  fill={brandColours[parties.content[bj][line.party]?.colour || "gray"]}
                  />
            )}</a></g>)}

          {! nextElection && partyLabels.map(party => 
            <text className="partyLabel" textAnchor="start" x={plotWidth-xpadding + 8} y={party.pos}
              fill={brandColours[parties.content[bj][party.party]?.colour || "gray"]}
              fontWeight="bold" fontSize={(party.party.length > 4 || party.party === "PCPM") ? "16pt" : "18pt"}>
              {party.party}
            </text>)}

          {timeLabels.map(label =>
            <text className="timeLabel" fontSize="20pt" textAnchor="middle" x={label.pos} y={plotHeight - ypadding + 35}>{label.label}</text>)}

          <path className="mobileAxis" d={`M ${xpadding} ${ypadding} v ${plotHeight-ypadding*2} h ${plotWidth-xpadding*2}`} />
  
      </svg>
    );
  
}

export default Scatterplot