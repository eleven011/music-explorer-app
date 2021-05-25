import { useHistory } from "react-router-dom";

function Search() {
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
      <div className="search-circle">
        <label for="artist-search">
          <input
            type="text"
            id="artist-search"
            placeholder="Search for an artist..."
          />
          <input className="btn btn-primary" type="submit" value="search" onClick= {handleOnClick} />
        </label>
      </div>
    </div>

  );

}
export default Search;