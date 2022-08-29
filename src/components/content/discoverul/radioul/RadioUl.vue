<template>
    <div class="title">
        推荐电台
    </div>
    <ul class="radioul">
        <li class="item" v-for="item in dataList" :key="item.id" @dblclick="playProgram(item.id)">
            <div class="cover" @click="playProgram(item)">
                <img v-lazy="item.coverUrl" alt="封面">
            </div>
            <div class="info">
                <div class="name" :title="item.name">
                    {{item.name}}
                </div>
                <span class="type">
                    {{item.channels.length > 0? item.channels[0] : item.radio.category}}
                </span>
                <div class="other">
                    <div class="album" :title="item.radio.name">{{item.radio.name}}</div>
                    <div class="playCount">{{item.listenerCount}}</div>
                    <div class="duration">{{formatDuration(item.duration)}}</div>
                </div>
            </div>
        </li>
    </ul>
</template>

<script setup lang='ts'>
import { ref,reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '@/store';

import { getRadioSongs, getProgramDetail } from '@/network/getDetail';
import { getSongUrl } from '@/network/play';

const route = useRoute();
const router = useRouter();
const store = useStore();

const props = defineProps(['dataList']);

const formatDuration = (duration: string):string => {
    let time = new Date(duration);
    let min:(number|string) = time.getMinutes();
    min = min < 10 ? ('0'+min ): min;
    let second:(number|string) = time.getSeconds();
    second = second < 10 ? ('0'+second) : second;
    return min + ':' + second;
}

const getRealUrl = async(id: number) => {
    const programInfo = await getProgramDetail(id);
    const realSong = await getSongUrl(programInfo.program.mainSong.id);
    return realSong;
}

const playProgram = (program: any) => {
    getRealUrl(program.id).then((realSong: any) => {
        let realUrl = realSong.data[0].url;
        store.commit('setCurrentUrl', realUrl);
        store.commit('pushRecent', {
            id: realSong.data[0].id,
            title: program.name,
            artist: [{name:program.radio.name}],
            type: '电台',
            time: +new Date(),
        });
        store.commit('pushCurrentPlaylist', {
            id: realSong.data[0].id,
            title: program.name,
            artist: [{name:program.radio.name}],
            from: '电台',
            duration: program.duration,
            url: realUrl
        });
        store.commit('setCurrentSongId', realSong.data[0].id);
    });
}
</script>

<style scoped lang='scss'>
.title {
    color: #303030;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    &:hover {
        color: #000;
    }
}
.radioul {
    color: #303030;
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-content: space-between;
    flex-wrap: wrap;
    .item {
        width: 370px;
        height: 76px;
        border-radius: 5px;
        margin-top: 15px;
        display: flex;
        justify-content: flex-start;
        cursor: default;
        &:hover {
            background-color: #eaeaea;
        }
        .cover {
            width: 76px;
            height: 76px;
            border-radius: 5px;
            overflow: hidden;
            cursor: pointer;
            img {
                width: 76px;
                height: 76px;
            }
        }
        .info {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: flex-start;
            margin-left: 10px;
            .name {
                width: 275px;
                font-size: 13px;
                text-align: left;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .type {
                font-size: 10px;
                color: #8c8c8c;
                border: 1px solid #ccc;
                border-radius: 3px;
                padding: 0 3px;
            }
            .other {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                height: 16px;
                line-height: 16px;
                font-size: 11px;
                color: #8c8c8c;
                .album {
                    width: auto;
                    max-width: 80px;
                    text-align: left;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    cursor: pointer;
                    &:hover {
                        color: #303030;
                    }
                }
                .playCount {
                    margin-left: 10px;
                }
                .duration {
                    margin-left: 10px;
                }
            }
        }
    }
}
</style>