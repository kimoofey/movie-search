import React, {Component} from 'react';
import axios from 'axios'
import {inject} from "mobx-react";
import {InjectedProps} from "../types/SearchPropsInterface";

@inject('rootStore')
class Search extends Component {
    get injected() {
        return this.props as InjectedProps;
    }

    search(searchValue: string) {
        const {MainStore} = this.injected.rootStore;
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
        const {SearchStore} = this.injected.rootStore;
        SearchStore.setSearchValue(e.target.value);
    };

    callSearchFunction = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const {searchValue} = this.injected.rootStore.SearchStore;
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