require('dotenv').config();
const SpotifyWebApi = require('spotify-web-api-node');

//Spotify
const SpotifyApi = new SpotifyWebApi({
  clientId : process.env.clientId,
  clientSecret : process.env.clientSecret
});

module.exports = SpotifyApi;