import * as React from "react"

export default function BarChart({poll, id, lastElection, parties, title, brandColours}) {
  
    let minBar = Math.min(...poll.poll.map(party => party.score)); // Shrink the chart if the last bar is tall

    let chartWidth = 1600;
    let chartHeight = 900;
    let barPadding = 20;
    let bottom = 250;
    let right = poll.poll.length <= 3 ? 600 : (poll.poll.length <= 4 || minBar >= 8) ? 400 : 200;

    let barWidth = (chartWidth - right) / poll.poll.length;

    // Find the most recent party

    let bj = poll.jurisdiction.split("_")[0];
    let pinfo = parties.content[bj];

    let maxBar = Math.max(...poll.poll.map(party => party.score));
    let maxHist = Math.max(...lastElection.results.map(party => party.score));
    let barScale = (chartHeight - bottom - barPadding * 2) / Math.max(maxBar, maxHist);

    function labely(historical, current, scale) {
  
        let y = 0;
      
        if (historical * scale > 160 && current * scale > 160) {
          y = 790;
        } else if (historical*scale - current*scale > 160) {
          y = 790 - current * scale;
        } else if (current*scale - historical*scale > 160) {
          y = 790 - historical * scale;
        } else {
          y = 790 - Math.max(historical, current) * scale;
        }
      
        return(y);
      }
      
      function change(n) {
      
        n = Math.round(n)
      
        let text = "-";
      
        if (n > 0) {
          text = "+" + String(n);
        }
      
        if (n < 0) {
          text = String(n);
        }
      
        return(text);
      }

    return (

      <svg id={id} className="poll" viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
        {poll.poll.map((party, i) => {
          let ac = party.party;
          let pp = Math.round(party.score);
          let hist = Math.round(lastElection.results.filter(party => party.party === ac)[0]?.score || -1);
          return(
          <g>
            <rect
              width={barWidth - barPadding * 2}
              height={barScale * pp}
              x = {i * barWidth + barPadding}
              y = {chartHeight-barScale*pp - barPadding - bottom}
              fill = {brandColours[pinfo[ac]?.colour || "gray"]} />
            
            {hist >= 0 && ac !== "Others" && <path
              className="benchmark"
              stroke="black"
              strokeWidth="10px"
              strokeLinecap="round"
              d={`M ${i * barWidth + barPadding} ${chartHeight - barScale * hist - barPadding - bottom} h ${barWidth - 2 * barPadding}`} />}

            {ac !== "Others" && <path d = {pinfo[ac].logo}
              fill = {brandColours[pinfo[ac].colour]}
              transform = {"translate(" + ((i + 0.5) * barWidth - 50) + " " + 680 + ")"} />}

            <text className="numeric" textAnchor="middle" fontWeight="bold" fontSize="48pt"
              x={(i + 0.5) * barWidth}
              y={890 - barPadding}>
                {ac}
            </text>
            
            <text className="numeric" textAnchor="middle" fontWeight="bold" fontSize="48pt"
              x={(i + 0.5) * barWidth}
              y={labely(hist, pp, barScale) - bottom + (ac === "Others" ? 60 : 0)}>
                {Math.round(pp)}%
            </text>
            
            {ac !== "Others" && <text className="numeric" textAnchor="middle" fontWeight="bold" fontSize="48pt"
              x={(i + 0.5) * barWidth}
              y={labely(hist, pp, barScale) + 60 - bottom}>
                ({hist >= 0 ? change(pp - Math.round(hist)) : "new"})
            </text>}
          </g>)
      })}

          <g className="pollingCanada" stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round" stroke="black" transform="scale(3) translate(397 42)">
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
    <text textAnchor="end" fontWeight="bold" fontSize="48pt" x={1600 - barPadding} y="50">Polling Canada</text>
        <text className="numeric" textAnchor="end" fontSize="40pt" x={1600 - barPadding} y="120">{title[poll.jurisdiction]}</text>
        <text className="numeric" textAnchor="end" fontSize="32pt" x={1600 - barPadding} y="190">{poll.company}</text>
        <text className="numeric" textAnchor="end" fontSize="32pt" x={1600 - barPadding} y="240">{poll.date}</text>
        {poll.n && <text className="numeric" textAnchor="end" fontSize="32pt" x={1600 - barPadding} y="310">Sample size = {poll.n.toLocaleString("en-US")}</text>}
        <text className="numeric" textAnchor="end" fontSize="32pt" x={1600 - barPadding} y="360">{poll.method}</text>
        {poll.moe && <text className="numeric" textAnchor="end" fontSize="32pt" x={1600 - barPadding} y="410">±{poll.moe}%</text>}
        {!poll.moe && poll.note && <text className="numeric" textAnchor="end" fontSize="32pt" x={1600 - barPadding} y="410">{poll.note}</text>}
      </svg>

    );
}