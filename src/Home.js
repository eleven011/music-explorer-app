import React, { useEffect, useState } from "react";
import { getArtist } from "./spotifyFunctions";
import Artist from './artistSearch';


function Search() {
  const [searchTerm, setSearchTerm] = useState('')
  const [artist, setArtist] = useState({});
  const [choice, makeChoice] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(searchTerm);
      // Send Axios request here
      const get_artist = async() => {
        const my_artist = await getArtist(searchTerm);
        setArtist(my_artist);
        makeChoice(true);
        console.log(choice);
      }
      get_artist();
    }, 3000)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

    if (choice === false) {
      return (
        <div className = "container">
          <div className = "search-circle">
              <label for="artist-search">
              <input 
                type = "text" 
                id="artist-search" 
                placeholder="Search for an artist..." 
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              </label>
          </div>
        </div>
      );
    } 
    else {
      return (
        <Artist searchTerm={searchTerm}/>
      );
    }

}
 
export default Search;