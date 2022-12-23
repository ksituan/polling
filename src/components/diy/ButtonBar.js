import * as React from "react"

function ButtonBar({elections, blank, colours, setColours, palette, setPalette}) {

    const newestYear = Math.max(...Object.keys(elections).map(Number));

    const addParty = () => {
        if (Object.keys(palette).includes("extra")) {
            let newColours = {...colours};
            for (let x in newColours) {
                if (newColours[x].includes("extra")) {
                    newColours[x] = "blank0";
                }
            }
            setColours(newColours);
            let newPalette = {...palette};
            delete newPalette.extra;
            setPalette(newPalette);
        } else {
            let newPalette = {...palette, ...{extra : {name: "New Party", colour: "gray", pattern: "solid"}}};
            setPalette(newPalette);
        }
    }
    
    return(
        <div className="buttonBar">
            {Object.keys(elections).map(x => 
                <button className="diyButton" onClick={() => {setColours(elections[x]["election"]); setPalette(elections[x]["palette"])}}>
                    {`${x} election`}
                </button>)}
            <button className="diyButton" onClick={addParty}>
                Extra party
            </button>
            <button className="diyButton" onClick={() => {setColours(blank); setPalette(elections[newestYear]["palette"])}}>
                Reset map
            </button>
        </div>
    )
}

export default ButtonBar;