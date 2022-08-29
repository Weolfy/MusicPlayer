<template>
    <div class="alLayout" v-loading="loading">
        <div class="albumInfo">
            <div class="alcover">
                <img :src="coverUrl" alt="专辑封面">
            </div>
            <div class="info">
                <div class="alname">
                    {{alname}}
                    <span class="desc" v-if="alalias">({{alalias}})</span>
                </div>
                <div class="alartist">
                    歌手: {{alartist}}
                </div>
                <div class="releaseTime">
                    时间: {{formatDuration(releaseTime)}}
                </div>
                <div class="button">
                    <div class="collect" @click="collectAlbum" v-if="!isCollected">收藏</div>
                    <div class="collect" v-else @click="cancelCollection">已收藏</div>
                </div>
            </div>
        </div>
        <div class="albumDetail">
            <div class="alsongs">
                <div class="title">
                    歌曲列表
                </div>
                <SongTable :dataList="alSongs"/>
            </div>

            <div class="alHotcomment">
                <CommentList commentTitle="热门评论" :commentData="alhotcomment"/>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter} from 'vue-router'
import { useStore } from '@/store'

import { getAlbumDetail } from '@/network/getDetail'
import { getHotComment } from '@/network/getComment'

import SongTable from '@/components/content/songtable/SongTable.vue'
import CommentList from '@/components/common/comment/CommentList.vue'


const route = useRoute();
const router = useRouter();
const store = useStore();

let alname = ref('');
let alalias = ref('');
let coverUrl = ref('');
let releaseTime = ref(0);
let alartist = ref();
let alartistId = ref(0);
let alSongs = ref([]);
let alhotcomment = ref([]);

let loading = ref(true);

onMounted(() => {
    getAlbumDetail(route.params.id as string).then((res:any) => {
        // console.log(res);
        alname.value = res.album.name;
        alalias.value = res.album.alias[0];
        coverUrl.value = res.album.picUrl;
        releaseTime.value = res.album.publishTime;
        alartist.value = res.album.artists[0].name;
        alartistId.value = res.album.artists[0].id;
        alSongs.value = res.songs;
        loading.value = false;
    });
    getHotComment(route.params.id as string, 3).then((res:any) => {
        // console.log(res);
        alhotcomment.value = res.hotComments;
    });
});

watch(() => route.params.id, () => {
    if (route.meta.title != '专辑详情') return;
    loading.value = true;
    getAlbumDetail(route.params.id as string).then((res:any) => {
        // console.log(res);
        alname.value = res.album.name;
        alalias.value = res.album.alias[0];
        coverUrl.value = res.album.picUrl;
        releaseTime.value = res.album.publishTime;
        alartist.value = res.album.artists[0].name;
        alartistId.value = res.album.artists[0].id;
        alSongs.value = res.songs;
        loading.value = false;
    });
    getHotComment(route.params.id as string, 3).then((res:any) => {
        // console.log(res);
        alhotcomment.value = res.hotComments;
    });
})

const formatDuration = (timestamp: number|string):string=> {
    let time = new Date(timestamp);
    let year:(number|string) = time.getFullYear();
    let month:(number|string) = time.getMonth();
    month = month < 10 ? '0'+(month+1) : (month+1);
    let day:(number|string) = time.getDate();
    day = day < 10 ? '0'+day : day;
    return year+'-'+month+'-'+day;
}

const collectAlbum = () => {
    let album = {
        id: route.params.id,
        name: alname.value,
        cover: coverUrl.value,
        artist: alartist.value,
        artistId: alartistId.value,
        count: alSongs.value.length
    };
    store.commit('pushAlbumCollection', album);
    // console.log('complete');    
}

const isCollected = computed(() => {
    let collection = computed(() => {
        return store.getters['getAlbumCollection']
    });
    let result = collection.value.some((item :any) => {
        return item.id == route.params.id;
    });
    return result;
});

const cancelCollection = () => {
    store.commit('deleteAlbumCollection', route.params.id);
}
</script>

<style scoped lang='scss'>
.alLayout {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #303030;
    .albumInfo {
        width: 690px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        margin-top: 30px;
        .alcover {
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
            .alname {
                font-size: 22px;
                font-weight: 600;
                .desc {
                    color: #9f9f9f
                }
            }
            .alartist {
                font-size: 14px;
                margin-top: 10px;
            }
            .releaseTime {
                margin-top: 10px;
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
    .albumDetail {
        display: flex;
        width: 690px;
        flex-direction: column;
        align-items: center;
        .alsongs {
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
        .alHotcomment {
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