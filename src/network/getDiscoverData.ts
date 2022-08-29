import { request } from "./request"

// 个性推荐选项卡
export function getBanners(type: number):any {
    return request({
        method: 'post',
        url: '/banner',
        params: {
            type,
        }
    })
}

export function getRecommendSonglist(limit: number):any {
    return request({
        method: 'post',
        url: '/personalized',
        params: {
            limit,
        }
    })
}

export function getRecommendProgram():any {
    return request({
        method: 'post',
        url: '/program/recommend',
    })
}

export function getPrivateContent():any {
    return request({
        method: 'post',
        url: '/personalized/privatecontent',
    })
}

export function getNewMusic():any {
    return request({
        method: 'post',
        url: '/personalized/newsong',
    })
}

export function getRecommendMv():any {
    return request({
        method: 'post',
        url: '/personalized/mv',
    })
}

// 歌单选项卡
export function getCateList():any {
    return request({
        method: 'post',
        url: '/playlist/catlist',
    })
};

export function getHotCate():any {
    return request({
        method: 'post',
        url: '/playlist/hot',
    })
};

export function getHqTags():any {
    return request({
        method: 'post',
        url: '/playlist/highquality/tags',
    })
};

export function getHqList(cat: string, limit: number=20, before?: number):any {
    return request({
        method: 'post',
        url: '/top/playlist/highquality',
        params: {
            cat,
            limit,
            before,
        }
    })
};

export function getTopSongList(cat: string, limit: number=20, offset:number = 0):any {
    return request({
        method: 'post',
        url: '/top/playlist',
        params: {
            cat,
            limit,
            offset,
        }
    })
}

// 排行榜选项卡
export function getAllRank():any {
    return request({
        method: 'post',
        url: '/toplist',
    })
};

// 歌手选项卡
export function getArtist(limit: number=30, 
    offset:number=0,
    initial:string,
    type: number,
    area: number,
    ):any {
    return request({
        method: 'post',
        url: '/artist/list',
        params: {
            limit,
            offset,
            initial,
            type,
            area
        }
    })
}

