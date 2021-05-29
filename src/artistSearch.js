//import { getArtist } from "./spotifyFunctions";
import "./artistSearch.css";
import YouTube from "react-youtube";

const Artist = ({artist}) => {
  const genres = artist.genres.map((item) => <li>{item}</li>);

      return (
          <div className="card card-flip">
                <div className="card-front">
                    <div className="card-body">
                        <img src={artist.imageURL} className="card-img-top" alt="..."></img>
                        <h3 className="card-title sequence">{artist.name}</h3>
                    </div>
                  </div>
                  <div className="card-back">
                       <div className="card-body">
                         <h3 className="card-title-header">{artist.name} is...</h3>
                          <h2 className="card-title-back">{genres}</h2>
                          <YouTube
                            className="youtube-player"
                            videoId="or6Ixeplex4"/>
                       </div>
                    <div>
                  </div>
                </div>
              </div>
      ); 
}
   
  export default Artist;