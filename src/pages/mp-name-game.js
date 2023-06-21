import * as React from "react"
import { Link } from "gatsby"
import { useState, useEffect } from "react";
import Layout from "../components/layout"
import Seo from "../components/seo"

import initialMembers from "../../content/members.json";
import cartogram from "../../content/cartogram.json";

const houseSize = initialMembers.filter(x => x.surname).length;

const startingState = initialMembers.sort((a,b) => a.riding - b.riding);

const provinces = {BC: "British Columbia",
                        AB: "Alberta",
                        SK: "Saskatchewan",
                        MB: "Manitoba",
                        ON: "Ontario",
                        QC: "Quebec",
                        NB: "New Brunswick",
                        PE: "Prince Edward Island",
                        NS: "Nova Scotia",
                        NL: "Newfoundland and Labrador",
                        YT: "Yukon",
                        NT: "Northwest Territories",
                        NU: "Nunavut"
                }

const progress = {
    0:"type a surname to get started",
    1:"that's more than the People's Party caucus",
    2:"that's as many MPs as the Conservative caucus in 1993",
    3:"that's more than the Green Party caucus",
    4:"that's as many MPs as Prince Edward Island",
    5:"that's as many MPs as Hamilton or Quebec City",
    6:"that's as many MPs as Mississauga",
    7:"that's as many MPs as Newfoundland and Labrador",
    8:"that's more than there are openly queer MPs",
    9:"that's more than there are Black MPs",
    10:"that's as many MPs as New Brunswick",
    11:"that's as many MPs as Nova Scotia",
    12:"that's enough for official party status",
    13:"that's more than there are Indigenous MPs",
    15:"that's more MPs than Saskatchewan",
    17:"that's more than there are Punjabi MPs",
    19:"that's more MPs than the Island of Montreal",
    25:"that's as many MPs as Toronto",
    26:"that's more than the NDP caucus",
    32:"that's as many MPs as Atlantic Canada",
    33:"that's more than the Bloc caucus",
    34:"that's as many MPs as Alberta",
    35:"that's more than the Liberal caucus in 2011",
    43:"that's more MPs than British Columbia",
    44:"that's more than the NDP caucus in 1988",
    53:"that's more than the Reform caucus in 1993",
    63:"that's more MPs than the Prairie Provinces",
    79:"that's more MPs than Quebec",
    104:"that's more than there are female MPs",
    120:"that's more than the Conservative caucus",
    122:"that's more MPs than Ontario",
    156:"that's more than Trudeau Sr.'s 1968 majority",
    161:"that's more than the Liberal caucus",
    166:"that's more than Harper's 2011 majority",
    170:"that's a majority government",
    209:"that's more than Diefenbaker's 1958 landslide",
    212:"that's more than Mulroney's 1984 landslide",
    232:"that's more MPs than Eastern Canada",
    236:"that's more than there are male MPs",
    300:"nearly there",
    338:"well done"
}

const regex = /[A-Z]/g;

function stringNormalize(unMot) {
    unMot = unMot.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    unMot = unMot.toUpperCase().match(regex).join('');
    return(unMot);
}

function caucusList(members) {
    let guessedMembers = members.filter(x => !x.g);
    let guessedArray = [];
    for (let province of Object.keys(provinces)) {
        let provinceMembers = guessedMembers.filter(x => x.province === province);
        if (provinceMembers.length > 0) {
            let provinceObject = {[province]: provinceMembers};
            guessedArray.push(provinceObject);
        }
    }
    return(guessedArray);
}

function Game() {

    let [members, setMembers] = useState(startingState);
    let [submission, setSubmission] = useState("");

    let caucus = caucusList(members);

    function Reset() {
        const handleReset = (event) => {
          event.preventDefault();
          setMembers(JSON.parse(JSON.stringify(startingState)));
        }
        return (
          <button id="resetbutton" onClick={handleReset}>
            Reset
          </button>
      )
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // This is a bullshit way to reset the DOM that I don't understand
        document.getElementById("guessbox").style.animation = 'none';
        void document.getElementById("guessbox").offsetWidth;
        document.getElementById("guessbox").style.animation = null;

        let guess = Object.values(members).filter(o => o.surname && o.surname.map(stringNormalize).includes(stringNormalize(submission.split(" ").pop())));

        if (guess.length > 0) {
            for (let match of guess) {
                if (match.g) {
                    match.g = false;
                    setMembers(members);
                }
            }
        } else {
            document.getElementById("guessbox").style.animation = "wrong 0.3s 1";
        }

        setSubmission("");
    }

    function Progress() {
        let n = members.filter(x => !x.g).length + houseSize - 338;
        let completions = Object.keys(progress);
        let closest = completions.reduce(function (i, j) { return j <= n ? Math.max(i, j) : i }, 0);
        return(
            members.filter(x => !x.g).length === 338 ? <p>You've named the entire House of Commons!</p> : <p>You've named {n} out of {houseSize} members - {progress[closest]}.</p>
        )
    }

    function Map() {
        return(
            <svg id="nameMap" viewBox="0 0 450 210">
                {members.map(member => 
                    <g>
                        <rect id={member.riding} className={member.g ? member.party : member.party + " correct"} x={10 * cartogram[member.riding].x} y={10 * cartogram[member.riding].y }/>
                        {!member.g && <text x={10 * cartogram[member.riding].x + 5} y={10 * cartogram[member.riding].y + 7.4}>{member.surname ? member.given[0] + member.surname[0][0] : "--"}</text>}
                    </g>)}
                <path className="cityBorder" d="M 20 70 v 10 h 10 v 20" />
                <path className="cityBorder" d="M 90 50 h 20 v 30 h -10 v 10 h -20 v -30 h 10 z" />
                <path className="cityBorder" d="M 160 170 v -40 h 70 v 10 h 10 v 10" />
                <path className="cityBorder" d="M 290 110 v -20 h 10 v -30 h 10 v -10 h 20 v 50 h -10 v 10 z" />
                <path className="cityBorder" d="M 240 100 v 30 h 20 v -10 h 10 v -20" />
                <path className="provBorder" d="M 60 20 v 50 h 10 v 10 h 10 v 20 h -50 v 10 h -20 v -40 h 10 v -10 h -10 v -20 h 10 v -10 h 20 v -10 z" />
                <path className="provBorder" d="M 60 20 h 40 v 10 h 10 v 70 h -30 v -20 h -10 v -10 h -10 z" />
                <path className="provBorder" d="M 110 110 v -50 h 20 v 10 h 10 v 40 z" />
                <path className="provBorder" d="M 140 110 v -40 h 10 v -10 h 20 v 50 z" />
                <path className="provBorder" d="M 170 80 h 20 v 10 h 10 v 10 h 80 v 40 h -10 v 10 h -50 v 10 h -20 v 10 h -40 v 10 h 20 v 20 h -80 v -10 h -20 v -30 h 30 v -10 h 20 v -20 h 10 v -10 h 10 v -10 h 20 z" />
                <path className="provBorder" d="M 260 100 v -30 h 10 v -20 h 20 v -10 h 40 v -10 h 40 v 10 h 20 v 20 h -20 v 20 h -10 v 10 h -10 v 10 h -10 v 20 h -60 v -20 z" />
                <path className="provBorder" d="M 370 60 h 30 v 10 h 10 v 10 h -10 v 10 h -30 z" />
                <path className="provBorder" d="M 400 50 h 20 v 20 h -20 z" />
                <path className="provBorder" d="M 420 50 h 20 v 20 h -10 v 20 h -10 v 10 h -20 v -20 h 10 v -10 h 10 z" />
                <path className="provBorder" d="M 400 10 h 10 v 10 h 10 v 10 h 10 v 10 h -30 z" />
                <path className="provBorder" d="M 370 20 h 10 v 10 h -10 z" />
                <path className="provBorder" d="M 50 10 h 10 v 10 h -10 z" />
                <path className="provBorder" d="M 60 10 h 10 v 10 h -10 z" />
                <path className="provBorder" d="M 70 10 h 10 v 10 h -10 z" />
                <g className="pollingCanada" stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round" stroke="black" transform="scale(1) translate(312 -12)">
        <path
           fill="#c94141"
           d="m 123.94611,189.49703 -5.45888,3.15168 v 6.30338 l 5.45888,3.15168 5.44675,-3.14468 -5.44675,-3.15868 z" />
        <path
           d="m 118.48722,186.34534 v 6.30337 l -5.45889,3.15169 -5.45888,-3.15168 v -6.28938 l 5.45888,3.13769 z"
           fill="#85ab53" />
        <path
           d="m 102.11058,189.49702 5.45888,3.15168 v 6.30338 l -5.45888,3.15168 -5.446759,-3.14467 5.446759,-3.15869 z"
           fill="#e69f4a" />
        <path
           d="m 123.94611,214.71052 -5.45888,-3.15168 v -6.30338 l 5.45888,-3.15168 5.44675,3.14468 -5.44675,3.15868 z"
           fill="#598dab" />         
        <path
           d="m 102.11058,214.71053 5.45888,-3.15168 v -6.30339 l -5.45888,-3.15168 -5.446759,3.14468 5.446759,3.15869 z"
           fill="#88c9c3" />
        <path
           d="m 107.56946,198.95208 v 6.30338 l 5.43463,3.16569 5.48313,-3.16569 v -6.30338 l -5.48313,-3.16569 z"
           fill="#bea79f" />
        <path
           d="m 107.56946,198.95209 5.45888,3.15168 5.45888,-3.15168 -5.45888,-3.15168 z"
           fill="#ddcdc8" />
        <path
           d="m 113.04044,202.10377 -0.0242,6.31738"
           fill="none" />
        <path
           d="m 111.93427,198.95208 h 2.18813"
           fill="none" />
        <path
           d="m 113.01624,208.42115 -0.0121,6.30336"
           fill="#85ab53"/>
      </g>
            </svg>
        )
    }

    return(
        <div>
        <form id="guessform" onSubmit={handleSubmit}>
            <label>
            <input
                id="guessbox"
                type="text"
                value={submission}
                placeholder="Guess a surname"
                onChange={(e) => setSubmission(e.target.value)}
            />
            </label>
        </form>
        <Progress />
        <Map />
        <h2>Your Caucus</h2>
        <div className="memberBox">
            {caucus.map(prov =>
            <div>
                <h3>{provinces[Object.keys(prov)[0]]}</h3>
                {Object.values(prov)[0].map(x =>
                <div className={"member " + x.party}>
                    {x.surname ? <p><span className="surname">{x.surname[0]}</span>, <span className="given">{x.given}</span></p> : <p>Vacant</p>}
                    <p className="riding">({x.riding})</p>
                </div>
                    )}
            </div>
                )}
        </div>
        </div>
    )
}

export default function Index() {
    return(
        <Layout>
            <Seo title="MP Name Game" description="How much of Parliament can you name?" />
            <h1>MP Name Game</h1>
            <Game/>
        </Layout>
    )
}