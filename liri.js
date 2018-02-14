var keys = require("./key.js");

var request = require("request");

var Twitter = require('twitter');
var twitterKeys = twitterKeys;

var Spotify = require('node-spotify-api');

var fs = require("fs");

var action = process.argv[2];
var nodeArgs = process.argv;

var value = "";

switch (action) {
	case "movie-this":
	movie();
	break;

	case "my-tweets":
	twitter();
	break;

	case "spotify-this-song":
	spotify();
	break;

	case "do-what-i-say":
	random();
	break;
}

function movie() {
	for (i = 3; i < nodeArgs.length; i++) {
		if (i > 3 && i < nodeArgs.length) {
			value += "+" + nodeArgs[i];
		} else {
			value += nodeArgs[i];
		}
	}

	if (value === "") {
		value = "Mr. Nobody"
	}

	var queryUrl =  "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=776d35f9";

	request(queryUrl, function(error, reponse, body) {
		if (!error && reponse.statusCode === 200) {
			console.log("Title: " + JSON.parse(body).Title);
			console.log("================================================================================");
			console.log("Year: " + JSON.parse(body).Year);
			console.log("================================================================================");
			console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
			console.log("================================================================================");
			console.log("Rotten Tom Rating: " + JSON.parse(body).Ratings[1].Value);
			console.log("================================================================================");
			console.log("Country: " + JSON.parse(body).Country);
			console.log("================================================================================");
			console.log("Language: " + JSON.parse(body).Language);
			console.log("================================================================================");
			console.log("Plot: " + JSON.parse(body).Plot);
			console.log("================================================================================");
			console.log("Actors: " + JSON.parse(body).Actors);
		}
	});
}

function twitter() {
	var client = new Twitter(keys);

	var params = {screen_name: 'stacysareas', count: 10};

	client.get('statuses/user_timeline/', params, function(error, tweets, response) {
		if (error) {
   	  		throw error;
	 	} else {
   			for (i = 0; i < tweets.length; i++) {
   				console.log(tweets[i].text);
   			}
		}
	});
}

function spotify() {
	var spotify = new Spotify({
  		id: "0bc644846c8f4a32a39f911d14fbc69d",
  		secret: "3fb5ba4428e1496fbc0b270c10e398e1"
	});

	for (i = 3; i < nodeArgs.length; i++) {
		if (i > 3 && i < nodeArgs.length) {
			value += "+" + nodeArgs[i];
		} else {
			value += nodeArgs[i];
		}
	}

	if (value === "") {
		value = "The sign Ace Of Base";
	}

	spotify.search({ type: 'track', query: value }, function(error, data) {
	  if (error) {
	    return console.log('Error occurred: ' + error);
	  }
	    console.log("Song Name: " + data.tracks.items[0].name);
	    console.log("Album: " + data.tracks.items[0].album.name);
	    console.log("Artist: " + data.tracks.items[0].artists[0].name);
		console.log("Preview Link: " + data.tracks.items[0].album.href);
	});
}	

function random() {
	fs.readFile("random.txt", "utf8", function(error, data) {
		if (error) {
			console.log('Error occurred: ' + error);
		}

		var dataArr = data.split(",");

		if (dataArr[0] === "spotify") {
			spotify(dataArr[1]);
		} 
	});
}

