import {SearchStoreInterface} from "./SearchStoreTypes";
import {MovieType} from "./MovieTypes";

export interface MainStoreInterface {
    loading: boolean;
    movies: MovieType[];
    errorMessage: string;
    searchRequest: () => void;
    searchSuccess: (movies: MovieType[]) => void;
    searchFailure: (errorMessage: string) => void;
}

export interface RootStoreInterface {
    MainStore: MainStoreInterface;
    SearchStore: SearchStoreInterface;
}