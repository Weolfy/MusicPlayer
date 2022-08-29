<template>
    <ul class="videoList">
        <li class="videoItem" v-for="video in dataList" :key="video.id">
            <div class="videoCover" @click="showVideoPlayer(video.id)">
                <div class="shadow"></div>
                <img :src="video.imgurl" alt="视频封面">
                <span class="playCount">
                    {{filterPlayCount(video.playCount)}}
                </span>
                <span class="duration">
                    {{filterDuration(video.duration)}}
                </span>
            </div>
            <div class="videoTitle" @click="showVideoPlayer(video.id)">
                {{video.name}}
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

import { getMvUrl } from '@/network/play'

import VideoPlayer from '@/components/content/videoplayer/VideoPlayer.vue'

defineProps(['dataList']);


const filterDuration = (duration: number|string) => {
    let time = new Date(duration);
    let min:(number|string) = time.getMinutes();
    min = min < 10 ? ('0'+min ): min;
    let second:(number|string) = time.getSeconds();
    second = second < 10 ? ('0'+second) : second;
    return min + ':' + second;
};

const filterPlayCount = (playCount: number) => {
    if (playCount < 100000) {
        return playCount;
    }else {
        return Math.round(playCount / 10000) + '万';
    }
}

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
</script>

<style scoped lang='scss'>
.videoList {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: space-between;
    .videoItem {
        flex: 1;
        display: flex;
        flex-direction: column;
        width: calc((100% - 15px) /3);
        margin-top: 5px;
        .videoCover {
            position: relative;
            width: 225px;
            height: 132px;
            // background-color: aqua;
            border-radius: 6px;
            overflow: hidden;
            cursor: pointer;
            .shadow {
                position: absolute;
                top: 0;
                width: 100%;
                height: 25px;
                background: linear-gradient(rgba(145, 145, 145, 0.6), transparent);
                z-index: 99;
            }
            img {
                width: 225px;
                height: 132px;
            }
            span {
                color: white;
                font-size: 13px;
                text-shadow: 1px 1px rgba(145, 145, 145, 0.6);
                &.playCount {
                    position: absolute;
                    top: 2px;
                    right: 5px;
                    z-index: 99999;
                }
                &.duration {
                    position: absolute;
                    bottom: 5px;
                    right: 5px;
                }
            }
        }
        .videoTitle {
            text-align: left;
            color: #303030;
            font-size: 14px;
            margin-top: 8px;
            cursor: pointer;
        }

    }
}
</style>