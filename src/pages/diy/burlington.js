import * as React from "react"
import { useState } from "react";

import Layout from "../../components/layout"
import Seo from "../../components/seo"

import PartyCount from "../../components/diy/PartyCount"
import Palette from "../../components/diy/Palette"
import Hover from "../../components/diy/Hover"


let ridingNames = {1: "Burlington"};

let sortOrder = ["green", "orange", "red", "blank", "blue"];

const paletteInfo = [
    {name: "Green", colour: "green", angle: "0"}
]

function Diy({size}) {

    let codes = [...Array(size).keys()].map(x => x + 1);
    let blank = {}
    codes.forEach(x => blank[x] = "blank0");

    const [colours, setColours] = useState(blank);
    const [paint, setPaint] = useState("blank0");
    const [palette, setPalette] = useState(paletteInfo);
    const [caption, setCaption] = useState("");

    const handlePaintClick = (e) => {
        if (paint === colours[e.target.id]) {
            setColours({...colours, [e.target.id]: "blank0"});
        } else {
            setColours({...colours, [e.target.id]: paint});
        } 
    }

    const handleHover = (e) => {
        setCaption(ridingNames[e.target.id])
    }

    const setBlank = () => {
        setColours(blank);
    }

    return(
        <div className="diy">
            <Palette paint={paint} setPaint={setPaint} palette={palette} />
            <Map colours={colours} handlePaintClick={handlePaintClick} handleHover={handleHover} />
            <PartyCount sortOrder={sortOrder} colours={colours} size={size} />
            <div className="buttonBar">
                <Button electionFunction={setBlank} label={"Reset map"} />
            </div>
            <svg viewBox="0 0 0 0" height="0" width="0">
                <pattern id="blank0" viewBox="0 0 10 10" width="5" height="5" patternUnits="userSpaceOnUse">
                    <rect width="10" height="10" fill="#808080" />
                </pattern>
            </svg>
            <Hover caption={caption} />
        </div>
    );
}

function Button({electionFunction, label}) {
    return(
        <button className="diyButton" onClick={electionFunction}>{label}</button>
    )
}

function Map({colours, handlePaintClick, handleHover}) {

    return(
        <svg className="diyMap" viewBox="0 0 1600 1000">

            <rect width="1600" height="1000" fill="white" onMouseEnter={handleHover} />

            <text x="800" y="120">Burlington</text>
            <g id="Burlington" transform="translate(400 50)">
               <path fill={`url(#${colours[1]})`} onClick={handlePaintClick} onMouseEnter={handleHover} id="1" d="M 505.12 196.73 567.14 258.86 626.58 317.9 690.04 381.24 753.03 444.88 799 491.62 797.3 492.94 793.92 499.76 791.48 502.92 789.74 510.05 788.07 512.3 781.52 515.11 775.72 516.03 771.68 519.72 768.01 521.34 764.74 526.47 759.92 529.05 750.99 537.05 746.47 542.03 739.21 548.28 736.22 554.17 730.18 557.37 721.97 565.28 719.39 569.54 718.01 574.57 715.96 577.15 713.36 577.03 707.82 582.84 703.75 583.24 698.17 586.28 694.58 590.56 688.87 599.74 680.99 610.86 675.7 616.76 672.63 617.43 671.36 621.58 668.56 623.68 665.91 629.71 663.23 638.09 659.51 642.71 653.13 646.15 649.66 645.63 645.47 648.31 638.6 662.27 630.25 668.54 623.63 671.22 618 677.41 612.61 679.48 602.05 687.57 598.81 688.62 589.64 696.44 582.69 698.78 579.3 701.59 575.46 703.31 570.32 708.03 559.1 715.36 557.72 715.17 543.37 733.98 541.28 733.87 541.59 738.12 540.23 742.9 541.21 768.12 543.11 778.92 545.72 789.19 545.93 792.39 551.32 808.24 552.87 814.2 554.82 818.48 558.1 823.11 561.92 822.87 564.2 824.12 551.63 833.24 547.26 834.02 536.68 841.35 529.99 828.55 529.52 823.41 538.28 818.78 541.78 815.26 541.1 810.87 537.04 801.64 533.81 798.9 532.67 793.54 528.14 788.26 527.64 782.24 526.45 777.63 519.84 769.97 513.27 767.01 500.27 764.72 490.32 769.29 486.11 770.03 482.85 772.67 477.71 774.62 474.35 774.91 468.99 777.53 467.59 779.27 456.62 784.08 456.44 785.09 450.38 790.1 446.08 789.28 446.27 793.11 444.12 794.47 437.22 793.32 434.07 793.66 425.61 799.64 422.21 800.18 415.95 804.13 412.43 803.87 408.92 809.5 394.08 815.94 388.33 822.55 391.52 825.58 387.48 827.13 384.62 824.69 357.15 842.02 347 851.51 344.73 855.44 330.66 867.19 328.18 868.21 323.97 872.53 319.26 879.78 316.12 883.36 313.09 884.07 311.3 889.47 309.1 891 306 888.35 299.25 885.48 291.09 888.19 287.77 890.68 280.42 883.52 268.15 883.76 258.2 882.25 250.3 884.22 248.86 882.55 249.57 879.2 248.11 875.58 254.3 875.79 258.08 878.62 264.67 877.65 266.63 874.74 265.35 870.26 259.67 866.44 260.98 871.76 258.54 872.44 255.63 870.51 251.14 871.46 249.44 866.47 247.82 865.73 245.4 872.7 229.37 856.83 159.94 787.24 201.31 745.97 227.87 718.51 256.26 689.9 261.38 694.81 265.25 693.84 266.34 695.37 273.56 692.68 283.6 690.01 291.61 684.01 298.27 675.92 299.79 672.1 309.55 661.49 311.46 656.36 317.19 652.93 323.86 644.69 326.81 640.26 334.32 631.87 337.19 621.36 338.63 613.29 338.39 607.44 276.48 546.18 230.14 500.79 216.49 487.29 179.33 450.88 158.72 430.5 130.81 403.93 112.31 385.97 92.92 367.71 70.84 346.64 39.99 316.32 1 278.56 18.92 256.33 19.2 256.64 37.19 234.64 55.7 211.36 54.55 210.05 131.63 114.62 130.6 113.56 167.16 68.21 166.29 67.39 202.13 22.61 202.72 23.23 220.45 1 314.25 91.45 315.06 92.15 408.84 180.5 412.11 176.36 434.96 198.98 470.05 234.18 473.21 237.47 505.12 196.73 Z"/>
            </g>

        </svg>
    );
}

const burlington = () => (
  <Layout>
    <Seo title="DIY: Burlington" description="Colour a map of Burlington" />
    <h1>PC DIY: Burlington</h1>
    <Diy size={1} />
  </Layout>
)

export default burlington