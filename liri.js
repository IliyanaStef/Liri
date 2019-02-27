//Enviroment variables
var fs = require("fs");
var dotenv = require("dotenv").config();
var keys = require("./keys");
var axios = require("axios")
var Spotify = require('node-spotify-api');
var moment = require('moment');

// Stores the arguments in an array
var nodeArgs = process.argv;

// Stores  the command
var command = process.argv[2]; 

// Creates an empty string for storing the user's song or movie name
var userInput = "";

// Loops through to capture all of the words in the song or movie name and stores them in the userInput string
function storeInput() {
for (var i = 3; i < nodeArgs.length; i++) {
	userInput = userInput + " " + nodeArgs[i];
}
console.log("Searching for: " + userInput +"\n");
}
	
// Function to call and return user's provided song
function spotifyThis() {
	storeInput()
    var spotify = new Spotify(keys.spotify);
	var query;

	// if the user provides a song, that song will be queried; otherwise, "The Sign" will be queried
	if (userInput !== "" && userInput !== null) {
		query = userInput;
	} else {
		query = "The Sign";
	}

	spotify.search({type: "track", query: query}, function(err, data) {
  		if (err) {
    		return console.log("Error occurred: " + err);
  		}
		console.log("\nTHE SONG YOU REQUESTED:\n\n" + "Artist: " + data.tracks.items[0].album.artists[0].name + "\nSong: " + query + "\nAlbum: " + data.tracks.items[0].album.name + "\nPreview link: " + data.tracks.items[0].album.artists[0].external_urls.spotify + "\n---------------\n");
		fs.appendFile("log.txt", "\nTHE SONG YOU REQUESTED:\n\n" + "Artist: " + data.tracks.items[0].album.artists[0].name + "\nSong: " + query + "\nAlbum: " + data.tracks.items[0].album.name + "\nPreview link: " + data.tracks.items[0].album.artists[0].external_urls.spotify + "\n---------------\n", 
		function(err) {
			if (err) {
				console.log(err);
			} else {
				console.log("Song added!");
			}
		});
	});
}

// Function to call and return user's provided movie
function movieThis() {
	storeInput()
	var movieName;
	
	// if the user provides a movie, that movie will be queried; otherwise, "Mr.Nobody" will be queried
    if (userInput !== "" && userInput !== null) {
		movieName = userInput;
	} else {
		movieName = "Mr.Nobody";
	}

    var movieUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
   
    axios.get(movieUrl).then(
        function (response) {
        console.log("\n_Movie Info_" + "\nTitle: " + response.data.Title + "\nRelease Year: " + response.data.Year + "\nRating: " + response.data.Rated + "\nRelease Country: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors + "\n" + "\n Love this one!");
	});
}

// Function to take the text inside random.txt for calling a function
function doWhatItSays() {
	fs.readFile("random.txt", "utf8", function(err, data) {
		if (err) {
			return console.log(err);
		}

		// Stores the returned data as an array, split where there are commas
		var dataArray = data.split(",");
		console.log(dataArray);

		command = dataArray[0];
		userInput = dataArray[1];

		// Determines which function and query to run 
		switch (command) {
			case "concert-this":
			concertThis();
			break;

			case "spotify-this-song":
			spotifyThis();
			break;

			case "movie-this":
			movieThis();
			break;
		}
	});
}

// A switch-case statement that will determine which function to run
	switch (command) {
	case "concert-this":
	concertThis();
	break;

	case "spotify-this-song":
	spotifyThis();
	break;

	case "movie-this":
	movieThis();
	break;

	case "do-what-it-says":
	doWhatItSays();
	break;
}

