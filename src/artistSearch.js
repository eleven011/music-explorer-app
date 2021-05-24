import { getArtist } from "./spotifyFunctions";
import "./artistSearch.css"

const Artist = ({artist}) => {

    // if (artist.isResolved) {
    //     console.log(artist);
    //     console.log("Artist is rendered!")
    // }
    // let artist = await getArtist(searchTerm);

    // use useeffect and push up logic

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


            // <div className = "container">
            //     <div className = "root-artist-circle">
            //         <img src={artist.imageURL} width="100" height="100"/>
            //         {<h2>{artist.name}</h2>}
            //     </div>
            // </div>
      ); 
}
   
  export default Artist;