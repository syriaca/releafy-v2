const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const keys = require('./config/keys.js');
const users = require('./routes/api/users');
const spotify = require('./routes/api/spotify');
const giphy = require('./routes/api/giphy');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// DB Config
const database = process.env.MONGO_URI || keys.MONGO_URI;

// Connect to MongoDB
mongoose
    .connect(database)
    .then(() => console.log('MongoDB is connected...'))
    .catch(err => console.log(err));

app.use('/api/users', users);
app.use('/api/spotify', spotify);
app.use('/api/giphy', giphy);

//Behaviour for production env.
if (process.env.NODE_ENV === "production") {
    // Express will serve up production assets
    //like our main.js file, or main.css file
    app.use(express.static("client/build"));
    //Express will serve index.html file if it doesn't recognize the route
    const path = require("path");
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));