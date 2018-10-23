const express = require('express');
const request = require('request');
const keys = require('../../config/keys.js');
const router = express.Router();

// @Route   Get api/token
// @Desc    Get giphy 
// @Access  Private
router.get('/giphy/:query', (req, res) => {
    var options = {json: true};
    request.get(`https://api.giphy.com/v1/gifs/search?q=${req.params.query}&limit=3&api_key=${keys.giphyKey}`, options, function(error, response, body) {
        res.json(response.body.data);
    });
});

module.exports = router;