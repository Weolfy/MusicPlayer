import { InjectionKey } from 'vue'
import {createStore, useStore as baseUseStore, Store} from 'vuex'
import { searchTab, discoverTab, videoTab } from './types/index';

import { saState, searchArtist } from './modules/searchArtist';
import { salState, searchAlbum } from './modules/searchAlbum';
import { sslState, searchSonglist } from './modules/searchSonglist';
import { svState, searchVideo } from './modules/searchVideo';
import { srState, searchRadio } from './modules/searchRadio';

export interface State {
    tabList: Array<searchTab>,
    discoverTabList: Array<discoverTab>,
    videoTabList: Array<videoTab>,
    songResult: Array<Object>,
    songCount: number,
    currentUrl: string,
    currentSongId: number,
    currentPlaylist: Array<Object>,
    searchStatus: boolean,
    albumCollection: Array<Object>,
    artistCollection: Array<Object>,
    myFavourite: Array<Object>,
    recent: Array<Object>
};

// 集成所有vuexState
export interface AllStateTypes extends State {
    searchArtist: saState,
    searchAlbum: salState,
    searchSonglist: sslState,
    searchVideo: svState,
    searchRadio: srState,
}


export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
    state: {
        tabList: [
            {
                title: '单曲',
                path: '/song/'
            },
            {
                title: '歌手',
                path: '/artist/'
            },
            {
                title: '专辑',
                path: '/album/'
            },
            {
                title: '视频',
                path: '/video/'
            },
            {
                title: '歌单',
                path: '/songlist/'
            },
            {
                title: '电台',
                path: '/radio/'
            },
        ],
        discoverTabList: [
            {
                title: '个性推荐',
                path: '/recommend'
            },
            {
                title: '歌单',
                path: '/songlist'
            },
            {
                title: '排行榜',
                path: '/rank'
            },
            {
                title: '歌手',
                path: '/artist'
            },

        ],
        videoTabList: [
            {
                title: '视频',
                path: '/index'
            },
            {
                title: 'MV',
                path: '/mv'
            },
        ],
        songResult: [],
        songCount: 0,
        currentUrl: '',
        currentSongId: 0,
        currentPlaylist: [],
        searchStatus: false,
        albumCollection: [],
        artistCollection: [],
        myFavourite: [],
        recent: []
    },
    mutations: {
        setSongResult: (state: State, payload) => {
            state.songResult = payload;
        },
        setCurrentUrl: (state: State, payload) => {
            state.currentUrl = payload;
        },
        setCurrentSongId: (state: State, payload) => {
            state.currentSongId = payload;
        },
        changeStatus: (state:State) => {
            state.searchStatus = !state.searchStatus;
        },
        setSongCount: (state:State, payload) => {
            state.songCount = payload
        },
        pushAlbumCollection: (state:State, payload) => {
            state.albumCollection.push(payload);
        },
        pushArtistCollection: (state:State, payload) => {
            state.artistCollection.push(payload);
        },
        pushFav: (state:State, payload) => {
            state.myFavourite.push(payload);
        },
        pushRecent: (state:State, payload) => {
            state.recent.unshift(payload)
        },
        deleteAlbumCollection: (state:State, payload) => {
            state.albumCollection = state.albumCollection.filter((item:any) => {
                return item.id != payload;
            });
        },
        deleteArtistCollection: (state:State, payload) => {
            state.artistCollection = state.artistCollection.filter((item:any) => {
                return item.id != payload;
            })
        },
        removeFav: (state:State, payload) => {
            state.myFavourite = state.myFavourite.filter((item:any) => {
                return item.id != payload;
            })
        },
        pushCurrentPlaylist: (state:State, payload) => {
            if (state.currentPlaylist.length === 0) {
                state.currentPlaylist.push(payload);
            }else {
                let currentSong = state.currentPlaylist.filter((item:any) => {
                    return item.id == state.currentSongId;
                });
                let index =  state.currentPlaylist.indexOf(currentSong[0]);
                let isRe = state.currentPlaylist.some((item:any) => {
                    return item.id == payload.id;
                });
                if(!isRe) {
                    state.currentPlaylist.splice(index+1, 0, payload);
                }
            }
        },
        pushCurrentPlaylistOrder: (state: State, payload) => {
            if (state.currentPlaylist.length === 0) {
                state.currentPlaylist.push(payload);
            }else {
                let isRe = state.currentPlaylist.some((item:any) => {
                    return item.id == payload.id;
                });
                if(!isRe) {
                    state.currentPlaylist.push(payload);
                }
            }
        },
        deleteFromPlaylist: (state: State, payload) => {
            state.currentPlaylist = state.currentPlaylist.filter((song:any) => {
                return song.id != payload;
            });
        },
        clearPlaylist: (state:State) => {
            state.currentPlaylist.length = 0;
        }
    },
    actions: {

    },
    getters: {
        getTabList: (state:State) => {
            return state.tabList;
        },
        getSongResult: (state:State) => {
            return state.songResult;
        },
        getCurrentUrl: (state:State) => {
            return state.currentUrl;
        },
        getCurrentSongId: (state: State) => {
            return state.currentSongId;
        },
        getSongCount: (state:State) => {
            return state.songCount;
        },
        getDiscoverTabs: (state:State) => {
            return state.discoverTabList;
        },
        getVideoTabs: (state:State) => {
            return state.videoTabList;
        },
        getRecent: (state:State) => {
            return state.recent;
        },
        getAlbumCollection: (state:State) => {
            return state.albumCollection;
        },
        getArtistCollection: (state:State) => {
            return state.artistCollection;
        },
        getFav: (state:State) => {
            return state.myFavourite;
        },
        getCurrentPlaylist: (state:State) => {
            return state.currentPlaylist;
        },
    },
    modules: {
        searchAlbum,
        searchArtist,
        searchSonglist,
        searchRadio,
        searchVideo
    }
});

export function useStore<T = AllStateTypes>() {
    return baseUseStore<T>(key)
}