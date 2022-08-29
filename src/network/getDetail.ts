import { request } from "./request";

// 歌手详情
export function getArtistSong(id: number|string):any {
    return request({
        method: 'post',
        url: '/artists',
        params: {
            id
        }
    })
};
export function getArtistMv(id: number|string):any {
    return request({
        method: 'post',
        url: '/artist/mv',
        params: {
            id
        }
    })
};
export function getArtistAlbum(id: number|string, limit: number=10):any {
    return request({
        method: 'post',
        url: '/artist/album',
        params: {
            id,
            limit
        }
    })
};
export function getArtistDesc(id: number|string):any {
    return request({
        method: 'post',
        url: '/artist/desc',
        params: {
            id
        }
    })
};

// 专辑详情
export function getAlbumDetail(id: number|string ):any {
    return request({
        method: 'post',
        url: '/album',
        params: {
            id
        }
    })
}
// 歌单详情
export function getSongListDetail(id: number|string):any {
    return request({
        method: 'post',
        url: '/playlist/detail',
        params: {
            id
        }
    })
}

export function getSongListSongs(id: number|string):any {
    return request({
        method: 'post',
        url: '/playlist/track/all',
        params: {
            id
        }
    })
}
// 电台详情
export function getRadioDetail(rid: number|string):any {
    return request({
        method: 'post',
        url: '/dj/detail',
        params: {
            rid
        }
    })
}

export function getRadioSongs(rid: number|string, limit: number=10, offset: number=0):any {
    return request({
        method: 'post',
        url: '/dj/program',
        params: {
            rid,
            limit,
            offset
        }
    })
}

export function getProgramDetail(id: number|string):any {
    return request({
        method: 'post',
        url: '/dj/program/detail',
        params: {
            id
        }
    })
}

// 获取歌词
export function getSongLyrics(id: number|string):any {
    return request({
        method: 'post',
        url: '/lyric',
        params: {
            id
        }
    })
}