/*Created by courtneyphelps on 6/15/17.*/


// Twitter variables
var twitterKeys = require('./keys.js');
//console.log("twitter keys",keys);
var Twitter = require('twitter');
// Twitter package for user based authentication:
var client = new Twitter(
    twitterKeys
);
// Spotify variables
var spotifyKeys = require('./spotifyKeys');
//console.log("spotifyKeys", spotifyKeys)
var Spotify = require('node-spotify-api');
// spotify package for user based authentication:
var spotify = new Spotify(
    spotifyKeys
);
//OMDB API
var request = require("request");
var nodeArgs = process.argv;
var movieName = "";

var fs = require("fs");


var action = process.argv[2];
var userInput = process.argv[3];

switch (action) {
    case "t":
    case "-t":
    case "tweet":
    case "twitter":
    case "tweets":
    case "my-tweets":
        tweets();
        break;
    case "s":
    case "-s":
    case "song":
    case "spotify":
    case "spotify-song":
    case "spotify-this-song":
        spotifyThis();
        break;
    case "m":
    case "-m":
    case "movie":
    case "this-movie":
        movie();
        break;
    case "d":
    case "-d":
    case "do":
    case "do-it":
    case "do-what-it-says":
        random();
        break;
    default:
        console.log("Please log (my-tweets, -t, t, tweet, twitter, tweets), (spotify-this-song, -s, s, song, spotify, spotify-song), (this-movie, -m, m, movie) OR (do-what-it-says, -d, d, do, do-it)");
        break;
}

function tweets(){
    // Getting my tweets
    var params = {screen_name: 'LIRIBot987'};
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        // If theres an error, it'll throw it
        if (error) {
            throw error;
        }
        // If theres isnt an error, it'll console log the tweets
        if (!error) {
            //console.log(tweets);
        }
        for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].text);
        }
        for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].created_at);
        }
    });

}

function spotifyThis() {

    spotify.search({type: 'track', query: userInput}, function(err, data) {

       // console.log(data.tracks)

        for (var tracks in data){

            var obj = data[tracks];

            var final = obj.items[0].artists

            console.log(final)
        }

        for (var name in data) {

            var objName = data[name];

            var finalName = obj.items[0].name

            console.log(finalName)
        }

        for (var album in data) {

            var albumName = data[album];

            var finalAlbum = obj.items[0].album.name

            console.log(finalAlbum)
        }
    });
}



// Create an empty variable for holding the movie name


// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
function movie() {

    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=40e9cece";

    //console.log(queryUrl);

    request(queryUrl, function(error, response, body) {

       //console.log(response);
        if (error) throw error;

        if (!error && response.statusCode === 200) {

            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
           // console.log("Rotten Tomatoes URL: " + JSON.parse(body).Year); --doesnt have it
        }
    });
}



function random() {
    fs.readFile("random.txt", "utf8", function(err, data) {
    if (err)
        throw error;
    if (data);
    console.log(data);

    })
}
