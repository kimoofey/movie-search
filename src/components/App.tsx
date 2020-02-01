import React, {Component} from 'react';
import '../App.css';
import Header from "../view/Header";
import Search from "./Search";
import Movie from "../view/Movie";
import {inject, observer} from "mobx-react";

@inject('rootStore')
@observer
class App extends Component {
    render() {
        // @ts-ignore
        const {rootStore} = this.props;
        return (
            <div className="App">
                <Header text='HOOKED'/>
                <Search/>
                <p className='App-intro'>Sharing a few of our favourite movies</p>
                <div className='movies'>
                    {rootStore.loading && !rootStore.errorMessage ? (
                        <span>loading...</span>
                    ) : rootStore.errorMessage ? (
                        <div className='errorMessage'>{rootStore.errorMessage}</div>
                    ) : (
                        // @ts-ignore
                        rootStore.movies ? rootStore.movies.map((movie, index) => (
                            <Movie key={`${index}-${movie.Title}`} movie={movie}/>
                        )) : null
                    )}
                </div>
            </div>
        )
    }
}

export default App;
