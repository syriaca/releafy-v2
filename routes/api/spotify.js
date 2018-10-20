const express = require('express');
const request = require('request');
const router = express.Router();

// @Route   Get api/token
// @Desc    Get spotify api token
// @Access  Private
router.get('/spotify/:query', (req, res) => {
    var client_id = '90c0d6089d534f7da469a3099543796f'; // Your client id
    var client_secret = '3e85eaaf55c34bf7a8dcd54b06782cd8'; // Your secret

    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            grant_type: 'client_credentials'
        },
        headers: {
            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
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