const express = require('express');
const request = require('request');
const router = express.Router();

// Users model
const User = require('../../models/Users');

// @Route   GET api/users
// @Desc    Get all users
// @Access  Public
router.get('/', (req, res) => {
    User.find()
        .sort({date: -1})
        .then(users => res.json(users))
});

// @Route   POST api/users
// @Desc    Create a new user
// @Access  Public
router.post('/', (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password
    });

    newUser
        .save()
        .then(user => res.json(user));
});

// @Route   DELETE api/users/:id
// @Desc    Delete a user
// @Access  Public
router.delete('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
});

router.get('/spotify', (req, res) => {
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
            console.log("this is " + accessToken);
    
            var options = {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            json: true
            };
            request.get('https://api.spotify.com/v1/search?q=michael&type=track&limit=3', options, function(error, response, body) {
                res.json(response)
            });
        }
    });
});


module.exports = router;