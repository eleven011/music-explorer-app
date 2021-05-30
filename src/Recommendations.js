// import React, { Component } from "react";
import {useEffect, useState } from "react";
import{base_url} from "./constants";
import Visuals from "./Visuals";
import Artist from "./artistSearch";
import { getArtist } from "./spotifyFunctions";
import { useHistory } from "react-router-dom";
// import env from "react-dotenv";
// import { directive } from "@babel/types";
// import ReactDOM from 'react-dom';


function Search() {
  const [recommendation, setRecommendation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [choice, setChoice] = useState(false);
  // const [artist, setArtist] = useState({});

  var data_obj = {
    name: " ",
    children: []
  };
  let recNames = [];
  let listItems;
//
  
  // useEffect(() => {
  //   const delayDebounceFn = setTimeout(() => {
  //     console.log(searchTerm);

  //     const get_artist = async() => {
  //       const my_artist =  await getArtist(searchTerm);
  //       setArtist(my_artist);
  //       setChoice(true);
  //       getRecommendation(artist.name);
  //     }
  //     if (searchTerm !== "") {
  //       get_artist();
  //     }

  //   }, 3000);


  //   return () => clearTimeout(delayDebounceFn);
  // }, [searchTerm, choice]);

  async function getRecommendation(searchTerm) {
    try {
      let response = await fetch(
        base_url +
          "&k=" +
          process.env.REACT_APP_TASTEDIVE_KEY +
          "&q=" +
          searchTerm
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
  if (recommendation === null || recommendation.Similar.Results.length === 0) {
    for (var i = 0; i < 5; ++i) {
      recNames.push(" ");
    }
  } else {
    for (var i = 0; i < 5; ++i) {
      recNames.push(recommendation.Similar.Results[i].Name);
    }
  }

  // const youtubeID = recommendation.Info.yID;
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

// if(choice === false){
  let history = useHistory();
  const handleOnClick = () => {
    let artistToSearch = document.getElementById("artist-search").value;
    let numRecs = document.getElementById("num-recs").value;
    console.log(artistToSearch);
    history.push({
      pathname: '/results', 
      state: {detail: artistToSearch, 
              number: numRecs}
    });
  }
  const handleOnEnter = (e) => {
    if(e.keyCode === 13){
      handleOnClick();
    }
  }
  return (
    <div className="container">
      <div className="split left">
        <div className="centered">
          <h2 className="welcome">Welcome to Music Explorer</h2>
          <br></br>
          <p className="helpful">Enter the artist name you would like to see recommendations of</p>
      </div>
      </div>
      <div className="split right">
          <div className="search-circle">
            <div className="artist-search-group">
              <input className="artist-search" id="artist-search" type="input" placeholder="Search for an artist..."
              onKeyDown={handleOnEnter} required/>
              <label className="artist-search-label" id="artist-search-label" htmlFor="artist-search"></label>
              <label htmlFor="num-recs"> 
              <input
              id="num-recs"
              type="number"
              min="1" 
              max="10"
              placeholder="# of recs"/>
              </label>
              <div>
              <input className="btn btn-primary btn-lg" type="submit" value="Explore!" onClick= {handleOnClick} />

              <button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal">About Us...</button>
              <div class="modal fade" id="myModal" role="dialog">
                <div class="modal-dialog modal-sm">
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                      <h4 class="modal-title">Music Explorer Team</h4>
                    </div>
                    <div class="modal-body">
                      <p>VIVIAN ALSO NICKI ALSO KEVIN</p>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
                </div>

              </div>
          </div>
        </div>
      </div>
    </div>

  );

}
export default Search;



// function theonhover(){
//   return (
//       <div>
//         <Artist artist={artist}/>
//       </div>
//   );
// }
