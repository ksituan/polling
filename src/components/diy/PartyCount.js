import * as React from "react"

function PartyCount({sortOrder, colours, size}) {

    function evaluateRating(colour) {
        let value = 10 * sortOrder.indexOf(colour.slice(0, -1));
        if (sortOrder.indexOf(colour.slice(0, -1)) > sortOrder.indexOf("blank")) {
            value += colour.slice(-1);
        } else {
            value -= colour.slice(-1);
        }
        return(value);
    }

    colours = Object.values(colours).sort((a,b) => evaluateRating(a) - evaluateRating(b));

    const colourCounts = {};
    for (const n of colours) {
        colourCounts[n] = colourCounts[n] ? colourCounts[n] + 1 : 1;
    }

    const colourSet = Array.from(new Set(colours)).sort((a,b) => evaluateRating(a) - evaluateRating(b));

    let partyCounts = {};
    for (const x of colours.map(x => x.slice(0, -1))) {
        partyCounts[x] = partyCounts[x] ? partyCounts[x] + 1 : 1;
    }

    return(
        <div className="bar">
            <div className="partyCount">
                {colourSet.map(x => 
                <svg key={x} className="partyCounter" viewBox={`0 0 ${colourCounts[x]*1200/size} 36`}>
                    <rect x="-1" width={colourCounts[x]*1200/size + 2} height="36" fill={`url(#${x})`} />
                </svg>)}
            </div>
            <div className="partyCountLabels">
                {Object.entries(partyCounts).map(x => 
                <div key={x[0]} className="partyCounterLabel" style={{width: (100*x[1]/size) + "%"}}>{x[0] === "blank" ? "" : x[1]}</div>)}
            </div>
        </div>
    )
}

export default PartyCount;