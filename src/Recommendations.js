import { useHistory } from "react-router-dom";

function Search() {
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
    <div className="card">
      <div className="search">
      <label htmlFor="artist-search">
          <input
            type="text"
            id="artist-search"
            placeholder="Search for an artist..."
            onKeyDown={handleOnEnter}
          />
          <input className="btn btn-primary" type="submit" value="search" onClick= {handleOnClick} />
        </label>
        <br></br>
        <label htmlFor="num-recs"> 
            <input
              id="num-recs"
              type="number"
              min="1" 
              max="10"
              placeholder="# of recs"
            />
        </label>
        </div>
    </div>



    // <div className="container">
    //   <div className="search-circle">
    //     <label htmlFor="artist-search">
    //       <input
    //         type="text"
    //         id="artist-search"
    //         placeholder="Search for an artist..."
    //         onKeyDown={handleOnEnter}
    //       />
    //       <input className="btn btn-primary" type="submit" value="search" onClick= {handleOnClick} />
    //     </label>
        // <label htmlFor="num-recs"> 
        //     <input
        //       id="num-recs"
        //       type="number"
        //       min="1" 
        //       max="10"
        //       placeholder="# of recs"
        //     />
        // </label>
    //   </div>
    // </div>

  );

}
export default Search;