import {request} from './request'

// 获取评论
/* 
    参数：type
    0: 歌曲

    1: mv

    2: 歌单

    3: 专辑

    4: 电台

    5: 视频

*/

export function getHotComment(id: number | string, type: number, offset: number = 0):any {
    return request({
        method: 'post',
        url: '/comment/hot',
        params: {
            id,
            type,
            limit: 10,
            offset
        }
    })
};

export function getAllComment(id: number|string, type: number, pageNo: number
    , pageSize: number, sortType: number, cursor: number=0):any {
    return request({
        method: 'post',
        url: '/comment/new',
        params: {
            id,
            type,
            pageNo,
            pageSize,
            sortType,
            cursor
        }
    })
}