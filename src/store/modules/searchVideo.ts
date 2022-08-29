import {Module} from 'vuex'
import {State} from '../index'

export interface svState {
    searchState: boolean,
    resultList: Array<Object>,
    videoCount: number,
}

export const searchVideo: Module<svState, State> = {
    namespaced: true,
    state: {
        searchState: false,
        resultList: [],
        videoCount: 0
    },
    mutations: {
        setResultList: (state: svState, payload) => {
            state.resultList = payload;
        },
        setVideoCount: (state: svState, payload) => {
            state.videoCount = payload;
        }
    },
    getters: {
        
    }
}