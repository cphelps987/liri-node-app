/**
 * Created by courtneyphelps on 6/15/17.
 */

//-------------twitter-------------------/

var index2 = process.argv[2];
var index3 = process.argv[3];


// Twitter variables
var twitterKeys = require('./keys.js');
//console.log(keys);
var Twitter = require('twitter');
// Twitter package for user based authentication:
var client = new Twitter(
    twitterKeys
);
//console.log(client);
// if statement where the 2nd index is "my-tweets"
if (index2 === "my-tweets") {
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
var spotifyKeys = require('./spotifyKeys');

var Spotify = require('node-spotify-api');

var spotify = new Spotify(
        spotifyKeys
);
//console.log(spotifyKeys);

if (index2 === "spotify-this-song") {
    spotify.search({type: 'track', query: index3}, function(err, data) {

        if (err) {
            return console.log('Error occurred: ' + err);
        }
       // console.log(data);

       // for (var i = 0; i < data.tracks.items.length; i++) {
           // console.log(data.tracks.items[i]);

            //for (var j =0; j < data.tracks.items[i].album.artist.length; j++) {
                console.log(data.tracks.items[0].album.artists[j].name);

           /* }
        }*/

        console.log(data.tracks.items[0].album[0].artists[0].name);
    });
}

var request = require("request");

var nodeArgs = process.argv;

// Create an empty variable for holding the movie name
var movieName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
if (index2 === "movie-this") {
    for (var i = 2; i < nodeArgs.length; i++) {

        if (i > 2 && i < nodeArgs.length) {

            movieName = movieName + "+" + nodeArgs[i];

        }

        else {

            movieName += nodeArgs[i];

        }
    }

    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

    //console.log(queryUrl);

    request(queryUrl, function(error, response, body) {

       // console.log(response);
        if (error) throw error;

        if (!error && response.statusCode === 200) {

            console.log("Release Year: " + JSON.parse(body).Plot);
        }
    });
}

/*
var movieName = index3;

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

console.log(queryUrl);

request(queryUrl, function (error, response, body) {

    if (error) throw error

    console.log("plot " + JSON.parse(body).Plot)

});*/
