<template>
    <div class="adLayout" v-loading="loading">
        <div class="artistInfo" >
            <div class="profile">
                <img :src="imgUrl" alt="歌手图片">
            </div>
            <div class="info">
                <div class="name">
                    {{arname}}
                </div>
                <span class="nickname">
                    {{nickname}}
                </span>
                <div class="button">
                    <div class="collect" @click="collectArtist" v-if="!isCollected">收藏</div>
                    <div class="collect" v-else @click="cancelCollection">已收藏</div>
                </div>
                <div class="count">
                    单曲数:{{songCount}}  &nbsp; 专辑数:{{alCount}}  &nbsp;  MV数:{{mvCount}}
                </div>
                <div class="desc">
                    简介：{{briefDesc}}
                </div>
            </div>
        </div>
        <div class="artistDetail">
            <div class="hotSong">
                <div class="title">热门50首</div>
                <SongTable :dataList="hotSongs"/>
            </div>
            <div class="hotAlbum">
                <div class="title">热门专辑</div>
                <AlbumUl :dataList="hotAlbums" />
            </div>
            <div class="hotMv">
                <div class="title">热门MV</div>
                <MvUl :dataList="hotMvs" />
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'

import axios from 'axios'

import { getArtistDetail } from '@/network/search'
import { getArtistSong, getArtistMv, getArtistAlbum, getArtistDesc } from '@/network/getDetail'


import SongTable from '@/components/content/songtable/SongTable.vue'
import AlbumUl from '@/components/content/albumul/AlbumUl.vue'
import MvUl from '@/components/content/mvul/MvUl.vue'

const route = useRoute();
const router = useRouter();
const store = useStore();

let imgUrl = ref('');
let arname = ref('');
let nickname = ref('');
let songCount = ref(0);
let mvCount = ref(0);
let alCount = ref(0)
let briefDesc = ref('');

let hotSongs = ref([]);
let hotAlbums = ref([]);
let hotMvs = ref([]);
let loading = ref(true);

onMounted(() => {
    axios.all([
        getArtistSong(route.params.id as string),
        getArtistMv(route.params.id as string),
        getArtistAlbum(route.params.id as string),
        // getArtistDesc(route.params.id as string)
    ]).then(axios.spread((songres, mvres, alres) => {
        // console.log(songres);
        // console.log(mvres);
        // console.log(alres);
        // console.log(descres);
        arname.value = songres.artist.name;
        nickname.value = songres.artist.alias[0];
        imgUrl.value = songres.artist.img1v1Url;
        songCount.value = songres.artist.musicSize;
        mvCount.value = songres.artist.mvSize;
        alCount.value = songres.artist.albumSize;
        briefDesc.value = songres.artist.briefDesc;
        hotSongs.value = songres.hotSongs;
        hotAlbums.value = alres.hotAlbums;
        hotMvs.value = mvres.mvs;
        loading.value = false;
    }))
});

watch(() => route.params.id, () => {
    if (route.meta.title != '歌手详情') return;
    loading.value = true;
    axios.all([
        getArtistSong(route.params.id as string),
        getArtistMv(route.params.id as string),
        getArtistAlbum(route.params.id as string),
    ]).then(axios.spread((songres, mvres, alres) => {
        arname.value = songres.artist.name;
        nickname.value = songres.artist.alias[0];
        imgUrl.value = songres.artist.img1v1Url;
        songCount.value = songres.artist.musicSize;
        mvCount.value = songres.artist.mvSize;
        alCount.value = songres.artist.albumSize;
        briefDesc.value = songres.artist.briefDesc;
        hotSongs.value = songres.hotSongs;
        hotAlbums.value = alres.hotAlbums;
        hotMvs.value = mvres.mvs;
        loading.value = false;
    }))
});

const collectArtist = () => {
    let artist = {
        id: route.params.id,
        name: arname.value,
        alias: nickname.value,
        avatar: imgUrl.value,
        albumCount: alCount.value,
        mvCount: mvCount.value,
    };
    store.commit('pushArtistCollection', artist);
    // console.log('complete');    
}

const isCollected = computed(() => {
    let collection = computed(() => {
        return store.getters['getArtistCollection']
    });
    let result = collection.value.some((item :any) => {
        return item.id == route.params.id;
    });
    return result;
});

const cancelCollection = () => {
    store.commit('deleteArtistCollection', route.params.id);
}
</script> 

<style scoped lang='scss'>
.adLayout {
    display: flex;
    flex-direction: column;
    align-items: center;
    .artistInfo {
        width: 690px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        margin-top: 30px;
        .profile {
            width: 184px;
            height: 184px;
            border-radius: 6px;
            overflow: hidden;
            img {
                width: 184px;
                height: 184px;
            }
        }
        .info {
            margin-left: 20px;
            width: 450px;
            height: auto;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            text-align: left;
            color: #303030;
            .name {
                font-size: 28px;
                font-weight: 600;
            }
            .nickname {
                margin-top: 20px;
            }
            .count {
                margin-top: 20px;
                font-size: 13px;
            }
            .desc {
                margin-top: 20px;
                font-size: 14px;
            }
            .button {
                margin-top: 10px;
                .collect {
                    width: 80px;
                    height: 30px;
                    border: 1px solid #d8d8d8;
                    border-radius: 15px;
                    text-align: center;
                    line-height: 30px;
                    font-size: 14px;
                    cursor: pointer;
                    &:hover {
                        background-color: #f2f2f2;
                    }
                }
            }
        }
    }
    .artistDetail {
        width: 690px;
        height: auto;
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        color: #303030;
        .hotSong {
            display: flex;
            flex-direction: column;
            .title {
                width: 100%;
                font-weight: 700;
                text-align: left;
            }
        }
        .hotAlbum {
            margin-top: 30px;
            display: flex;
            flex-direction: column;
            .title {
                width: 100%;
                font-weight: 700;
                text-align: left;
            }
        }
        .hotMv {
            margin-top: 30px;
            display: flex;
            flex-direction: column;
            .title {
                width: 100%;
                font-weight: 700;
                text-align: left;
            }
        }
    }
}

:deep(.el-loading-spinner .path) { 
    stroke: #ec4141;
}
</style>