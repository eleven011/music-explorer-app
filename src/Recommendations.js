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
<<<<<<< HEAD
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
=======
    <div className="container">
      <div className="split left">
        <div className="centered">
          <h2 className="welcome">Welcome to Music Explorer</h2>
          <br></br>
          <p className="helpful">Enter the band name you would like to see recommendations of</p>
      </div>
      </div>
      
      <div className="split right">
        <div className="centered">
          <div className="search-circle">
            <div className="artist-search">
              <label htmlFor="artist-search">
              <input
              type="text"
              id="artist-search"
              placeholder="Search for an artist..."
              onKeyDown={handleOnEnter}/>
              </label>
              <label htmlFor="num-recs"> 
              <input
>>>>>>> 6f1c40d27a8f8b46d7f1b225786d5f09156b3674
              id="num-recs"
              type="number"
              min="1" 
              max="10"
<<<<<<< HEAD
              placeholder="# of recs"
            />
        </label>
        </div>
=======
              placeholder="# of recs"/>
              </label>
              <div>
              <input className="btn btn-primary" type="submit" value="Explore!" onClick= {handleOnClick} />
              </div>
            </div>
          </div>
        </div>
      </div>
>>>>>>> 6f1c40d27a8f8b46d7f1b225786d5f09156b3674
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