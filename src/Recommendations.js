// import React, { Component } from "react";
import {useEffect, useState } from "react";
import{base_url} from "./constants";
import Visuals from "./Visuals";
// import env from "react-dotenv";
// import { directive } from "@babel/types";
// import ReactDOM from 'react-dom';


function Search() {
  const [recommendation, setRecommendation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  var data_obj = {
      name: ' ',
      children: [],
  }
  let recNames = [];
  let listItems;

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(searchTerm);

      if (searchTerm !== "") {
        getRecommendation(searchTerm);
      }
    }, 3000);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

 

  async function getRecommendation(searchTerm) {
    try {
      let response = await fetch(
        base_url + "k=" + process.env.REACT_APP_TASTEDIVE_KEY + "&q=" + searchTerm
      );
      let data = await response.json();
      console.log(data);
      // console.log(base_url + "k=" + taste_dive_key + "&q=" + searchTerm);
      setRecommendation(data);
    } catch (error) {
      console.log(error);
    }
  
  }
    // console.log("names array: ", recommendation.Similar.Results);
    // console.log("first name: ", recommendation.Similar.Results[0].Name);
    if(recommendation === null|| recommendation.Similar.Results.length == 0){

    for (var i = 0; i < 5; ++i) {
        recNames.push(' ');
    }
    }
    else{
    for (var i = 0; i < 5; ++i) {
      recNames.push(recommendation.Similar.Results[i].Name);
    }
    }
  
    listItems = recNames.map(name => <li>{name}</li>);
  
    // now gotta figure out how to read that info into an object for Kevin:)
    // var data_obj = {};

  
    var data_obj = {
      name: searchTerm,
      children: []
    };
  
    for (i = 0; i < 5; ++i) {
      data_obj.children.push({ name: recNames[i] });
    }
  

  return (
    <div className="container">
      {/* circle */}
      <div className="search-circle">
        {/* <div className = "search-box"> */}
        <label for="artist-search">
          <input
            type="text"
            id="artist-search"
            placeholder="Search for an artist..."
            onChange={e => setSearchTerm(e.target.value)}
          />
          <input className="btn btn-primary" type="submit" value="search" />
        </label>
        {/* </div> */}
      </div>
      <div>
        {/* <h2>{searchTerm}</h2> */}
        {/* <ul>{listItems}</ul> */}
        <Visuals data = {data_obj} />
      </div>
    </div>
  );
}

export default Search;