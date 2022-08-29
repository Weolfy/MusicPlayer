<template>
    <ul class="songlistList">
        <li class="songlistItem" v-for="songlist in dataList" :key="songlist.id">
            <div class="img">
                <img :src="songlist.imgUrl" alt="歌单封面">
            </div>
            <div class="title" @click="goSongListDetail(songlist.id)">
                {{songlist.name}}
            </div>
            <div class="trackCount">
                {{songlist.trackCount}}首
            </div>
            <div class="creator">
                by {{songlist.creator.nickname}}
            </div>
            <div class="playCount">
                播放量: {{filterPlayCount(songlist.playCount)}}
            </div>
        </li>
    </ul>
</template>

<script setup lang='ts'>
import { ref, reactive, watch } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

interface songListItem {
    bookCount: number,
    imgUrl: string,
    creator: any,
    description: string,
    id: number,
    name: string,
    playCount: number,
    trackCount: number,
};

let resultList: any = reactive([]);
const dataList: Array<songListItem> = reactive([]);
watch(() => store.state.searchSonglist.searchState, () => {
    resultList = store.state.searchSonglist.resultList;
    dataList.length = 0;
    for (let i = 0;i < resultList.length; i++) {
        dataList.push({
            bookCount: resultList[i].bookCount,
            imgUrl: resultList[i].coverImgUrl,
            creator: resultList[i].creator,
            description: resultList[i].description,
            id: resultList[i].id,
            name: resultList[i].name,
            playCount: resultList[i].playCount,
            trackCount: resultList[i].trackCount
        });
    };
});
const filterPlayCount = (count: number) => {
    if (count < 100000) {
        return count;
    }else {
        return Math.round(count/10000) + '万'
    }
};

const goSongListDetail = (id:number) => {
    router.push('/detail/songlist/'+ id);
}
</script>

<style scoped lang='scss'>
.songlistList {
    list-style: none;
    li:nth-of-type(even) {
        background-color: #f9f9f9;
    }
    li:hover {
        background-color: #f1f1f1;
    }
    .songlistItem {
        height: 80px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: #303030;
        .img {
            width: 60px;
            height: 60px;
            // background-color: red;
            overflow: hidden;
            border-radius: 6px;
            img {
                width: 60px;
                height: 60px;
            }
        }
        .title {
            width: 300px;
            margin-left: 10px;
            text-align: left;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            cursor: pointer;
        }
        .trackCount {
            color: #a5a5a5;
            font-size: 13px;
        }
        .creator {
            width: 150px;
            margin-left: 50px;
            font-size: 13px;
            color: #a5a5a5;
            text-align: left;
        }
        .playCount {
            font-size: 13px;
            color: #a5a5a5;
        }
    }
}
</style>