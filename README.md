# Releafy
Releafy is just an app to display 3 gifs and 3 spotify songs according a keyword query

## Javascript stack
That app is MERN stacked based app (MongoDB, Express.js, React.js and Node.js).

- Database is managed with **MongoDB**
- Backend and REST API are powered with **Node.js** and **Express.js**
- Frontend is powered with **React.js**

## Initial requirement for local installation
Before anything else to test that application, you must have or create an account at:
- **[Spotify](https://developer.spotify.com/)** 
- **[Giphy](https://developers.giphy.com/)**
- **[Mlab](https://https://mlab.com/home)**
- **[Heroku](https://www.heroku.com/)**

## Local installation
1. Clone the github repository,
2. At root, create a **config** directory 
3. Inside that directory create a **keys.js** following that format
```
module.exports = {
    SPOTIFY_CLIENT_ID: 'your spotify client id',    
    SPOTIFY_SECRET: 'your spotify secret',    
    GIPHY_KEY: 'your giphy key',    
    MONGO_URI: 'your Mlab uri' (ex: mongodb://<dbuser>:<dbpassword>@ds123963.mlab.com:23963/releafy)
}
```

