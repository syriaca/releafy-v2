import React, { Component } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import SignUpOrSignIn from './components/SignUpOrSignIn';
import SearchForm from './components/SearchForm';
import ResultList from './components/ResultList';
import {giphyKey} from './Config.js';
import {Cookies} from 'react-cookie';
const cookies = new Cookies();

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gifs: [],
      tracks: [],
      searchText: '',
      username: cookies.get('username'),
      isLoggedIn: false      
    };

    this.handleLoggedStatus = this.handleLoggedStatus.bind(this);
}

componentDidMount() {
  // axios.get('/api/users/spotify')
  // .then(response => {
  //   console.log(response);
  //     this.setState({
  //       tracks: response.data.body.tracks.items
  //     });  
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });
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

  axios.get(`/api/users/spotify/${query}`)
    .then(response => {
        this.setState({
          tracks: response.data.body.tracks.items
        });  
    })
    .catch(function (error) {
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
