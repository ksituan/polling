import * as React from "react"
import brandColours from "../../../content/brandColours"

function PaletteColour({colour, pattern, thickness, id, paint, setPaint}) {

    const handlePalettePick = () => {
        if (id === paint) {
            setPaint("blank0");
        } else {
            setPaint(id);
        }
    }

    const patternAngle = {left: 45, right: -45, vert: 90, hor: 0};

    return(
        <svg className={id === paint ? "paletteColour selected" : "paletteColour"} viewBox="0 0 32 32" onClick={handlePalettePick}>
            {pattern === "spots" &&
            <pattern id={id} viewBox="0 0 31.17691 18" width={31.17691/3} height={18/3} patternUnits="userSpaceOnUse">
                <circle cx="0" cy="0" r={thickness} fill={brandColours[colour]} />
                <circle cx="0" cy="18" r={thickness} fill={brandColours[colour]} />
                <circle cx="31.17691" cy="0" r={thickness} fill={brandColours[colour]} />
                <circle cx="31.17691" cy="18" r={thickness} fill={brandColours[colour]} />
                <circle cx="15.58846" cy="9" r={thickness} fill={brandColours[colour]} />
            </pattern>}
            {pattern === "solid" &&
            <pattern id={id} viewBox="0 0 10 10" width="5" height="5" patternUnits="userSpaceOnUse">
                <rect height="12" width="12" x="-1" y="-1" fill={brandColours[colour] + (thickness * 32 - 33).toString(16)} />
            </pattern>}
            {["left", "right", "hor", "vert"].includes(pattern) &&
            <pattern id={id} viewBox="0 0 10 10" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform={`rotate(${patternAngle[pattern]})`}>
                <path d="M -1,5 H 12" stroke={brandColours[colour]} strokeWidth={`${thickness}px`} />
            </pattern>}

            <rect width="32" height="32" fill="white" />
            <rect width="32" height="32" fill={`url(#${id})`} />
        </svg>
    );
}

export default PaletteColour