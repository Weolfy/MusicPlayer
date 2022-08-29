<template>
    <div class="songListLayout" v-loading="loading">
        <div class="songListInfo">
            <div class="slcover">
                <img :src="coverUrl" alt="歌单封面" @click="getImg">
            </div>
            <div class="info">
                <div class="slname">
                    {{slname}}
                </div>
                <div class="playinfo">
                    歌曲: {{songCount}}   
                </div>
            </div>
        </div>
        <div class="songListDetail">
            <div class="slsongs">
                <div class="title">
                    歌曲列表
                </div>
                <FavSongTable :dataList="slSongs"/>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted, onActivated, onUpdated, watch, computed } from 'vue'
import { useRoute, useRouter} from 'vue-router'
import { useStore } from '@/store'

import { getSongDetail } from '@/network/search'

import defaultImg from '@/assets/img/default.png'

import FavSongTable from './FavSongTable.vue'

const route = useRoute();
const router = useRouter();
const store = useStore();

let slname = ref('我喜欢的音乐');

let coverUrl = ref(defaultImg);
let slSongs = computed(() => {
    return store.getters['getFav'];
})
let songCount = computed(() => {
    return store.getters['getFav'].length;
})
let playCount = ref(0);

let loading = ref(false);

const formatPlayCount = (playCount: number) => {
    if (playCount < 100000) {
        return playCount;
    }else {
        return Math.floor(playCount / 10000) + '万';
    }
};

const getImg = () => {
    getSongDetail(slSongs.value[0].id as string).then((res:any) => {
        console.log(res);
    })
}
onUpdated(() => {
    if (slSongs.value.length != 0) {
        getSongDetail(slSongs.value[0].id as string).then((res:any) => {
            coverUrl.value = res.songs[0].al.picUrl;
        })
    }
});
onActivated(() => {
    if (slSongs.value.length != 0) {
        getSongDetail(slSongs.value[0].id as string).then((res:any) => {
            coverUrl.value = res.songs[0].al.picUrl;
        })
    }
});

const beforeRefresh = () => {
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('myFav', JSON.stringify(slSongs.value));
    });
    let favLocal = localStorage.getItem('myFav');
    if(favLocal) {
        let favList = JSON.parse(favLocal);
        if(favList.length > 0) {
            store.state.myFavourite = favList;
        }
    }
};
onMounted(() => {
    beforeRefresh();
    if (slSongs.value.length != 0) {
        getSongDetail(slSongs.value[0].id as string).then((res:any) => {
            coverUrl.value = res.songs[0].al.picUrl;
        })
    };
})
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
            
            .playinfo {
                margin-top: 10px;
                font-size: 14px;
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
    }
}
:deep(.el-loading-spinner .path) {
    stroke: #ec4141;
}
</style>