<template>
    <ul class="videoList">
        <li class="videoItem" v-for="video in dataList" :key="video.vid">
            <div class="videoCover" @click="itemClick(video.vid)">
                <div class="shadow"></div>
                <img :src="video.coverUrl" alt="视频封面">
                <span class="playCount">
                    {{filterPlayCount(video.playTime)}}
                </span>
                <span class="duration">
                    {{filterDuration(video.duration)}}
                </span>
            </div>
            <div class="videoTitle">
                {{video.title}}
            </div>
            <div class="videoUploader">
                by {{video.creator[0].userName}}
            </div>                
        </li>
    </ul>
    <div class="playerComp">
        <VideoPlayer :videoUrl="currentUrl" 
        v-if="isPlayerShow"
        @close="hideVideoMask"
        ></VideoPlayer>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, watch } from 'vue'
import { useStore } from '@/store'

import VideoPlayer from '@/components/content/videoplayer/VideoPlayer.vue';

import { getVideoUrl } from '@/network/play'

const store = useStore();
let isLoading = ref(false);
let isPlayerShow = ref(false);
let currentUrl = ref('');


interface videoItem {
    coverUrl: string,
    creator: Array<any>,
    duration: number,
    playTime: number,
    title: string,
    vid: number
}
let resultList:any = reactive([]);
const dataList:Array<videoItem> = reactive([]);
watch(() => store.state.searchVideo.searchState, () => {
    resultList = store.state.searchVideo.resultList;
    dataList.length = 0;
    for (let i = 0;i < resultList.length; i++) {
        dataList.push({
            vid: resultList[i].vid,
            coverUrl: resultList[i].coverUrl,
            creator: resultList[i].creator,
            duration: resultList[i].durationms,
            playTime: resultList[i].playTime,
            title: resultList[i].title
        });
    };
});

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

// 点击弹出播放遮罩 
const itemClick = (id: number) => {
    getVideoUrl(id).then((res:any) => {
        console.log(res);
        currentUrl.value = res.urls[0].url;
    });
    isPlayerShow.value = true;
};

// 隐藏播放遮罩
const hideVideoMask = () => {
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
            cursor: pointer;
            border-radius: 6px;
            overflow: hidden;
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
        }
        .videoUploader {
            text-align: left;
            color: #a5a5a5;
            font-size: 14px;
            margin-top: 2px;
        }
    }
}
</style>