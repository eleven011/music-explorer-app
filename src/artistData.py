import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import pandas as pd
import time


# note: these shouldn't really exist in the code but they are here for now
client_id = '3f5721b4d8ed43ba8c22404e8ce29c02'; # Your client id
client_secret = 'baf26abecc134d1192cb9241e956e556'; # Your secret

client_credentials_manager = SpotifyClientCredentials(client_id, client_secret)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

# use spotify api search endpoint to get artist id!!
