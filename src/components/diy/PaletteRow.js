import * as React from "react"
import PaletteColour from "./PaletteColour"
import { useState } from "react";

function PaletteRow({paint, setPaint, name, colour, angle}) {

    const [label, setLabel] = useState(name);

    return(
        <div className="paletteRow">
            <input className="paletteLabel" value={label} onChange={(e) => setLabel(e.target.value)} />
            <div className="paletteSwatch">
                <PaletteColour colour={colour} thickness={"3"} angle={angle} id={colour + "1"} paint={paint} setPaint={setPaint} />
                <PaletteColour colour={colour} thickness={"5"} angle={angle} id={colour + "2"} paint={paint} setPaint={setPaint} />
                <PaletteColour colour={colour} thickness={"7"} angle={angle} id={colour + "3"} paint={paint} setPaint={setPaint} />
                <PaletteColour colour={colour} thickness={"9"} angle={angle} id={colour + "4"} paint={paint} setPaint={setPaint} />
            </div>
        </div>
    );
}

export default PaletteRow