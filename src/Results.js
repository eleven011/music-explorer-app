import React, { Component } from "react";
import { useLocation } from "react-router-dom";
import Force from "./Force";
import Artist from "./artistSearch";
import { getArtist } from "./spotifyFunctions";
import {useEffect, useState } from "react";
import{base_url} from "./constants";

 
const Results = props => {
  const location = useLocation();
  const searchTerm = location.state.detail;
  // const [recommendation, setRecommendation] = useState({});
  const [choice, setChoice] = useState(false);
  const [artist, setArtist] = useState({});
  const [data_obj, setData_obj] = useState({
    name: searchTerm,
    children: []
  })
  // const [recNames, setRecNames] = useState([]);

  // var data_obj = {
  //   name: searchTerm,
  //   children: []
  // };
  let recNames = [" ", " ", " ", " ", " "];

  useEffect(() => {
    // console.log(searchTerm);
    const get_artist = async() => {
      const my_artist =  await getArtist(searchTerm);
      setArtist(my_artist);
      if (artist.name !== undefined) {
        console.log("artist has been set to: ", artist.name);
        setChoice(true);
        getRecommendation(artist.name);
        // fillGraph();
      }
      console.log("get_artist inside of use_effect is being called");
    }
    // && choice === false
    if (searchTerm !== "" && choice === false) {
      get_artist();
    }
  }, [choice, artist, data_obj]);

  async function getRecommendation(searchTerm) {
      fetch(
        base_url +
          "k=" +
          process.env.REACT_APP_TASTEDIVE_KEY +
          "&q=" +
          searchTerm
      )
        .then(response => response.json())
        .then(data => {
          console.log("returned data", data);
          fillGraph(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
        

      // let data = await response.json();
      // console.log("returned data", data);
      // // console.log(base_url + "k=" + taste_dive_key + "&q=" + searchTerm);
      // // setRecommendation(data);
      // return data;

    // let obj = {
    //   Similar: {
    //     Results: [
    //       {Name: "hello1"}, {Name: "hello2"}, {Name: "hello3"}, {Name: "hello4"}, {Name: "hello5"}
    //     ]
    //   }
    // }
    // console.log("dummy obj in getRec is: ", obj);
    // setRecommendation(obj);

  }

function fillGraph(recommendation) {
    // let recommendation = await getRecommendation(searchTerm);
    console.log("recommendation is: ", recommendation);
    if (recommendation.Similar === undefined) {
      for (var i = 0; i < 5; ++i) {
        recNames.push(" ");
      }
    } else {
      for (var i = 0; i < 5; ++i) {
        recNames.push(recommendation.Similar.Results[i].Name);
      }
    }
    for (i = 0; i < 5; ++i) {
      // data_obj.children.push({ name: recNames[i] });
      let hold = data_obj;
      hold.children.push({ name: recNames[i] });

      setData_obj(hold);

    }
    console.log("fillGraph is being called");
    console.log("filled data: ", data_obj);
  }

  // if (choice === true) {
    return (
          <div className= "container"> 
            <Artist artist={artist}/>
            <Force data={data_obj}/>
          </div>
        );
  // }
  // else {
  //   return (
  //     <div>
  //       <h2>You selected: {location.state.detail}</h2>
  //     </div>
  //   );
  // }
}

 
export default Results;