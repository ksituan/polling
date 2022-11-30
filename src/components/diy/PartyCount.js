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

    colours = Object.values(colours);
    colours = colours.sort((a,b) => evaluateRating(a) - evaluateRating(b));

    let partyCounts = {};
    for (const x of colours.map(x => x.slice(0, -1))) {
        partyCounts[x] = partyCounts[x] ? partyCounts[x] + 1 : 1;
    }

    console.log()

    return(
        <div className="bar">
            <div className="partyCount">
                {colours.map(x => 
                <svg className="partyCounter" viewBox={`0 0 1200/${size} 48`}>
                    <rect width={1200/size} height="48" fill={`url(#${x})`} />
                </svg>)}
            </div>
            <div className="partyCountLabels">
                {Object.entries(partyCounts).map(x => 
                <div className="partyCounterLabel" style={{width: (100*x[1]/size) + "%"}}>{x[0] === "blank" ? "" : x[1]}</div>)}
            </div>
        </div>
    )
}

export default PartyCount;