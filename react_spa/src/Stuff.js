import React, { useRef, useEffect } from "react";
import { select } from "d3"
import { RouterContext } from "react-router";

const data = [2, 20, 25, 40, 60];

function Stuff() {
  const svgRef = useRef();
  //console.log(svgRef);

  useEffect(() => {
    //console.log(svgRef);
    const svg = select(svgRef.current);
    svg
      .selectAll("circle")
      .data(data)
      .join(
        enter => enter.append("circle")
        .attr("r", value => value)
        .attr("cx", value => value * 2)
        .attr("cy", value => value * 2)
        .attr("stroke", "red"),
        update => update.attr("class"< "updated"),
        exit => exit.remove()
      );
  }, []);

  return(
    <React.Fragment>
      <svg ref={svgRef}>
        <circle />
      </svg>
    </React.Fragment>
  )
}

export default Stuff;
