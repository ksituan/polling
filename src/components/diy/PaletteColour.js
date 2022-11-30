import * as React from "react"
import brandColours from "../../../content/brandColours"

function PaletteColour({colour, angle, thickness, id, paint, setPaint}) {

    const handlePalettePick = () => {
        if (id === paint) {
            setPaint("blank0");
        } else {
            setPaint(id);
        }
    }

    return(
        <svg className={id === paint ? "paletteColour selected" : "paletteColour"} viewBox="0 0 32 32" onClick={handlePalettePick}>
            <pattern id={id} viewBox="0 0 10 10" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform={`rotate(${angle})`}>
                <path d="M -1,5 H 12" stroke={brandColours[colour]} strokeWidth={`${thickness}px`} />
            </pattern>
            <rect width="32" height="32" fill="white" />
            <rect width="32" height="32" fill={`url(#${id})`} />
        </svg>
    );
}

export default PaletteColour