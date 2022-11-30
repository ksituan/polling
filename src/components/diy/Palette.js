import * as React from "react"
import PaletteRow from "./PaletteRow"
import { useState } from "react";

function Palette({palette, paint, setPaint}) {

    return(
        <div className="palette">
            {palette.map(info =>
                <PaletteRow paint={paint} setPaint={setPaint} name={info["name"]} colour={info["colour"]} angle={info["angle"]} />)}
        </div>
    )
}

export default Palette;