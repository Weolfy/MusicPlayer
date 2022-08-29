import {request} from './request'

export function searchSong(title: string, offset: number=0):any {
    return request({
        method: 'post',
        url: '/cloudsearch',
        params: {
            keywords: title,
            limit: 50,
            type: 1,
            offset: offset,
        }
    })
};

export function searchArtist(title: string, offset: number=0):any {
    return request({
        method: 'post',
        url: '/cloudsearch',
        params: {
            keywords: title,
            limit: 20,
            type: 100,
            offset: offset
        }
    })
};
export function searchAlbum(title: string, offset: number=0):any {
    return request({
        method: 'post',
        url: '/cloudsearch',
        params: {
            keywords: title,
            limit: 30,
            type: 10,
            offset: offset
        }
    })
};
export function searchSonglist(title: string, offset: number=0):any {
    return request({
        method: 'post',
        url: '/cloudsearch',
        params: {
            keywords: title,
            limit: 30,
            type: 1000,
            offset: offset
        }
    })
};
export function searchVideo(title: string, offset: number=0):any {
    return request({
        method: 'post',
        url: '/cloudsearch',
        params: {
            keywords: title,
            limit: 30,
            type: 1014,
            offset: offset
        }
    })
};
export function searchRadio(title: string, offset: number=0):any {
    return request({
        method: 'post',
        url: '/cloudsearch',
        params: {
            keywords: title,
            limit: 30,
            type: 1009,
            offset: offset
        }
    })
};

export function getSongDetail(id: number | string):any {
    return request({
        method: 'post',
        url: '/song/detail',
        params: {
            ids: id
        }
    })
};

export function getArtistDetail(id: number| string):any {
    return request({
        method: 'post',
        url: '/artist/detail',
        params: {
            id
        }
    })
};

// 搜索框信息相关
// 获取热搜榜
export function getHotSearch():any {
    return request({
        method: 'post',
        url: '/search/hot/detail',
    })
};
// 获取默认关键字
export function getDefaultKeywords():any {
    return request({
        method: 'post',
        url: '/search/default',
        params: {
            timestamp: +new Date(),
        }
    })
};
// 可能感兴趣
export function getInterest(keywords: string):any {
    return request({
        method: 'post',
        url: '/search/multimatch',
        params: {
            keywords
        }
    })
};
// 猜你想搜
export function getSuggest(keywords: string):any {
    return request({
        method: 'post',
        url: '/search/suggest',
        params: {
            keywords
        }
    })
};
export function getBriefSuggest(keywords: string, type: string = 'mobile'):any {
    return request({
        method: 'post',
        url: '/search/suggest',
        params: {
            keywords,
            type
        }
    })
};
