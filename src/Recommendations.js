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
          "k=" +
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
    console.log(artistToSearch);
    history.push({
      pathname: '/results', 
      state: {detail: artistToSearch}
    });
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
            // onChange={e => setSearchTerm(e.target.value)}
          />
          <input className="btn btn-primary" type="submit" value="search" onClick= {handleOnClick} />
        </label>
        {/* </div> */}
      </div>
      <div>
        {/* <Visuals data={data_obj} /> */}
      </div>
    </div>

  );
// }

  // else{
  //   return (
  //     <div className= "container"> 
  //       <Artist artist={artist}/>
  //       <Visuals data={data_obj}/>
  //     </div>
  //   );
  // }

}
export default Search;



// function theonhover(){
//   return (
//       <div>
//         <Artist artist={artist}/>
//       </div>
//   );
// }