<template>
    <ul class="mvul">
        <li class="item" v-for="item in dataList" :key="item.id">
            <div class="cover" @click="showVideoPlayer(item.id)">
                <img v-lazy="item.cover" alt="mv封面">
            </div>
            <div class="name" :title="item.name" @click="showVideoPlayer(item.id)">
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
const router = useRouter();

const props = defineProps(['dataList']);

let isPlayerShow = ref(false);
let currentUrl = ref('');

const showVideoPlayer = (id:number) => {
    getMvUrl(id).then((res:any) => {
        console.log(res);
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
.mvul {
    list-style: none;
    color: #303030;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: 10px;
    flex-wrap: wrap;
    .item {
        width: 230px;
        margin-bottom: 15px;
        .cover {
            position: relative;
            width: 230px;
            height: 122px;
            border-radius: 6px;
            overflow: hidden;
            cursor: pointer;
            img {
                width: 230px;
                height: 122px;
                // object-fit: cover;
            }
        }
        .name {
            width: auto;
            margin-top: 10px;
            font-size: 14px;
            text-align: left;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
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