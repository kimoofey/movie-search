import React, {Component} from 'react';
import '../App.css';
import Header from "../view/Header";
import Search from "./Search";
import Movie from "../view/Movie";
import {inject, observer} from "mobx-react";
import {MovieType} from "../types/MovieTypes";
import {InjectedProps} from "../types/AppPropsInterface";

@inject('rootStore')
@observer
class App extends Component {
    get injected() {
        return this.props as InjectedProps;
    }

    render() {
        const {loading, errorMessage, movies} = this.injected.rootStore.MainStore;
        return (
            <div className="App">
                <Header text='React & MobX'/>
                <Search/>
                <p className='App-intro'>Sharing a few of our favourite movies</p>
                <div className='movies'>
                    {loading && !errorMessage ? (
                        <p className='loading-msg'>loading...</p>
                    ) : errorMessage ? (
                        <div className='errorMessage'>{errorMessage}</div>
                    ) : (
                        movies ? movies.map((movie: MovieType, index: number) => (
                            <Movie key={`${index}-${movie.Title}`} movie={movie}/>
                        )) : null
                    )}
                </div>
            </div>
        )
    }
}

export default App;
