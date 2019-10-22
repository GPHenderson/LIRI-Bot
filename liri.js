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

switch(command) {
    case("spotify-this-song"):
        spotifyThisSong(search);
        break;
    case("movie-this"):
        getMovies(search);
        break;
    case"concert-this":
    concertThis(otherInput)
    break;
  case"doThis":
  doWhatItSays()
  break;
  }         

//Function to find the song
function findSong(search){
    if(search == undefined)
        search = "The Sign";

        spotify.search({ type: 'track', query: song, limit: 20 }, function(error, data) {
            if (!error) {
              for(var i = 0; i < data.tracks.items.length; i++) {
               var songInfo = data.tracks.items[i]; 
              console.log("Artist: " + songInfo.artists[0].name);
              console.log("Song: " + songInfo.name)
              console.log("URL: " + songInfo.preview_url);
              console.log("Album: " + songInfo.album.name);
              console.log("--------------------------")
              }
                }
                  else {
                  console.log("Error occurred")
               }
              
          });
}

//Function to find movies
function getMovies(movieName) {
    if(search == undefined)
        search = "Mr. Nobody";

    request("http://www.omdbapi.com/?apikey=5494fea7&t=" + movieName, function(error, response, movieResults) {
    if (!error && response.statusCode == 200){
      var movieResults = JSON.parse(movieResults);
      console.log(movieResults);
      console.log("Title: " + movieResults.Title);
      console.log("Release Year " + movieResults.Year);
      console.log("IMDB Rating: " + movieResults.imdbRating);
      console.log("Country: " + movieResults.Country);
      console.log("Language: " + movieResults.Language);
      console.log("Plot: " + movieResults.Plot);
      console.log("Actors: " + movieResults.Actors);
     // console.log("Rotten Tomatoes Rating: " + movieResults.Ratings[1].Value);
      console.log("Rotten Tomatoes Rating:"+ movieResults.Ratings[0].Value);
      console.log("Rotten Tomatoes URL: " + movieResults.Website);
    }
    })
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
//Writing a function for doThis
function doWhatItSays() {

    fs.readFile("random.txt", "utf8", function(error, data){
  
       var dataArr = data.split(",");
  
       spotifyThisSong(dataArr[1]);
    })
  }