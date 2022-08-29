<template>
    <div class="oRankLayout">
        <div class="oRankCover" @click="goSongListDetail(rankId)">
            <img :src="rankCover" alt="官方榜单封面">
        </div>
        <div class="topFive">
            <ul class="topFiveList">
                <li class="topFiveSong" v-for="(song,index) in topFiveData" :key="song.id" @dblclick="clickToPlay(song)">
                    <div class="rank">
                        {{index + 1}}
                    </div>
                    <div class="hot">
                        -
                    </div>
                    <div class="name">
                        {{song.name}}
                    </div>
                    <div class="artists">
                        <div v-if="song.ar.length > 1">
                            <span v-for="(a,index) in song.ar" :key="a.id">
                                <span class="artist" :title="a.name">{{a.name}}</span>
                                <span v-if="index+1 !== song.ar.length">
                                &nbsp;/&nbsp;
                                </span>
                            </span>
                        </div>
                        <span v-else class="artist" :title="song.ar[0].name">
                            {{song.ar[0].name}}
                        </span>
                    </div>
                </li>
            </ul>
            <div class="seeAll" @click="goSongListDetail(rankId)">
                查看全部 ＞
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import {useStore} from '@/store'

import { getSongListSongs } from '@/network/getDetail'
import { getSongUrl } from '@/network/play'

const router = useRouter();
const store = useStore();
const props = defineProps(['rankCover', 'rankId', 'rankType']);
const {rankId} = toRefs(props);

let topFiveData:any = ref([])

onMounted(() => {
    getSongListSongs(rankId?.value).then((res:any) => {
        topFiveData.value = res.songs.slice(0,5);
    })
});

const goSongListDetail = (id:number) => {
    router.push('/detail/songlist/'+ id);
}

const clickToPlay = (song:any) => {
    getSongUrl(song.id).then((res: any) => {
        // console.log(res.data[0].url);
        let url = res.data[0].url
        store.commit('setCurrentUrl', url);
        store.commit('pushRecent', {
            id: song.id,
            title: song.name,
            artist: song.ar,
            type: '歌曲',
            time: +new Date(),
            url
        });
        store.commit('pushCurrentPlaylist', {
            id: song.id,
            title: song.name,
            artist: song.ar,
            from: '榜单',
            duration: song.dt,
            url
        });
        store.commit('setCurrentSongId', song.id);
    });
    
}
</script>

<style scoped lang='scss'>
.oRankLayout {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    .oRankCover {
        width: 160px;
        height: 160px;
        border-radius: 6px;
        overflow: hidden;
        cursor: pointer;
        img {
            width: 160px;
            height: 160px;
        }
    }
    .topFive {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        margin-left: 40px;
        .topFiveList {
            list-style: none;
            width: 490px;
            display: flex;
            flex-direction: column;
            cursor: default;
            .topFiveSong {
                height: 34px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                font-size: 12px;
                &:nth-of-type(odd) {
                    background-color: #f9f9f9;
                }
                &:nth-of-type(1) {
                    background-color: #efefef;
                    .rank {
                        color: red;
                    }
                }
                &:nth-of-type(2),
                &:nth-of-type(3) {
                    .rank {
                        color: red;
                    }
                }
                &:hover {
                    background-color: #efefef;
                }
                .rank {
                    width: 30px;
                }
                .hot {
                    width: 33px;
                    color: #959595;
                }
                .name {
                    margin-left: 10px;
                    width: 270px;
                    text-align: left;
                }
                .artists {
                    width: 136px;
                    text-align: right;
                    margin-right: 10px;
                    color: #959595;
                    .artist {
                        cursor: pointer;
                        &:hover {
                            color: #303030;
                        }
                    }
                }
            }
        }
        .seeAll {
            font-size: 12px;
            margin-left: 10px;
            cursor: pointer;
        }
    }
}
</style>