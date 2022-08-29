import { request } from "./request"

// 获取电台banner
export function getRadioBanner():any {
    return request({
        method: 'post',
        url: '/dj/banner',
    })
}

// 获取电台分类
export function getRadioCategory():any {
    return request({
        method: 'post',
        url: '/dj/catelist',
    })
}

// 获取分类推荐电台
export function getRecommendRadio(type: number):any {
    return request({
        method: 'post',
        url: '/dj/recommend/type',
        params: {
            type,
        }
    })
}

// 获取类别热门电台
export function getCateHot(limit: number=30, offset: number=0, cateId: number|string): any {
    return request({
        method: 'post',
        url: '/dj/radio/hot',
        params: {
            limit, 
            offset, 
            cateId
        }
    })
}