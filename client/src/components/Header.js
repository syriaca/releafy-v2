import React from 'react';

const Header = props => {
    const isLogged = props.isLogged;
    let welcomeText;
    
    if(isLogged){
        welcomeText= <h3>
            Hello {props.username}, make your search !
        </h3>
    } else {
        welcomeText= <h3>
            Create an account to access the app
        </h3>
    }
    
    return(
        <header className="header">
            <h1 className="header-heading">            
                <figure className="header-figure">
                    <img className="header-logo" src="images/logo.png" alt="Releafy logo" />      
                </figure>
                Releafy
            </h1>
            <h2 className="header-slogan">Giphy & Spotify query engine !</h2>
            {welcomeText}
        </header>
    );    
};

export default Header;