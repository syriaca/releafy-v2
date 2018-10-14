import React from 'react';

const Header = (props) => {
    return(
        <header className="header">
            <p>Hello {props.username}</p>
            <h1 className="header-heading">            
                <figure className="header-figure">
                    <img className="header-logo" src="images/logo.png" alt="Releafy logo" />      
                </figure>
                Releafy
            </h1>
            <p className="header-slogan">gifs & audio track for each release</p>
        </header>
    );    
};

export default Header;