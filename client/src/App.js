import React, { Component } from 'react';
import { Base64 } from 'js-base64';
import axios from 'axios';
import querystring from 'querystring';
import Header from './components/Header';
import Footer from './components/Footer';
import SignUpOrSignIn from './components/SignUpOrSignIn';
import SearchForm from './components/SearchForm';
import ResultList from './components/ResultList';
import {spotidyClientID, spotifySecret, giphyKey} from './Config.js';
import {Cookies} from 'react-cookie';
const cookies = new Cookies();

class App extends Component {

  constructor() {
    super();
    this.state = {
      gifs: [],
      tracks: [],
      searchText: '',
      username: cookies.get('username'),
      isLoggedIn: false      
    };

    this.handleLoggedStatus = this.handleLoggedStatus.bind(this);
}

performSearch = (query) => {
    axios.get(`https://api.giphy.com/v1/gifs/search?q=${query}&limit=3&api_key=${giphyKey}`)
        .then(response => {
          this.setState({
            gifs: response.data.data
          });
        })
      .catch((error) =>{
        console.log('Error fetching and parsing data',  error);
      });
      
      let spotifyCredentials = `${spotidyClientID}:${spotifySecret}`;
      let base64Credentials = Base64.encode(spotifyCredentials);
      let accessToken;
  
      axios.post('https://accounts.spotify.com/api/token',
        querystring.stringify({
          grant_type: 'client_credentials'
        }), {
        headers: {
            'Authorization': `Basic ${base64Credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }})
        .then((response) => {
            accessToken = response.data.access_token;
            axios.get(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=3`,
            {
              headers: {
                'Authorization': `Bearer ${accessToken}`}
            }).then((response) => {
              this.setState({
                tracks: response.data.tracks.items
              });
            }).catch((error) => {
  
            })         
        }).catch((error) => {
            console.log(error);
        });
  }

  handleLoggedStatus(username) {
    const cookies = new Cookies();
    cookies.set('username', username, { path: '/' });
    this.setState({
      isLoggedIn: true,
      username: username
    })
  }

  render() {
    return (
        <div id="MainContainer" className='main-container'>
          <Header username={this.state.username} />
          <main className="main-content">
            {this.state.isLoggedIn ? (
                <div>
                  <SearchForm onSearch={this.performSearch} />
                  <ResultList searchText={this.state.searchText} gifs={this.state.gifs} tracks={this.state.tracks} />
              </div>
            ) : 
            (
              <SignUpOrSignIn handleLoggedStatus={this.handleLoggedStatus}/>

              )}
            </main>
          <Footer />
        </div>
    );
  }
}

export default App;
