var request = require("request");

var nodeArgs = process.argv;

var movieName = "";

for (i = 2; i < nodeArgs.length; i++) {
	if (i > 2 && i < nodeArgs.length) {
		movieName += "+" + nodeArgs[i];
	} else {
		movieName += nodeArgs[i];
	}
}

var queryUrl =  "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=776d35f9";

request(queryUrl, function(error, reponse, body) {
	if (!error && reponse.statusCode === 200) {
		console.log("Title: " + JSON.parse(body).Title);
		console.log("Year: " + JSON.parse(body).Year);
		console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
		console.log("Rotten Tom Rating: " + JSON.parse(body).Ratings[1].Value);
		console.log("Country: " + JSON.parse(body).Country);
		console.log("Language: " + JSON.parse(body).Language);
		console.log("Plot: " + JSON.parse(body).Plot);
		console.log("Actors: " + JSON.parse(body).Actors);
	}
});
