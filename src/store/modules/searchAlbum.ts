import {Module} from 'vuex'
import {State} from '../index'

export interface salState {
    searchState: boolean,
    resultList: Array<Object>,
    albumCount: number

}

export const searchAlbum: Module<salState, State> = {
    namespaced: true,
    state: {
        searchState:false,
        resultList: [],
        albumCount: 0
    },
    mutations: {
        setAlbumResult: (state:salState, payload) => {
            state.resultList = payload;
        },
        setAlbumCount: (state:salState, payload) => {
            state.albumCount = payload
        }
    },
    getters: {
        
    }
}