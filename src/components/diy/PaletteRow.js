import * as React from "react"
import PaletteColour from "./PaletteColour"
import { useState } from "react";
import brandColours from "../../../content/brandColours"

function PaletteRow({paint, setPaint, info, id, edit, setEdit, palette, setPalette, deleteParty}) {

    const name = info["name"]
    const colour = info["colour"]
    const pattern = info["pattern"]

    const makeEditable = () => {
        setEdit(id);
    }

    const makeUneditable = () => {
        setEdit("");
    }

    const setPartyColour = (e) => {
        let newPalette = {...palette};
        newPalette[id]["colour"] = e.target.id;
        setPalette(newPalette);
    }

    function setPartyPattern(pattern) {
        let newPalette = {...palette};
        newPalette[id]["pattern"] = pattern;
        setPalette(newPalette);
    }

    const setPartyName = (e) => {
        let newPalette = {...palette};
        newPalette[id]["name"] = e.target.value;
        setPalette(newPalette);
    }

    return(
        <div id={id} className={(edit === id) ? "paletteRow edit" : "paletteRow normal"}>
            <input id={id} className="paletteLabel" value={name} onClick={makeEditable} onChange={setPartyName} />
            <div className="paletteSwatch">
                <PaletteColour colour={colour} thickness={"3"} pattern={pattern} id={id + "1"} paint={paint} setPaint={setPaint} />
                <PaletteColour colour={colour} thickness={"5"} pattern={pattern} id={id + "2"} paint={paint} setPaint={setPaint} />
                <PaletteColour colour={colour} thickness={"7"} pattern={pattern} id={id + "3"} paint={paint} setPaint={setPaint} />
                <PaletteColour colour={colour} thickness={"9"} pattern={pattern} id={id + "4"} paint={paint} setPaint={setPaint} />
            </div>
            <div className="controlPanel">
                <div className="colourPicks">
                    {Object.entries(brandColours).map(colour =>
                        <div className={colour[0] === palette[id]["colour"] ? "selected" : ""}
                            key={colour[0]}
                            id={colour[0]}
                            onClick={setPartyColour}
                            style={{backgroundColor: colour[1]}}/>
                            )}
                </div>
                <div className="patternPicks">
                    <svg onClick={() => setPartyPattern("spots")} className={`pattern ${"spots" === palette[id]["pattern"] && "selected"}`} viewBox="0 0 10 10">
                        <rect width="10" height="10" />
                        <circle cx="5" cy="5" r="2.5" />
                    </svg>
                    <svg onClick={() => setPartyPattern("left")} className={`pattern ${"left" === palette[id]["pattern"] && "selected"}`} viewBox="0 0 10 10">
                        <rect width="10" height="10" />
                        <path d="M0 0 h2 l8 8 v2 h-2 l-8 -8 z" />
                    </svg>
                    <svg onClick={() => setPartyPattern("hor")} className={`pattern ${"hor" === palette[id]["pattern"] && "selected"}`} viewBox="0 0 10 10">
                        <rect width="10" height="10" />
                        <path d="M0 3.5 v3 h10 v-3 z" />
                    </svg>
                    <svg onClick={() => setPartyPattern("right")} className={`pattern ${"right" === palette[id]["pattern"] && "selected"}`} viewBox="0 0 10 10">
                        <rect width="10" height="10" />
                        <path d="M10 0 h-2 l-8 8 v2 h2 l8 -8 z" />
                    </svg>
                    <svg onClick={() => setPartyPattern("vert")} className={`pattern ${"vert" === palette[id]["pattern"] && "selected"}`} viewBox="0 0 10 10">
                        <rect width="10" height="10" />
                        <path d="M3.5 0 h3 v10 h-3 z" />
                    </svg>
                    <svg onClick={() => setPartyPattern("solid")} className={`pattern ${"solid" === palette[id]["pattern"] && "selected"}`} viewBox="0 0 10 10">
                        <rect width="10" height="10" />
                    </svg>
                </div>
                <div className="delete" onClick={() => deleteParty(id)}>Delete</div>
                <div className="close" onClick={makeUneditable}>X</div>
            </div>
        </div>
    );
}

export default PaletteRow