import React from 'react';

const TrackResult = props => {
    return(
        <li className="track-list__item col-md-4">
            <h1 className="track-list__item-heading track-title">
                {props.trackTitle}<br />
                <small className="track-list__item-heading--small artist-name">{props.artistName}</small>
            </h1>
            <audio className="track-list__item-player track-preview" src={props.url} controls loop>
                Votre navigateur ne supporte pas l'élément <code>audio</code>.
            </audio>
        </li>
    );    
};

export default TrackResult;