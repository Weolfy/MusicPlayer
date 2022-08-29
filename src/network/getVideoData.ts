import { request } from "./request"

// 获取视频分类标签
export function getVideoTags():any {
    return request({
        method: 'post',
        url: '/video/group/list',
    })
};
// 获取分类视频（需登录）
export function getVideos(id: number, offset:number=0):any {
    return request({
        method: 'post',
        url: '/video/group',
        params: {
            id,
            offset
        }
    })
};

// 获取全部MV
export function getAllMv(area:string, type:string, order:string, limit: number=30, offset:number=0):any {
    return request({
        method: 'post',
        url: '/mv/all',
        params: {
            area,
            type,
            order,
            limit,
            offset
        }
    })
};