import React, { useRef, useEffect } from "react";
import Force from "./Force";

// dummy JSON object **** this is where a function is run
const data = {
  name: "Lady Gaga ",
  children: [
    {
      name: "Katy Perry ",
      // additional info if needed about Katy Perry
      children: [
        {
          name: "P!nk ",
          // additional info if needed about Pink
        },
        {
          name: "Ke$ha",
        }
      ]
    },
    {
      name: "Rihanna ",
    },
    {
      name: "Beyonce ",
    },
  ]
};

function Visuals() {
return (
  <React.Fragment>
    <h2> Test Force Physics</h2>
    <Force data = {data} />
  </React.Fragment>
)
}

export default Visuals;
