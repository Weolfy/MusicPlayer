<template>
    <div class="title">
        推荐MV
    </div>
    <ul class="privateul">
        <li class="item" v-for="item in dataList" :key="item.id">
            <div class="cover" @click="showVideoPlayer(item.id)">
                <img :src="item.picUrl" alt="mv封面">
            </div>
            <div class="name" @click="showVideoPlayer(item.id)">
                {{item.name}}
            </div>
            <div class="artist" @click="goArtistDetail(item.artists[0].id)">
                {{item.artistName}}
            </div>
        </li>
    </ul>
    <div class="playerComp">
        <VideoPlayer :videoUrl="currentUrl"
        @close="hideVideoPlayer"
        v-if="isPlayerShow"
        />
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import {useRouter} from 'vue-router'

import { getMvUrl } from '@/network/play'

import VideoPlayer from '@/components/content/videoplayer/VideoPlayer.vue'
const props = defineProps(['dataList']);
const router = useRouter();

let isPlayerShow = ref(false);
let currentUrl = ref('');

const showVideoPlayer = (id:number) => {
    getMvUrl(id).then((res:any) => {
        // console.log(res);
        currentUrl.value = res.data.url;
    })
    isPlayerShow.value = true;
}
const hideVideoPlayer = () => {
    isPlayerShow.value = false;
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
.privateul {
    list-style: none;
    color: #303030;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: 10px;
    flex-wrap: wrap;
    .item {
        width: 244px;
        .cover {
            position: relative;
            width: 244px;
            height: 136px;
            border-radius: 6px;
            overflow: hidden;
            cursor: pointer;
            img {
                width: 244px;
                height: 136px;
                // object-fit: cover;
            }
        }
        .name {
            width: auto;
            margin-top: 10px;
            font-size: 14px;
            text-align: left;
            cursor: pointer;
            &:hover {
                color: #000;
            }
        }
        .artist {
            margin-top: 5px;
            font-size: 11px;
            text-align: left;
            cursor: pointer;
            &:hover {
                color: #000;
            }
        }
    }
}
</style>