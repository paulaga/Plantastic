const express = require('express');
const router = express.Router();
const spotifyApi = require('../config/playlist')

//Retrieve an access token
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err);
});

router.get('/', (req, res) => {
  spotifyApi.getPlaylist('riw9rsp43jaqscy6wc36tx46a', '4Q7sxkXzveON4HQYOkctmQ')
    .then(data => {
      res.status(200).json(data.body)
      console.log('Some information about this playlist', data.body);
    })
    .catch(e => next(e))
})

module.exports = router;