require("dotenv").config();

var request = require('request');
var fs = require('fs');
var keys = require("./keys.js");
var axios = require ("axios")
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var search = process.argv[3];

console.log(command);
console.log('before the switch statement');

    switch (command) {
        case 'concert-this' :
            findBandInTown(search);
            break;
        case 'spotify-this-song':
            findSong(search);
            break;
    }                               

//Function to find the song
function findSong(search){
    if(search == undefined)
        search = "The Sign";

    spotify.search(
        {
            type: "track",
            query: search
        }, function(err, data){
            var songs = data.tracks.items;
            for(var songCount = 0; songCount < songs.length; songCount++){
                console.log("\nArtist : "+songs[songCount].artists[0].name);
                console.log("Song : "+ songs[songCount].name);
                console.log("Preview :"+ songs[songCount].preview_url);
                console.log("Album : "+songs[songCount].album.name);
            }

        }
    )
}

//Function to find the concerts
function findBandInTown(artist) {
    var bandQuery = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(bandQuery)
    request(bandQuery, function (error, response, body) {
        if (!error && response.statusCode == 200) {
                console.log("Successful API call");
                var concertInfo = JSON.parse(body);
                console.log(concertInfo.length);
                for (var concertCount = 0; concertCount < concertInfo.length; concertCount++) {

                    console.log("\nName of the Venue: " + concertInfo[concertCount].venue.name);
                    fs.appendFileSync("log.txt", "Name of the Venue: " + concertInfo[concertCount].venue.name + "\n");
                    console.log("Venue Location: " + concertInfo[concertCount].venue.city);
                    fs.appendFileSync("log.txt", "Venue Location: " + concertInfo[concertCount].venue.city + "\n");
                    console.log("Date of the Event: " + concertInfo[concertCount].datetime);
                    fs.appendFileSync("log.txt", "Date of the Event: " + concertInfo[concertCount].datetime + "\n");

                }

            } else {
                console.log('Error occurred');
                appendFileSync("log.txt", "Error occurred");
            }
        }
    );
}
