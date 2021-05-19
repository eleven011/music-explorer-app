import React, { Component } from "react";
import {useEffect, useState } from "react";
import{taste_dive_key, base_url} from "./constants";
// import { directive } from "@babel/types";
// import ReactDOM from 'react-dom';


function Search() {
    // const [recommendation, setRecommendation] = useState(null);
    const [searchTerm, setSearchTerm] = useState('')
  
    useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
        console.log(searchTerm)
        // Send Axios request here
        getRecommendation(searchTerm);
      }, 3000)
      return () => clearTimeout(delayDebounceFn)
    }, [searchTerm])

    async function getRecommendation(searchTerm){
        try{
        let response = await fetch(base_url + 'k=' + taste_dive_key + '&q=' + searchTerm);
        let data = await response.json();
        console.log(data);
        console.log(base_url + 'k=' + taste_dive_key + '&q=' + searchTerm);
        // setRecommendation(data);
        }catch(error){
            console.log(error);
        }

    }
  
    // render() {
      return (
        <div className = "container">
          {/* circle */}
          <div className = "search-circle">
            {/* <div className = "search-box"> */}
              <label for="artist-search">
              <input 
                type = "text" 
                id="artist-search" 
                placeholder="Search for an artist..." 
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              </label>
            {/* </div> */}
          </div>
            <div>   
                {/* <h2>{recommendation.Similar.Results}</h2> */}
                <h2>{searchTerm}</h2>
            </div>

        </div>

      );
}

export default Search;
