<template>
    <div class="detailPage">
        <div class="songInfo" v-loading="loading">
            <div class="icon">
                <img :src="album.picUrl" alt="歌曲封面" @click="clickToPlay">
            </div>
            <div class="info">
                <div class="title">
                    {{title}}
                </div>
                <span class="album">
                    专辑： {{album.name}}
                </span>
                <span class="artist">
                    歌手： {{allArtist}}
                </span>
            </div>
        </div>
        <div class="comment">
            <div class="hotComment">
                <CommentList commentTitle="热门评论" :commentData="commentList" v-loading="commentLoading"/>
            </div>
            <div class="latestComment">
                <CommentList commentTitle="最新评论" :commentData="newCommentList" v-loading="newCommentLoading"/>
                <Pagination :totalCount="commentCount" :pageSize="20" 
                :pagerCount="7"
                @pageChange="commentPageChange"
                />
            </div>
        </div>
    </div>
    
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRoute, useRouter} from 'vue-router'
import { useStore } from '@/store'

import CommentList from '@/components/common/comment/CommentList.vue'
import Pagination from '@/components/common/pagination/Pagination.vue'

import { getSongDetail } from '@/network/search'
import { getAllComment, getHotComment } from '@/network/getComment'
import {getSongUrl} from '@/network/play';



const route = useRoute();
const router = useRouter();
const store = useStore();


let title = ref('');
let artist = ref([]);
let album:any = ref({});
let allArtist = ref('');
let loading = ref(true);

const commentList = ref([]);
let commentLoading = ref(true);
const newCommentList = ref([]);
let newCommentLoading = ref(true);
let commentCount = ref(0);
let cursor = ref(0);

onMounted(() => {
    getSongDetail(route.params.id as string).then((res:any) => {
        // console.log(res);
        album.value = res.songs[0].al;
        artist.value = res.songs[0].ar;
        title.value = res.songs[0].name;
        allArtist.value = showArtist(artist.value);
        loading.value = false;
    });
    getHotComment(route.params.id as string, 0).then((res:any) => {
        // console.log(res);
        commentList.value = res.hotComments;
        // console.log(commentList.value);
        commentLoading.value = false;
    });
    getAllComment(route.params.id as string, 0,1,20,3).then((res:any) => {
        // console.log(res);
        newCommentList.value = res.data.comments;
        commentCount.value = res.data.totalCount;
        cursor.value = res.data.cursor;
        newCommentLoading.value = false;
    })
});

watch(() => route.params.id, () => {
    getSongDetail(route.params.id as string).then((res:any) => {
        // console.log(res);
        album.value = res.songs[0].al;
        artist.value = res.songs[0].ar;
        title.value = res.songs[0].name;
        allArtist.value = showArtist(artist.value);
        loading.value = false;
    });
    getHotComment(route.params.id as string, 0).then((res:any) => {
        // console.log(res);
        commentList.value = res.hotComments;
        // console.log(commentList.value);
        commentLoading.value = false;
    });
    getAllComment(route.params.id as string, 0,1,20,3).then((res:any) => {
        // console.log(res);
        newCommentList.value = res.data.comments;
        commentCount.value = res.data.totalCount;
        cursor.value = res.data.cursor;
        newCommentLoading.value = false;
    })
})

const showArtist = (ar: Array<any>) => {
    if (ar.length === 1) {
        return ar[0].name;
    } else if (ar.length > 1) {
        let artistArray = [];
        for (let i = 0;i<ar.length;i++) {
            artistArray.push(ar[i].name);
        };
        let artists = artistArray.join(' / ');
        return artists;
    } else {
        return 'null'
    }
};

const commentPageChange = (page: number) => {
    newCommentLoading.value = true;
    getAllComment(route.params.id as string, 0,page,20,3, cursor.value).then((res:any) => {
        console.log(res);
        newCommentList.value = res.data.comments;
        cursor.value = res.data.cursor;
        newCommentLoading.value = false;
    })
}

// 点击封面播放
const clickToPlay = () => {
    getSongUrl(route.params.id as string).then((res:any) => {
        const url = res.data[0].url;
        store.commit('setCurrentUrl', url);
    }) 
}
</script>

<style scoped lang='scss'>
.detailPage {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
.songInfo {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 30px;
    .icon {
        width: 70px;
        height: 70px;
        overflow: hidden;
        border-radius: 6px;
        img {
            width: 70px;
            height: 70px;
            cursor: pointer;
        }
    }
    .info {
        width: 600px;
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        text-align: left;
        color: #303030;
        .title {
            font-size: 22px;
        }
        span {
            font-size: 12px;
            &.album {
                margin-top: 5px;
            }
        }
    }
}
.comment {
    width: 690px;
    margin-top: 80px;
    // background-color: #ccc;
    .latestComment {
        margin-top: 60px;
    }
}
:deep(.el-loading-spinner .path) {
    stroke: #ec4141;
}
</style>