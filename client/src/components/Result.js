import React from 'react';

const Result = props => {
    return(
        <section className="search-result">
            <ul className="gif-list search-result__list clearfix">
                {props.gif}
            </ul>
            <ul className="track-list search-result__list clearfix">
                {props.track}
            </ul>
        </section>
    );    
};

export default Result;