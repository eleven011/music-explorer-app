
const Artist = ({artist}) => {

    // if (artist.isResolved) {
    //     console.log(artist);
    //     console.log("Artist is rendered!")
    // }
    console.log(artist);

      return (
            <div className = "container">
                <div className = "root-artist-circle">
                    <p>{artist.name}</p>
                </div>
            </div>
      );
 
}
   
  export default Artist;