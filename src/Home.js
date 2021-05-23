import React, { useEffect, useState } from "react";
import Artist from './artistSearch';
import { getArtist } from "./spotifyFunctions";


function Search() {
  const [searchTerm, setSearchTerm] = useState('')
  const [artist, setArtist] = useState({});
  const [choice, setChoice] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(searchTerm);
      // Send Axios request here
      const get_artist = async() => {
        const my_artist = await getArtist(searchTerm);
        // console.log(my_artist);
        setArtist(my_artist);
        setChoice(true);
      }
      // console.log(choice)
      if (searchTerm !== ''){
        get_artist();
      }
    }, 3000)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm, choice])

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
        <Artist artist={artist}/>

      );
    }

}
 
export default Search;