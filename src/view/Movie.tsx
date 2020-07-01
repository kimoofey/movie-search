import React from 'react';
import {DEFAULT_PLACEHOLDER_IMAGE} from '../constants/api'
import {MovieType} from "../types/MovieTypes";

const Movie = (props: { movie: MovieType }) => {
    const {Poster, Title, Year} = props.movie;
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