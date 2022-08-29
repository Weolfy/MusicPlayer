<template>
    <div class="songListLayout" v-loading="loading">
        <div class="songListInfo">
            <div class="slcover">
                <img :src="coverUrl" alt="歌单封面">
            </div>
            <div class="info">
                <div class="slname">
                    {{slname}}
                </div>
                <div class="slcreator">
                    创建者: <img :src="creator.avatarUrl" alt="用户头像"> {{creator.nickname}}
                </div>
                <div class="createTime">
                    创建时间: {{formatDuration(createTime)}}
                </div>
                <div class="tags">
                    标签: {{formatTags(tags)}}
                </div>
                <div class="playinfo">
                    歌曲: {{songCount}}   播放: {{formatPlayCount(playCount)}}
                </div>
                <div class="briefdesc">
                    简介: {{desc}}
                </div>
            </div>
        </div>
        <div class="songListDetail">
            <div class="slsongs">
                <div class="title">
                    歌曲列表
                </div>
                <SongTable :dataList="slSongs"/>
            </div>

            <div class="slHotcomment">
                <CommentList commentTitle="热门评论" :commentData="slhotcomment"/>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRoute, useRouter} from 'vue-router'
import { useStore } from '@/store'

import axios from 'axios'

import { getSongListDetail, getSongListSongs } from '@/network/getDetail'
import { getHotComment } from '@/network/getComment'

import SongTable from '@/components/content/songtable/SongTable.vue'
import CommentList from '@/components/common/comment/CommentList.vue'


const route = useRoute();
const router = useRouter();
const store = useStore();

let slname = ref('');

let coverUrl = ref('');
let createTime = ref(0);
let creator:any = ref({});
let slSongs = ref([]);
let slhotcomment = ref([]);
let tags = ref([]);
let songCount = ref(0);
let playCount = ref(0);
let desc = ref('');


let loading = ref(true);

onMounted(() => {
    axios.all([
        getSongListDetail(route.params.id as string),
        getSongListSongs(route.params.id as string),
        getHotComment(route.params.id as string, 2)
    ]).then(axios.spread((dres, sres, cres) => {
        // console.log(dres);
        console.log(sres);
        slname.value = dres.playlist.name;
        coverUrl.value = dres.playlist.coverImgUrl;
        createTime.value = dres.playlist.createTime;
        creator.value = dres.playlist.creator;
        songCount.value = dres.playlist.trackCount;
        playCount.value = dres.playlist.playCount;
        desc.value = dres.playlist.description;
        tags.value = dres.playlist.tags;
        slSongs.value = sres.songs;
        slhotcomment.value = cres.hotComments;
        loading.value = false;
    }))
});

watch(() => route.params.id, () => {
    loading.value = true;
    axios.all([
        getSongListDetail(route.params.id as string),
        getSongListSongs(route.params.id as string),
        getHotComment(route.params.id as string, 2)
    ]).then(axios.spread((dres, sres, cres) => {
        // console.log(dres);
        console.log(sres);
        slname.value = dres.playlist.name;
        coverUrl.value = dres.playlist.coverImgUrl;
        createTime.value = dres.playlist.createTime;
        creator.value = dres.playlist.creator;
        songCount.value = dres.playlist.trackCount;
        playCount.value = dres.playlist.playCount;
        desc.value = dres.playlist.description;
        tags.value = dres.playlist.tags;
        slSongs.value = sres.songs;
        slhotcomment.value = cres.hotComments;
        loading.value = false;
    }))
})

const formatDuration = (timestamp: number|string):string=> {
    let time = new Date(timestamp);
    let year:(number|string) = time.getFullYear();
    let month:(number|string) = time.getMonth();
    month = month < 10 ? '0'+(month+1) : (month+1);
    let day:(number|string) = time.getDate();
    day = day < 10 ? '0'+day : day;
    return year+'-'+month+'-'+day;
};

const formatPlayCount = (playCount: number) => {
    if (playCount < 100000) {
        return playCount;
    }else {
        return Math.floor(playCount / 10000) + '万';
    }
};

const formatTags = (tags: Array<string>) => {
    return tags.join(' / ');
}
</script>

<style scoped lang='scss'>
.songListLayout {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #303030;
    .songListInfo {
        width: 690px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        margin-top: 30px;
        .slcover {
            width: 184px;
            height: 184px;
            overflow: hidden;
            border-radius: 6px;
            img {
                width: 184px;
                height: 184px;
            }
        }
        .info {
            width: 450px;
            margin-left: 20px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            text-align: left;
            .slname {
                font-size: 22px;
                font-weight: 600;
            }
            .slcreator {
                width: 150px;
                font-size: 14px;
                margin-top: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                img {
                    height: 24px;
                    width: 24px;
                    border-radius: 12px;
                }
            }
            .createTime {
                margin-top: 10px;
                font-size: 14px;
            }
            .tags {
                margin-top: 10px;
                font-size: 14px;
            }
            .playinfo {
                margin-top: 10px;
                font-size: 14px;
            }
            .briefdesc {
                margin-top: 10px;
                font-size: 14px;
                white-space: pre-line;
            }
        }
    }
    .songListDetail {
        display: flex;
        width: 690px;
        flex-direction: column;
        align-items: center;
        .slsongs {
            display: flex;
            flex-direction: column;
            width: 100%;
            margin-top: 30px;
            .title {
                width: 100%;
                font-weight: 700;
                text-align: left;
            }
        }
        .slHotcomment {
            display: flex;
            flex-direction: column;
            width: 100%;
            margin-top: 30px;

        }
    }
}
:deep(.el-loading-spinner .path) {
    stroke: #ec4141;
}
</style>