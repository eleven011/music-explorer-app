import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { 
    select,
    mouse, 
    hierarchy, 
    forceSimulation, 
    forceCenter, 
    forceManyBody, 
    forceCollide,
    forceX,
    forceY,
    drag
} from "d3";
//import useResizeObserver from "./useResizeObserver";

function Force({ data }){

    // Reference object 
    const svgRef = useRef();
    const wrapper = useRef();
    //const dimensions = useResizeObserver(wrapperRef);

    let history = useHistory();
    const handleOnClick = (artist) => {
        history.push({
        pathname: '/results', 
        state: {detail: artist,
                number: 5}
    });
  }
    // useEffect hook
    useEffect(() => {
        //if(!dimensions) return;

        // temp work around for resize dimensions
        const height = 600;
        const width = 600;

        // ref svgRef to set the width + height
        const svg = select(svgRef.current);

        // trying to figure out how to get rid of this
        svg
            .attr("height", height)
            .attr("width", width)

        // utility function from d3 (hierarchy).
        // flattens tree. This contains data info +
        // depth of node (depth 0 is root, depth 1 is first child)
        // plus a variety of other functions 
        const root = hierarchy(data.data);

        // info from all the descendants 
        const nodeData = root.descendants();

        // info about different bands
        const linkData = root.links();

        // forceSimulation: creates new simulation with array of nodes
        // captured in 'nodeData'. Starts simulation immediately 
        // see more: https://github.com/d3/d3-force

        const simulation = forceSimulation(nodeData)
            .force("center", forceCenter(height / 2, width / 2))
            .force("charge", forceManyBody().strength(-45))
            .force("collide", forceCollide(30))
            .alphaDecay(0.02)
            .alphaMin(0.0001)

            // on "tick" callback function is triggered every time
            // force decays

            .on("tick", () => {
                // inside "tick", render nodes/links/circles

                // set up the links
                svg
                    .selectAll(".link")
                    .data(linkData)
                    .join("line")
                    .attr("class", "link")
                    .attr("stroke", "black")
                    .attr("fill", "none")
                    .attr("x1", link => link.source.x)
                    .attr("y1", link => link.source.y)
                    .attr("x2", link => link.target.x)
                    .attr("y2", link => link.target.y);
            
                // render the nodes
                svg
                    .selectAll(".node")
                    .data(nodeData)
                    .join("circle")
                    .attr("class", "node")
                    .attr("fill", "white")
                    .attr("r", 15)
                    .attr("cx", node => node.x)
                    .attr("cy", node => node.y)
                    .on("mouseover", function(d){
                        //console.log(d.data.name);
                        //call spotify function
                    })
                    .on("click", function(d){
                        //console.log(d);
                        handleOnClick(d.data.name);
                        //call function passing in d
                        //a wrapper for getRecommendation
                        // spotifyKickoff(d.data.name);
                    })
                    //.on("dblclick", dblclick)
                    .call(drag()
                        .on('start', dragStart)
                        .on('drag', dragging)
                        .on('end', dragEnd)
                      )
                  
                    function dragStart(d,i,nodes){
                        select(nodes[i])
                          .style("stroke", "red")  
                      }
                      
                    function dragging(d,i,nodes){
                        let [xCoor, yCoor] = mouse(svgRef.current)
                        console.log(select(nodes[i]))
                        select(nodes[i])
                          .attr("cx", xCoor)
                          .attr("cy", yCoor)
                      }
                      
                      function dragEnd(d,i,nodes){
                         select(nodes[i])
                          .style("stroke", "black")
                      }
                
                
                // set up the band labels
                svg
                    .selectAll(".label")
                    .data(nodeData)
                    .join("text")
                    .attr("class", "label")
                    .attr("text-anchor", "end")
                    .attr("font-size", 10)
                    .text(node => node.data.name)
                    .attr("x", node => node.x)
                    .attr("y", node => node.y)
                    // .on("click", function(d){
                    //     console.log(d.data.name);
                    // })
                });

                svg.on("mousemove", () => {
                    const [x, y] = mouse(svgRef.current);
                    simulation
                        .force("x", forceX(x).strength(node => 0.15 + node.depth * 0.1))
                        .force("y", forceY(y).strength(node => 0.15 + node.depth * 0.1))
                        .restart(1);

                });

                /* THIS IS THE UPDATED BUT CURRENTLY NOT WORKING BUILD

                function click() {
                    svg.select("circle").transition()
                    //svg.selectAll("circle").transition()
                        .duration(750)
                        .attr("r", 100)
                        .style("fill", "lightsteelblue");
                    svg.select("text").transition()
                        .duration(750)
                        .attr("font-size", 16)
                }

                function dblclick() {
                    svg.select("circle").transition()
                        .duration(750)
                        .attr("r", 12)
                        .style("fill", "white");
                    svg.select("text").transition()
                        .duration(750)
                        .attr("font-size", 12)
                }
                */

                /*
                // forceSimulation: creates new simulation with array of nodes
                // captured in 'nodeData'. Starts simulation immediately 
                // see more: https://github.com/d3/d3-force

                const simulation = forceSimulation(nodeData)
                .force("center", forceCenter(height / 2, width / 2))
                .nodes(nodeData)
                .force("charge", forceManyBody().strength(-1000))
                .force("collide", forceCollide(30))
                .force("link", forceLink(linkData).distance(120))
                .force("x", forceX(width / 2).strength(0.2))
                .force("y", forceY(height / 2).strength(0.2))

                const link = svg.selectAll(".link")
                    .data(linkData)
                    .join("line")
                    .attr("class", "link")
                    .attr("stroke", "black")
                    .attr("fill", "none")
                    .attr("viewBox", "0 -5 10 10")
                    .attr("orient", "auto")
                    .attr("x1", link => link.source.x)
                    .attr("y1", link => link.source.y)
                    .attr("x2", link => link.target.x)
                    .attr("y2", link => link.target.y)
                    //
                
                const node = svg.selectAll(".node")
                    .data(nodeData)
                    .join("svg:g")
                    .classed("node", true)
                    .classed("fixed", d => d.fx !== undefined)
                    //.attr("class", "node")
                    .on("click", function(d){
                        handleOnClick(d.data.name)
                    })
                    .on("mouseover", function(d){
                        select(this).select("circle").transition()
                            .attr("r", 40)
                            .duration(750)
                    })
                    .on("mouseout", function(d){
                        select(this).select("circle").transition()
                        .attr("r", 15)
                        .duration(750)
                    })

                    //
                const circles = node.append("circle")
                //node.append("circle")
                    .attr("fill", "white")
                    .attr("r", 18)
                    //.attr("cx", node => node.x)
                    //.attr("cy", node => node.y)
                    .attr("cx", 10)
                    .attr("cy", 10)
                    .attr("x", -(15/7))
                    .attr("y", -(15/7))
                    .style("stroke", "black")

                const texts = node.append("text")
                    .data(nodeData)
                    .attr("class", "label")
                    //.attr("text-anchor", "end")
                    .attr("x", 15)
                    .text(node => node.data.name)
                    .attr("x", node => node.x)
                    .attr("y", node => node.y);

                
                //texts.exit().remove();
                //circles.exit().remove();
                //node.exit().remove();


                    // svg
                        //     .selectAll(".label")
                        //     .data(nodeData)
                        //     .join("text")
                        //     .attr("class", "label")
                        //     .attr("text-anchor", "end")
                        //     .attr("font-size", 10)
                        //     .text(node => node.data.name)
                        //     .attr("x", node => node.x)
                        //     .attr("y", node => node.y)
                        //

                simulation.on("tick", function() {
                    link.attr("x1", link => link.source.x)
                        .attr("y1", link => link.source.y)
                        .attr("x2", link => link.target.x)
                        .attr("y2", link => link.target.y)

                    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
                    simulation.alpha(1).restart();
                })

                */

    //}, [data, dimensions]); // any time the data or dimensions change this is called again
    }, [data]); // any time the data or dimensions change this is called again

    return (
        <div ref={wrapper} style={{ marginBottom: "4rem" }}>
            <svg ref={ svgRef }></svg>
        </div>
    )
}

export default Force;