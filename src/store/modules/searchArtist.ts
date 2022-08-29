import {Module} from 'vuex'
import {State} from '../index'

export interface saState {
    searchState: boolean,
    resultList: Array<Object>,
    artistCount: number,
}

export const searchArtist: Module<saState, State> = {
    namespaced: true,
    state: {
        searchState: false,
        resultList: [],
        artistCount: 0,
    },
    mutations: {
        setArtistResult: (state: saState, payload) => {
            state.resultList = payload;
        },
        setArtistCount: (state: saState, payload) => {
            state.artistCount = payload
        }
    },
    getters: {
        getResultList: (state: saState) => {
            return state.resultList;
        }
    }
}