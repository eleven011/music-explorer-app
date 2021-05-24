import React, { Component } from "react";
import { useLocation } from "react-router-dom";
 
const Results = props => {
  const location = useLocation();
  console.log(location.state.detail);

    return (
      <div>
        <h2>You selected: {location.state.detail}</h2>
      </div>
    );
  }

 
export default Results;