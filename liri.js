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
		console.log(JSON.parse(body));
	}
});
