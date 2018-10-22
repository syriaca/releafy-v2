const express = require('express');
const request = require('request');
const keys = require('../../config/keys.js');
const router = express.Router();

// @Route   Get api/token
// @Desc    Get spotify api token and make a search
// @Access  Private
router.get('/spotify/:query', (req, res) => {

    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            grant_type: 'client_credentials'
        },
        headers: {
            'Authorization': 'Basic ' + (new Buffer(keys.spotidyClientID + ':' + keys.spotifySecret).toString('base64')),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        json: true
    };
    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var accessToken = body.access_token;  
            var options = {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            json: true
            };
            request.get(`https://api.spotify.com/v1/search?q=${req.params.query}&type=track&limit=3`, options, function(error, response, body) {
                res.json(response)
            });
        }
    });
});

module.exports = router;