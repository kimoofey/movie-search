import {action, observable} from "mobx";

class SearchStore {
    @observable searchValue: string;

    constructor() {
        this.searchValue = '';
    }

    @action setSearchValue(value: string) {
        this.searchValue = value;
    }
}

export default SearchStore;