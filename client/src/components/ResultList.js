import React from 'react';
import TrackResult from './TrackResult';
import GifResult from './GifResult';
import NoResults from './NoResults';
import Result from './Result';

const ResultList = props => {

    const trackResults = props.tracks.filter(audio => audio.preview_url != null);
    const gifResults = props.gifs;
    let track;
    let gif;
    let noResult = false;

    if (trackResults.length > 0 && gifResults.length > 0) {
        track = trackResults.map(audio =>
            <TrackResult url={audio.preview_url} key={audio.id} trackTitle={audio.name} artistName={audio.artists[0].name}/>
        );
        gif = gifResults.map(image => 
            <GifResult src={image.images.fixed_height.url} key={image.id} alt={image.title}/>
        );
    } else {
        noResult = true;
        if(noResult) {
            return <NoResults noResult={noResult}/>
        }
    }

    return(
        <div className="result-list">
            <Result track={track} gif={gif} />
        </div>
    );    
};

export default ResultList;