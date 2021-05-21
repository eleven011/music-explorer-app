import { getArtist } from "./spotifyFunctions";

const Artist = ({artist}) => {

    // if (artist.isResolved) {
    //     console.log(artist);
    //     console.log("Artist is rendered!")
    // }
    // let artist = await getArtist(searchTerm);

    // use useeffect and push up logic

    console.log(artist);

      return (
            <div className = "container">
                <div className = "root-artist-circle">
                    <img src={artist.imageURL} width="100" height="100"/>
                    {<h2>{artist.name}</h2>}
                </div>
            </div>
      ); 
}
   
  export default Artist;