import {Module} from 'vuex'
import {State} from '../index'

export interface srState {
    searchState: boolean,
    resultList: Array<Object>,
    radioCount: number
}

export const searchRadio: Module<srState, State> = {
    namespaced: true,
    state: {
        searchState: false,
        resultList: [],
        radioCount: 0
    },
    mutations: {
        setResultList: (state: srState, payload) => {
            state.resultList = payload;
        },
        setRadioCount: (state: srState, payload) => {
            state.radioCount = payload;
        }
    },
    getters: {
        
    }
}