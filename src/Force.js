import React, { useRef, useEffect } from "react";
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
    const svgRef = useRef();
    const wrapperRef = useRef();
    //const dimensions = useResizeObserver(wrapperRef);

    // useEffect hook
    useEffect(() => {
        //if(!dimensions) return;

        // ref svgRef to set the width + height
        const svg = select(svgRef.current);

        // trying to figure out how to get rid of this
        svg
<<<<<<< HEAD
            .attr("height", 600)
            .attr("width", 600)
=======
            .attr("height", 900)
            .attr("width", 900)
>>>>>>> aaad55c25d9a5ee5d9d2d6ced4e5b57279f81a53


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
            .force("center", forceCenter(600 / 2, 600 / 2))
            .force("charge", forceManyBody().strength(-30))
            .force("collide", forceCollide(30))

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
                    .attr("r", 15)
                    .attr("cx", node => node.x)
                    .attr("cy", node => node.y)
                    .on("click", click)
                    .on("dblclick", dblclick)
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
                    .attr("y", node => node.y);
                });

                svg.on("mousemove", () => {
                    const [x, y] = mouse(svgRef.current);
                    simulation
                        .force("x", forceX(x).strength(node => 0.15 + node.depth * 0.1))
                        .force("y", forceY(y).strength(node => 0.15 + node.depth * 0.1))

                });

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
            

    }, [data]); // any time the data or dimensions change this is called again

    return (
        <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
            <svg ref={ svgRef }></svg>
        </div>
    )
}

export default Force;