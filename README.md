# Liri

“LIRI is like iPhone’s SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.”

Installing
Clone the repository onto your system.
git clone https://github.com/IliyanaStef/Liri.git
Create a file named .env, add the following to it, replacing the values with your Spotify API keys (no quotes) once you have them:

SPOTIFY_ID=your-spotify-id

SPOTIFY_SECRET=your-spotify-secret

Install the packages in the root directory:
npm install

# Using the app:

*Spotify:
node liri.js spotify-this-song 'song name here'

*Movie:
node liri.js movie-this 'movie name here'

*Concert:
node liri.js concert-this 'artist/band name here'

*Custom command:
node liri.js 'do-what-it-says'
Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI’s commands. It should run spotify-this-song for “I Want it That Way,” as follows the text in random.txt.

# Demo: https://drive.google.com/file/d/1aoeO2mngap_BDakTwgdW3yVpqMN7ZqBG/view
