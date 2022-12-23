import * as React from "react"
import { useState } from "react";

import Layout from "../../components/layout"
import Seo from "../../components/seo"

import PartyCount from "../../components/diy/PartyCount"
import Palette from "../../components/diy/Palette"
import Hover from "../../components/diy/Hover"
import ButtonBar from "../../components/diy/ButtonBar"
import MapSK from "../../components/diy/maps/MapSK"

let elections = {
    2020: 
        {election:
            {1: "ndp2", 2: "skp3", 3: "skp4", 4: "skp3", 5: "skp4", 6: "ndp3", 7: "skp4", 8: "skp4", 9: "skp4", 10: "skp3",
            11: "skp4", 12: "skp4", 13: "skp4", 14: "skp3", 15: "skp4", 16: "skp4", 17: "skp3", 18: "skp3", 19: "skp4", 20: "skp4",
            21: "skp3", 22: "skp2", 23: "skp4", 24: "skp2", 25: "skp1", 26: "skp1", 27: "ndp3", 28: "ndp3", 29: "ndp3", 30: "ndp1",
            31: "skp1", 32: "skp1", 33: "skp2", 34: "ndp1", 35: "skp2", 36: "skp2", 37: "skp2", 38: "skp4", 39: "skp4", 40: "skp3",
            41: "ndp2", 42: "skp2", 43: "skp1", 44: "skp1", 45: "ndp2", 46: "ndp1", 47: "ndp3", 48: "skp1", 49: "skp2", 50: "skp3",
            51: "skp2", 52: "ndp1", 53: "skp2", 54: "skp3", 55: "skp4", 56: "skp3", 57: "skp4", 58: "skp4", 59: "skp3", 60: "skp4",
            61: "skp4"},
        palette: {
            "ndp" : {name: "New Democrats", colour: "orange", pattern: "left"},
            "skp" : {name: "Saskatchewan Party", colour: "darkGreen", pattern: "right"},
            "bps" : {name: "Buffalo Party", colour: "yellow", pattern: "vert"},
            "slp" : {name: "Liberal Party", colour: "red", pattern: "hor"},
        }},
    2016: 
        {election: // ratings 0-10, 10-20, 20-50, 50+
            {1: "ndp3", 2: "skp3", 3: "skp4", 4: "skp3", 5: "skp4", 6: "ndp3", 7: "skp4", 8: "skp4", 9: "skp4", 10: "skp4",
            11: "skp4", 12: "skp4", 13: "skp4", 14: "skp3", 15: "skp4", 16: "skp4", 17: "skp4", 18: "skp3", 19: "skp4", 20: "skp4",
            21: "skp3", 22: "skp2", 23: "skp4", 24: "skp2", 25: "ndp1", 26: "skp1", 27: "ndp2", 28: "ndp3", 29: "ndp2", 30: "ndp1",
            31: "skp2", 32: "skp2", 33: "skp3", 34: "skp1", 35: "skp3", 36: "skp1", 37: "skp3", 38: "skp4", 39: "skp4", 40: "skp3",
            41: "ndp2", 42: "skp3", 43: "skp1", 44: "skp2", 45: "skp1", 46: "skp1", 47: "ndp3", 48: "ndp1", 49: "skp3", 50: "skp3",
            51: "skp3", 52: "skp2", 53: "skp1", 54: "skp4", 55: "skp4", 56: "skp3", 57: "skp4", 58: "skp4", 59: "skp3", 60: "skp4",
            61: "skp4"},
        palette: {
            "ndp" : {name: "New Democrats", colour: "orange", pattern: "left"},
            "skp" : {name: "Saskatchewan Party", colour: "darkGreen", pattern: "right"},
            "slp" : {name: "Liberal Party", colour: "red", pattern: "hor"},
            "sgp" : {name: "Green Party", colour: "green", pattern: "vert"},
        }}
};

let ridingNames = {1: "Athabasca", 2: "Batoche", 3: "Cannington", 4: "Canora-Pelly", 5: "Carrot River Valley", 6: "Cumberland", 7: "Cut Knife-Turtleford", 8: "Cypress Hills", 9: "Dakota-Arm River", 10: "Estevan-Big Muddy",
11: "Humboldt-Watrous", 12: "Kelvington-Wadena", 13: "Kindersley-Biggar", 14: "Last Mountain-Touchwood", 15: "Lloydminster", 16: "Lumsden-Morse", 17: "Martensville-Blairmore", 18: "Meadow Lake", 19: "Melfort", 20: "Melville-Saltcoats",
21: "Moose Jaw North", 22: "Moose Jaw Wakamow", 23: "Moosomin-Montmartre", 24: "Prince Albert Carlton", 25: "Prince Albert Northcote", 26: "Regina Coronation Park", 27: "Regina Douglas Park", 28: "Regina Elphinstone-Centre", 29: "Regina Lakeview", 30: "Regina Mount Royal",
31: "Regina Northeast", 32: "Regina Pasqua", 33: "Regina Rochdale", 34: "Regina South Albert", 35: "Regina University", 36: "Regina Walsh Acres", 37: "Regina Wascana Plains", 38: "Rosetown-Delisle", 39: "Rosthern-Shellbrook", 40: "Saskatchewan Rivers",
41: "Saskatoon Centre", 42: "Saskatoon Chief Mistawasis", 43: "Saskatoon Churchill-Wildwood", 44: "Saskatoon Eastview", 45: "Saskatoon Fairview", 46: "Saskatoon Meewasin", 47: "Saskatoon Nutana", 48: "Saskatoon Riversdale", 49: "Saskatoon Silverspring", 50: "Saskatoon Southeast",
51: "Saskatoon Stonebridge", 52: "Saskatoon University-Sutherland", 53: "Saskatoon Westview", 54: "Saskatoon Willowgrove", 55: "Swift Current", 56: "The Battlefords", 57: "Warman", 58: "Weyburn-Bengough", 59: "White City-Qu'appelle", 60: "Wood River",
61: "Yorkton"};

let sortOrder = ["sgp", "ndp", "extra", "blank", "slp", "skp", "pcs", "bps"];

function Diy({size, elections, ridingNames, sortOrder}) {

    // Get riding codes from ridingNames (whether they're sequential or not)

    let codes = Object.keys(ridingNames);
    let blank = {}
    codes.forEach(x => blank[x] = 'blank0');

    // Find the newest election and set its information as default

    const newestYear = Math.max(...Object.keys(elections).map(Number));
    const newestPalette = {...elections[newestYear].palette};

    // Initialize state

    const [colours, setColours] = useState(blank);
    const [paint, setPaint] = useState("blank0");
    const [caption, setCaption] = useState("");
    const [palette, setPalette] = useState(newestPalette);

    // Set up handler functions

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

    const deleteParty = (id) => {
        let newPalette = {...palette};
        delete newPalette[id];
        setPalette(newPalette);
        let newColours = {...colours};
        for (let x in newColours) {
            if (newColours[x].includes(id)) {
                newColours[x] = "blank0";
            }
        }
        setColours(newColours);
    }

    return(
        <div className="diy">
            <Palette paint={paint} setPaint={setPaint} palette={palette} setPalette={setPalette} deleteParty={deleteParty} />
            <MapSK colours={colours} handlePaintClick={handlePaintClick} handleHover={handleHover} />
            <PartyCount sortOrder={sortOrder} colours={colours} size={size} />
            <ButtonBar elections={elections} blank={blank} colours={colours} setColours={setColours} palette={palette} setPalette={setPalette} />
            <svg viewBox="0 0 0 0" height="0" width="0">
                <pattern id="blank0" viewBox="0 0 10 10" width="5" height="5" patternUnits="userSpaceOnUse">
                    <rect width="10" height="10" fill="#808080" />
                </pattern>
            </svg>
            <Hover caption={caption} />
        </div>
    );
}

const sk = () => (
  <Layout>
    <Seo title="DIY: Saskatchewan" description="Colour a map of the Saskatchewan provincial legislature" />
    <h1>PC DIY: Saskatchewan</h1>
    <Diy size={61} elections={elections} ridingNames={ridingNames} sortOrder={sortOrder} />
  </Layout>
)

export default sk