import { getArtist } from "./spotifyFunctions";
import "./artistSearch.css"

const Artist = ({artist}) => {

    console.log(artist);

      return (
          <div class="card card-flip">
                <div class="card-front">
                    <div class="card-body">
                        <img src={artist.imageURL} class="card-img-top" alt="..."></img>
                        <h3 class="card-title">{artist.name}</h3>
                    </div>
                  </div>
                  <div class="card-back">
                      <div class="card-body">
                          <h3 class="card-title">back</h3>
                       </div>
                  </div>
                </div>
      ); 
}
   
  export default Artist;