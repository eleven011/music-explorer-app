import React, { useEffect, useState } from "react";
 
function Search() {
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(searchTerm)
      // Send Axios request here
    }, 3000)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

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
      </div>
    );
  // }
}
 
export default Search;