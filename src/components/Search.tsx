import React, {Component} from 'react';
import axios from 'axios'
import {inject} from "mobx-react";

@inject('rootStore')
class Search extends Component {
    search(searchValue: string) {
        // @ts-ignore
        const {MainStore} = this.props.rootStore;
        MainStore.searchRequest();
        axios(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
            .then(jsonResponse => {
                if (jsonResponse.data.Response === 'True') {
                    console.log(jsonResponse.data.Search);
                    MainStore.searchSuccess(jsonResponse.data.Search);
                } else {
                    MainStore.searchFailure(jsonResponse.data.Error);
                }
            });
    };

    handleSearchInputChanges = (e: any) => {
        // @ts-ignore
        const {SearchStore} = this.props.rootStore;
        SearchStore.setSearchValue(e.target.value);
    };

    callSearchFunction = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // @ts-ignore
        const {searchValue} = this.props.rootStore.SearchStore;
        this.search(searchValue);
    };

    render() {
        return (
            <form className='search'>
                <input
                    onChange={this.handleSearchInputChanges}
                    type='text'
                />
                <input
                    onClick={this.callSearchFunction}
                    type='submit'
                    value='SEARCH'
                />
            </form>
        )
    }
}

export default Search;