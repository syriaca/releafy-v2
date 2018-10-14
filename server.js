const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const users = require('./routes/api/users');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors())

// DB Config
const database = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
    .connect(database)
    .then(() => console.log('MongoDB is connected...'))
    .catch(err => console.log(err));

app.use('/api/users', users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));