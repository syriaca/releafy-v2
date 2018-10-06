const express = require('express');
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


module.exports = router;