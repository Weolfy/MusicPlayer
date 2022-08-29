<template>
    <div class="title">
        最新音乐
    </div>
    <ul class="newmusicul">
        <li class="item" v-for="item in dataList" :key="item.id" @dblclick="clickToPlay(item)">
            <div class="cover" @click="clickToPlay(item)">
                <img v-lazy="item.picUrl" alt="封面">
            </div>
            <div class="info">
                <div class="name">
                    {{item.name}}
                </div>
                <div class="artists">
                    <div v-if="item.song.artists.length > 1">
                        <span v-for="(a,index) in item.song.artists" :key="a.id">
                            <span class="artist"
                            @click="goArtistDetail(a.id)" 
                            >
                                {{a.name}}
                            </span>
                            <span v-if="index+1 !== item.song.artists.length">
                            &nbsp;/&nbsp;
                            </span>
                        </span>
                    </div>
                    <span v-else class="artist" @click="goArtistDetail(item.song.artists[0].id)">
                        {{item.song.artists[0].name}}
                    </span>
                </div>
            </div>
        </li>
    </ul>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import {useRouter} from 'vue-router'
import { useStore } from '@/store'

import {getSongUrl} from '@/network/play';

const store = useStore();
const router = useRouter();

const props = defineProps(['dataList']);


const clickToPlay = (item: any) => {
    getSongUrl(item.id).then((res:any) => {
        let url = res.data[0].url;
        store.commit('setCurrentUrl', url);
        store.commit('pushRecent', {
            id: item.id,
            title: item.name,
            artist: item.song.artists,
            type: '歌曲',
            url
        });
        store.commit('pushCurrentPlaylist', {
            id: item.id,
            title: item.name,
            artist: item.song.artists,
            from: '发现',
            duration: item.song.duration,
            url
        });
        store.commit('setCurrentSongId', item.id);
    });
    
}

const goArtistDetail = (id: number) => {
    router.push('/detail/artist/'+ id);
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
.newmusicul {
    list-style: none;
    color: #303030;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    flex-wrap: wrap;
    cursor: default;
    .item {
        width: 240px;
        height: 48px;
        border-radius: 6px;
        margin-top: 20px;
        display: flex;
        justify-content: flex-start;
        &:hover {
            background-color: #eaeaea;
        }
        .cover {
            width: 48px;
            height: 48px;
            overflow: hidden;
            border-radius: 6px;
            cursor: pointer;
            img {
                width: 48px;
                height: 48px;
            }
        }
        .info {
            margin-left: 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: flex-start;
            text-align: left;
            .name {
                width: 180px;
                font-size: 13px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .artists {
                font-size: 11px;
                color: #8c8c8c;
                .artist {
                    cursor: pointer;
                    &:hover {
                        color: #303030;
                    }
                }
            }
        }
    }
}
</style>