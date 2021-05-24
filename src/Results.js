import React, { Component } from "react";
import { useLocation } from "react-router-dom";
import Visuals from "./Visuals";
import Artist from "./artistSearch";
import { getArtist } from "./spotifyFunctions";
import {useEffect, useState } from "react";
import{base_url} from "./constants";
 
const Results = props => {
  const location = useLocation();
  // console.log(location.state.detail);
  const searchTerm = location.state.detail;

  const [recommendation, setRecommendation] = useState(null);
  // const [searchTerm, setSearchTerm] = useState("");
  const [choice, setChoice] = useState(false);
  const [artist, setArtist] = useState({});

  var data_obj = {
    name: searchTerm,
    children: []
  };
  let recNames = [];
  let listItems;

  useEffect(() => {
    console.log(searchTerm);

    const get_artist = async() => {
      const my_artist =  await getArtist(searchTerm);
      setArtist(my_artist);
      setChoice(true);
      getRecommendation(artist.name);
    }
    if (searchTerm !== "") {
      get_artist();
    }
  }, [searchTerm, choice]);

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

  if (recommendation === null || recommendation.Similar.Results.length === 0) {
    for (var i = 0; i < 5; ++i) {
      recNames.push(" ");
    }
  } else {
    for (var i = 0; i < 5; ++i) {
      recNames.push(recommendation.Similar.Results[i].Name);
    }
  }

  for (i = 0; i < 5; ++i) {
    data_obj.children.push({ name: recNames[i] });
  }

  if (choice === true) {
    return (
          <div className= "container"> 
            <Artist artist={artist}/>
            <Visuals data={data_obj}/>
          </div>
        );
  }
  else {
    return (
      <div>
        <h2>You selected: {location.state.detail}</h2>
      </div>
    );
  }
}

 
export default Results;