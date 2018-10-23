const express = require('express');
const request = require('request');
const router = express.Router();
const giphyKey = process.env.GIPHY_KEY || require('../../config/keys.js').GIPHY_KEY;


// @Route   Get api/token
// @Desc    Get giphy 
// @Access  Private
router.get('/giphy/:query', (req, res) => {
    var options = {json: true};
    request.get(`https://api.giphy.com/v1/gifs/search?q=${req.params.query}&limit=3&api_key=${giphyKey}`, options, function(error, response, body) {
        res.json(response.body.data);
    });
});

module.exports = router;