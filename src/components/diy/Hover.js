import * as React from "react";
import { useState, useEffect } from "react";

function Hover({caption}) {
    const [x, setX] = useState()
    const [y, setY] = useState()

    useEffect(
        () => {
          const update = (e) => {
            setX(e.x)
            setY(e.y + (document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop))
          }
          window.addEventListener('mousemove', update)
          window.addEventListener('touchmove', update)
          return () => {
            window.removeEventListener('mousemove', update)
            window.removeEventListener('touchmove', update)
          }
        },
        [setX, setY]
      );  

    return(
        <div className="hoverTip" style={{"position": "absolute", "left" : x, "top" : y, "display": caption ? "inline" : "none"}}>
            <div className="hoverText">
                {caption}
            </div>
        </div>
    )
}

export default Hover