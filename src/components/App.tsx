import React, {useEffect, useReducer} from 'react';
import '../App.css';
import Header from "./Header";
import Search from "./Search";
import Movie from "./Movie";
import axios from 'axios'

const MOVIE_API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=d424e613"; // you should replace this with yours

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null,
};

const reducer = (state: any, action: { type: string; payload?: any; error?: any; }) => {
  switch (action.type) {
    case 'SEARCH_MOVIES_REQUEST':
      return {
          ...state,
        loading: true,
        errorMessage: null,
      };
    case 'SEARCH_MOVIES_SUCCESS':
      return {
          ...state,
          loading: false,
          movies: action.payload,
      };
    case 'SEARCH_MOVIES_FAILURE':
      return {
          ...state,
        loading: false,
        errorMessage: action.error,
      };
    default:
      return state;
  }
};

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
      axios.get(MOVIE_API_URL)
        .then(jsonResponse => {
          dispatch({
              type: 'SEARCH_MOVIES_SUCCESS',
              payload: jsonResponse.data.Search,
          })
        })
  }, []);

  const search = (searchValue: string) => {
    dispatch({
      type: 'SEARCH_MOVIES_REQUEST',
    });

      axios(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
        .then(jsonResponse => {
            if (jsonResponse.data.Response === 'True') {
                dispatch({
                    type: 'SEARCH_MOVIES_SUCCESS',
                    payload: jsonResponse.data.Search,
                });
            } else {
                dispatch({
                    type: 'SEARCH_MOVIES_FAILURE',
                    payload: jsonResponse.data.Error,
                });
            }
        })
  };

  const {movies, errorMessage, loading} = state;

  return (
    <div className="App">
      <Header text='HOOKED' />
      <Search search={search} />
      <p className='App-intro'>Sharing a few of our favourite movies</p>
      <div className='movies'>
        {loading && !errorMessage ? (
            <span>loading...</span>
        ) : errorMessage ? (
            <div className='errorMessage'>{errorMessage}</div>
        ) : (
            movies ? movies.map((movie: { Title: any; }, index: any) => (
                <Movie key={`${index}-${movie.Title}`} movie={movie}/>
            )) : null
        )}
      </div>
    </div>
  );
};

export default App;
