import React from 'react';

const Header = () => {
    return(
        <header className="header">
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