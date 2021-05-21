import axios from 'axios';
import qs from 'qs';
import env from "react-dotenv";


// NOTE TO VIVIAN!!!
// api calls have issue on your browser unless
// it's incognito mode


// steps for making api call w/ Spotify
// 1. request auth token using client credentials
// 2. use token to make calls to API

// this function gets auth token
export const getToken = async () =>  {
    const token_URL = 'https://accounts.spotify.com/api/token';
    
    const client_id = process.env.REACT_APP_CLIENT_ID;
    const client_secret = process.env.REACT_APP_CLIENT_SECRET;
   
    const headers = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
          username: client_id,
          password: client_secret,
        },
      };

    const data = {
        grant_type: 'client_credentials',
    };

    try {
        const response = await axios.post(
            token_URL,
            qs.stringify(data),
            headers
        );
        console.log(response.data.access_token);
        return response.data.access_token;
    } catch (error) {
        console.log(error);
    }
};

// this function retrieves artist id based on artist name
// provided by user
// Note: this is a security vulernability to use input from user
// without sanitizing, so, beware...
export const getArtistID = async (artistName) => {
    let my_token = await getToken();
    let search_URL = "https://api.spotify.com/v1/search";

    try {
        const response = await axios({
            headers: {  
                "Authorization": `Bearer ${my_token}`,
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            method: 'GET',
            url: search_URL,
            params: {
                q: artistName,
                type: 'artist',
            },
        });
        // we want best match so use index 0
        return new Promise ((resolve, reject) => {
            resolve(response.data.artists.items[0]);
        })

    } catch (error) {
        console.log(error);
    }
}

// after retrieving artist id,
// get all data on that artist
// kind of making an api call twice tho....
// might be better to just take index 0 of results from
// above function and be happy with that?

// response -> artists -> items -> index 0
// then to: array of genres, popularity,
// images array -> each index has height, width, and url
export const getArtist = async (artistName) => {
    let artistData = await getArtistID(artistName);

    console.log(artistData);

    const artist = {
        name: artistData.name,
        genres: artistData.genres,
        popularity: artistData.popularity,
        imageURL: artistData.images[0].url,
    }

    return artist;
}