import React from 'react';
import {DEFAULT_PLACEHOLDER_IMAGE} from '../constants/api'

const Movie = ({movie}: {
    movie: {
        Title: string;
        Poster: string;
        Year: string;
    }
}) => {
    const {Poster, Title, Year} = movie;
    const poster = Poster === 'N/A' ? DEFAULT_PLACEHOLDER_IMAGE : Poster;
    return (
        <div className='movie'>
            <h2>{Title}</h2>
            <div>
                <img
                    width='200'
                    alt={`The movie titled: ${Title}`}
                    src={poster}
                />
            </div>
            <p>({Year})</p>
        </div>
    )
};

export default Movie;