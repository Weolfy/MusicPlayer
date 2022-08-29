<template>
    <ul class="recentTable">
        <li class="tableItems" id="header">
            <div class="index">
                
            </div>
            <div class="type">
                类别
            </div>
            <div class="title">
                音乐标题
            </div>
            <div class="artists">
                歌手
            </div>
            <div class="playTime">
                播放时间
            </div>
        </li>
        <li class="tableItems" v-for="(item, index) in recentPlayList" :key="item.id" @dblclick="clickToPlay(item)">
            <div class="index">
                {{index < 10? '0'+(index+1) : (index+1)}}
            </div>
            <div class="type">
                <span>
                    {{item.type}}
                </span>
            </div>
            <div class="title">
                {{item.title}}
            </div>
            <div class="artists" @click="goArtistDetail(item.artist.id)">
                <div v-if="item.artist.length > 1">
                    <span v-for="(a,index) in item.artist" :key="a.id">
                        <span class="artist" :title="a.name">{{a.name}}</span>
                        <span v-if="index+1 !== item.artist.length">
                        &nbsp;/&nbsp;
                        </span>
                    </span>
                </div>
                <span v-else class="artist" :title="item.artist[0].name">
                    {{item.artist[0].name}}
                </span>
            </div>
            <div class="playTime">
                {{formatTime(currentDate - item.time)}}前
            </div>
        </li>
    </ul>
</template>

<script setup lang='ts'>
import { ref, reactive, computed, onUpdated, onMounted } from 'vue'
import {useRouter} from 'vue-router'
import { useStore } from '@/store'

import { getProgramDetail } from '@/network/getDetail'
import {getSongUrl} from '@/network/play'

const router = useRouter();
const store = useStore();

let recentPlayList = computed(() => {
    return store.getters['getRecent'];
});

const goArtistDetail = (id: number) => {
    router.push('/detail/artist/'+ id);
};

let currentDate = ref(0);
onMounted(() => {
    beforeRefresh();
    currentDate.value = +new Date();
});
onUpdated(() => {
    currentDate.value = +new Date();
});

const formatTime = (time: number) => {
    let realTime = new Date(time);
    let minutes = realTime.getMinutes();
    return minutes + '分钟';
}

const getRealUrl = async(id: number) => {
    const programInfo = await getProgramDetail(id);
    const realSong = await getSongUrl(programInfo.program.mainSong.id);
    return realSong;
}

const clickToPlay = (item:any) => {
    if (item.type == '歌曲') {
        getSongUrl(item.id).then((res: any) => {
            store.commit('setCurrentUrl', res.data[0].url)
        });
        store.commit('pushRecent', {
            id: item.id,
            title: item.title,
            artist: item.artist,
            type: item.type,
            time: +new Date(),
        });
    } else {
        getRealUrl(item.id).then((realSong: any) => {
            let realUrl = realSong.data[0].url;
            store.commit('setCurrentUrl', realUrl);
        });
        store.commit('pushRecent', {
            id: item.id,
            title: item.title,
            artist: '/',
            type: item.type,
            time: +new Date(),
        });
    }
}

// 解决刷新后数据丢失的问题
const beforeRefresh = () => {
    window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('recentPlay', JSON.stringify(recentPlayList.value));
    });
    let recentSession = sessionStorage.getItem('recentPlay');
    if(recentSession) {
        let recent = JSON.parse(recentSession);
        if (recent.length > 0) {
            store.state.recent = recent;
        }
    }
}
</script>

<style scoped lang='scss'>
.recentTable {
    list-style: none;
    display: flex;
    flex-direction: column;
    width: 100%;
    .tableItems {
        width: 100%;
        height: 35px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        text-align: left;
        color: #303030;
        font-size: 13px;
        &#header {
            color: #888888;
        }
        &:nth-of-type(even) {
            background-color: #f9f9f9;
        }
        &:hover:not(#header) {
            background-color: #f0f1f2;
        }
        .index {
            width: 50px;
            color: #969697;
        }
        .type {
            width: 60px;
        }
        .title {
            width: 320px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .artists {
            width: 250px;
            .artist {
                cursor: pointer;
                &:hover {
                    color: #000;
                }
            }
        }
        .playTime {
            color: #969697;
        }   
    }
}
</style>