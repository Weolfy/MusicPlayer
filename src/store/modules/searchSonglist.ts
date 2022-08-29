import {Module} from 'vuex'
import {State} from '../index'

export interface sslState {
    searchState: boolean,
    resultList: Array<Object>,
    songListCount: number,
}

export const searchSonglist: Module<sslState, State> = {
    namespaced: true,
    state: {
        searchState: false,
        resultList: [],
        songListCount: 0
    },
    mutations: {
        setSonglistResult: (state:sslState, payload) => {
            state.resultList = payload;
        },
        setSonglistCount: (state:sslState, payload) => {
            state.songListCount = payload;
        }
    },
    getters: {
        
    }
}