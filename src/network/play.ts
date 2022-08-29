import {request} from './request'

export function getSongUrl(id: number|string):any {
    return request({
        method: 'post',
        url: '/song/url',
        params: {
            id: id,
            realIP: '113.72.45.26'
        }
    })
}
export function getMvUrl(id: number):any {
    return request({
        method: 'post',
        url: '/mv/url',
        params: {
            id: id,
            realIP: '113.72.45.26'
        }
    })
}
export function getVideoUrl(id: number):any {
    return request({
        method: 'post',
        url: '/video/url',
        params: {
            id: id,
            realIP: '113.72.45.26'
        }
    })
}