import * as React from "react"
import PaletteRow from "./PaletteRow"
import { useState } from "react";

function Palette({paint, setPaint, palette, setPalette, deleteParty, jurisdiction}) {

    const [edit, setEdit] = useState("");

    //palette = palette.filter(x => x["colour"])

    return(
        <div className="palette">
            {Object.entries(palette).map((party) =>
                <PaletteRow key={party[0]} id={party[0]} info={party[1]} paint={paint} setPaint={setPaint} edit={edit} setEdit={setEdit} palette={palette} setPalette={setPalette} deleteParty={deleteParty} jurisdiction={jurisdiction} />)}
        </div>
    )
}

export default Palette;