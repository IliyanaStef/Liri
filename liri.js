//Enviroment variables
var fs = require("fs");
var dotenv = require("dotenv").config();
var keys = require("./keys");
var axios = require("axios")
var Spotify = require('node-spotify-api');
var moment = require('moment');
var command = process.argv[2];
var Input = process.argv.slice(3).join(" ");

// Function to call and return user's provided song
function spotifyThis() {
    var spotify = new Spotify(keys.spotify);
	var query;

	// if the user provides a song, that song will be queried; otherwise, "The Sign" will be queried
	if (Input !== "" && Input !== null) {
		query = Input;
	} else {
		query = "The Sign";
	}

	spotify.search({type: "track", query: query}, function(error, data) {
  		if (error) {
    		return console.log("Error occurred: " + error);
  		}
		console.log("\nTHE SONG YOU REQUESTED:\n" + "\nArtist: " + data.tracks.items[0].album.artists[0].name + "\nSong: " + query + "\nAlbum: " + data.tracks.items[0].album.name + "\nPreview link: " + data.tracks.items[0].album.artists[0].external_urls.spotify + "\nEnjoy!");
		fs.appendFile("log.txt", "\nTHE SONG YOU REQUESTED:\n" + "\nArtist: " + data.tracks.items[0].album.artists[0].name + "\nSong: " + query + "\nAlbum: " + data.tracks.items[0].album.name + "\nPreview link: " + data.tracks.items[0].album.artists[0].external_urls.spotify + "\nEnjoy!" + "\n---------------\n", 
		function(error) {
			if (error) {
				console.log(error);
			} else {
				console.log("Song added!");
			}
		});
	});
}

// Function to call and return user's provided movie
function movieThis() {
	var movieName;
	
	// if the user provides a movie, that movie will be queried; otherwise, "Mr.Nobody" will be queried
    if (Input !== "" && Input !== null) {
		movieName = Input;
	} else {
		movieName = "Mr.Nobody";
	}

    var movieUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
   
	axios.get(movieUrl)
		.then(
        function (response) {
        console.log("\nTHE MOVIE YOU REQUESTED:\n" + "\nTitle: " + response.data.Title + "\nRelease Year: " + response.data.Year + "\nRating: " + response.data.Rated + "\nRelease Country: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors + "\n" + "\nThat's a good one!");
	})
		.catch(function (error) {
			console.log(error);
	});
}

// Function to call and return user's provided artist/band concert search
function concertThis() {
	var artist;

	// if the user does not provide an artist/band Liri will respond with "I don't know what to search for!"
    if (Input !== "" && Input !== null) {
		artist = Input;
	} else {
		artist= "I don't know what to search for!";
	}

	var bandsUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
	
	axios.get(bandsUrl)
		.then(
        function (response) {
		for (i = 0; i < response.data.length; i++) {
		var convertedDate = moment(response.data[i].datetime, "YYYY-MM-DD").format("MM/DD/YYYY")
        console.log("\nTHE INFO YOU REQUESTED:\n" + "\nPerformer: " + artist + "\nVenue: " + response.data[i].venue.name + "\nLocation: " + response.data[i].venue.city + "," + response.data[i].venue.country + "\nDate of the event: " + convertedDate + "\nHave fun!");
		}
	})
		.catch(function (error) {
			console.log(error);
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
		Input = dataArray[1];

		// Determines which function and query to run 
		switch (command) {
			case "spotify-this-song":
			spotifyThis();
			break;

			case "movie-this":
			movieThis();
            break;
            
            case "concert-this":
			concertThis();
			break;
		}
	});
}

// A switch-case statement that will determine which function to run
	switch (command) {
	case "spotify-this-song":
	spotifyThis();
	break;

	case "movie-this":
	movieThis();
	break;
    
    case "concert-this":
	concertThis();
    break;
    
	case "do-it":
	doWhatItSays();
	break;
}