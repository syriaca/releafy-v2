import React, { Component } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import SearchForm from './components/SearchForm';
import ResultList from './components/ResultList';
import {Cookies} from 'react-cookie/cjs';
import {Button} from 'react-bootstrap';

const cookies = new Cookies();

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gifs: [],
      tracks: [],
      searchText: '',
      username: '',
      isLogged: false
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
}

// Perform giphy and spotify search
performSearch = (query) => {
  axios.get(`/api/giphy/giphy/${query}`)
    .then(response => {
      this.setState({
        gifs: response.data
      });
    })
  .catch((error) =>{
    console.log('Error fetching and parsing Giphy data',  error);
  });

  axios.get(`/api/spotify/spotify/${query}`)
    .then(response => {
        this.setState({
          tracks: response.data.body.tracks.items
        });  
    })
    .catch(function (error) {
      console.log('Error fetching and parsing Spotify data',  error);
    });
}

// Method to handle user login
handleLogin(username) {
  const cookies = new Cookies();
  cookies.set('username', username, { path: '/' });
  this.setState({
    isLogged: true,
    username: username
  })
}

// Method to handle user logout
handleLogout(username) {
  cookies.remove('username');
  this.setState({
    isLogged: false,
    username: ""
  })
}

render() {
  const isLogged = this.state.isLogged;
  let logoutButton;

  if (isLogged) {
    logoutButton = <Button onClick={this.handleLogout} className="btn-default btn btn-logout" type="submit">Logout</Button>  
  }

  return (
      <div id="MainContainer" className='main-container container'>
        <Header username={this.state.username} isLogged={this.state.isLogged}/>
        {logoutButton}
        <main className="main-content">
          {isLogged ? (
              <div>
                <SearchForm onSearch={this.performSearch} />
                <ResultList searchText={this.state.searchText} gifs={this.state.gifs} tracks={this.state.tracks} />
            </div>
          ) : 
          (
            <Login handleLogin={this.handleLogin}/>
            )}
          </main>
        <Footer />
      </div>
  );
}
}

export default App;
