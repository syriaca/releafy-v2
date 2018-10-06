import React from 'react';

const GifResult = props => {
    return(
        <li className="gif-list__item col-md-4">
            <img className="gif-list__image img-responsive" src={props.src} alt={props.alt}/>
        </li>
    );    
};

export default GifResult;