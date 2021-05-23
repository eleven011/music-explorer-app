import React, { useRef, useEffect } from "react";
import Force from "./Force";
import Search from "./Recommendations";

// dummy JSON object **** this is where a function is run

// const data = {
//   name: "Lady Gaga ",
//   children: [
//     {
//       name: "Katy Perry ",
//       // additional info if needed about Katy Perry
//       children: [
//         {
//           name: "P!nk ",
//           // additional info if needed about Pink
//         },
//         {
//           name: "Ke$ha",
//         }
//       ]
//     },
//     {
//       name: "Rihanna ",
//     },
//     {
//       name: "Beyonce ",
//     },
//   ]
// };


function Visuals(data) {
  // console.log("Passed data: ", data);
return (
  <React.Fragment>
<<<<<<< HEAD
    {/* <h2> Test Force Physics</h2> */}
=======
>>>>>>> af5c7830a557c29ccd4c030929ae063098c50a89
    <Force data = {data} />
  </React.Fragment>
)
}

export default Visuals;
