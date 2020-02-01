import React, {Component} from 'react';
import axios from 'axios'
import {action, observable} from "mobx";
import {inject} from "mobx-react";

@inject('rootStore')
class Search extends Component {

    @observable searchValue: string;

    constructor(props: any) {
        super(props);
        this.searchValue = '';
    }

    @action setSearchValue(value: string) {
        this.searchValue = value;
    }

    search(searchValue: string) {
        // @ts-ignore
        const {rootStore} = this.props;
        rootStore.searchRequest();

        axios(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
            .then(jsonResponse => {
                if (jsonResponse.data.Response === 'True') {
                    console.log(jsonResponse.data.Search);
                    rootStore.searchSuccess(jsonResponse.data.Search);
                } else {
                    rootStore.searchFailure(jsonResponse.data.Error);
                }
            });
    };

    handleSearchInputChanges = (e: any) => {
        this.setSearchValue(e.target.value);
    };

    callSearchFunction = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        this.search(this.searchValue);
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