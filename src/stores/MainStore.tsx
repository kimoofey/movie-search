import {action, observable} from "mobx";

class MainStore {
    @observable loading: boolean;
    @observable movies: object[];
    @observable errorMessage: string;

    constructor() {
        this.loading = false;
        this.movies = [];
        this.errorMessage = '';
    }

    @action searchRequest() {
        this.loading = true;
        this.errorMessage = '';
    }

    @action searchSuccess(movies: object[]) {
        this.loading = false;
        this.movies = movies;
        console.log(this.movies);
    }

    @action searchFailure(errorMessage: string) {
        this.loading = false;
        this.errorMessage = errorMessage;
    }

}

export default MainStore;