//import { getArtist } from "./spotifyFunctions";
import "./artistSearch.css";
import YouTube from "react-youtube";

const Artist = ({artist}) => {

    // console.log(artist);

      return (
          <div className="card card-flip">
                <div className="card-front">
                    <div className="card-body">
                        <img src={artist.imageURL} className="card-img-top" alt="..."></img>
                        <h3 className="card-title">{artist.name}</h3>
                    </div>
                  </div>
                  <div className="card-back">
                       <div className="card-body">
                          <h3 className="card-title">{artist.genres}</h3>
                       </div>
                    <div>
                    <YouTube
                    className="youtube-player"
                    videoId="or6Ixeplex4"/>
                    </div>

                     
                  </div>
                </div>
      ); 
}
   
  export default Artist;