<template>
    <div class="songlistLayout">
        <div class="tabbar">
            <CommonTabBar :tabList="tabs"/>
        </div>
        <div class="hqbar"  v-if="showHqBar" v-loading="isLoading" @click="goSongListDetail(hqbarId)">
            <div class="cover">
                <img :src="coverUrl" alt="封面">
            </div>
            <div class="info">
                <div class="icon">精品歌单</div>
                <div class="name">
                    {{hqbarName}}
                </div>
            </div>
            <div class="background">
                <img :src="coverUrl" alt="">
            </div>
        </div>
        <div class="tags">
            <TagChooser :hotTags="hotTags" @tagChanged="tagChanged"></TagChooser>
        </div>
        <div class="songlist" v-loading="isLoading">
            <SongListUl :dataList="songlistData"/>
            <Pagination :pagerCount="9"
            :pageSize="20"
            :totalCount="songlistCount"
            @pageChange="pageChange"
            ref="pagi"
            />
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted, computed } from 'vue'
import {useRouter} from 'vue-router'
import { useStore } from '@/store'

import { getCateList,
        getHotCate,
        getHqList,
        getHqTags,
        getTopSongList
        } from '@/network/getDiscoverData'

import CommonTabBar from '@/components/common/commontabbar/CommonTabBar.vue'
import TagChooser from './tagchooser/TagChooser.vue'
import SongListUl from './songlistul/SongListUl.vue'
import Pagination from '@/components/common/pagination/Pagination.vue'


import axios from 'axios'

const router = useRouter();
const store = useStore();
const tabs = computed(() => {
    return store.getters['getDiscoverTabs'];
});

let currentTag = ref('日语');
let coverUrl = ref('');
let hqbarName = ref('');
let hqbarId = ref(0);
let hotTags = ref([]);
let hqTags = ref([]);
let showHqBar = ref(true);

let songlistData = ref([]);
let songlistCount = ref(0);
let songlistPerPage = ref(20);

const pagi = ref();

let isLoading = ref(true);

onMounted(() => {
    axios.all([
        getCateList(),
        getHotCate(),
        getHqTags(),
        getHqList('日语', 10),
        getTopSongList(currentTag.value,songlistPerPage.value),
    ]).then(axios.spread((cres, hcres, hqtres, hqres, slres) => {
        coverUrl.value = hqres.playlists[0].coverImgUrl;
        hqbarName.value = hqres.playlists[0].name;
        hqbarId.value = hqres.playlists[0].id;
        hotTags.value = hcres.tags;
        hqTags.value = hqtres.tags;
        // console.log(slres);
        songlistData.value = slres.playlists;
        songlistCount.value = slres.total;
        isLoading.value = false;
    }))
});

// 选中标签发生变化时的事件
const tagChanged = (tag: string) => {
    pagi.value.resetPage();
    isLoading.value = true;
    currentTag.value = tag;
    showHqBar.value = judgeHqTags(hqTags.value);
    if(judgeHqTags(hqTags.value)) {
        getHqList(currentTag.value, 10).then((res:any) => {
            coverUrl.value = res.playlists[0].coverImgUrl;
            hqbarName.value = res.playlists[0].name;
            hqbarId.value = res.playlists[0].id;
        });
    }
    getTopSongList(currentTag.value,songlistPerPage.value).then((slres:any) => {
        // console.log(slres);
        songlistData.value = slres.playlists;
        isLoading.value = false;
    })
    
};

// 判断该标签是否有精品歌单
const judgeHqTags = (tags: Array<any>):boolean => {
    let res = tags.some((tag) => {
        return tag.name == currentTag.value;
    });
    return res;
};

// 选页发生变化的事件
const pageChange = (currentPage:number) => {
    isLoading.value = true;
    let offset = (currentPage-1) * songlistPerPage.value;
    getTopSongList(currentTag.value,songlistPerPage.value,offset).then((slres:any) => {
        // console.log(slres);
        songlistData.value = slres.playlists;
        isLoading.value = false;
    })
}

// 跳转详情页
const goSongListDetail = (id:number) => {
    router.push('/detail/songlist/'+ id);
}
</script>

<style scoped lang='scss'>
.songlistLayout {
    display: flex;
    flex-direction: column;
    align-items: center;
    .tabbar {
        margin-top: 15px;
    }
    .hqbar {
        position: relative;
        width: 740px;
        height: 170px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-radius: 6px;
        background-color: transparent;
        overflow: hidden;
        z-index: 10;
        cursor: pointer;
        .background {
            position: absolute;
            width: 740px;
            height: 170px;
            border-radius: 6px;
            overflow: hidden;
            top: 0;
            left: 0;
            z-index: 9;
            filter: blur(6px);
        }
        .cover {
            margin-left: 15px;
            width: 142px;
            height: 142px;
            border-radius: 6px;
            overflow: hidden;
            z-index: 99;
            img {
                width: 142px;
                height: 142px;
            }
        }
        .info {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            margin-left: 10px;
            height: 80px;
            z-index: 99;
            .icon {
                width: 90px;
                height: 30px;
                line-height: 30px;
                border: 1px solid #e7aa5a;
                border-radius: 15px;
                color: #e7aa5a;
            }
            .name {
                font-size: 16px;
                color: #fff
            }
        }
    }
    .tags {
        margin-top: 15px;
        width: 740px;
    }
    .songlist {
        width: 740px;
    }
}

:deep(.el-loading-spinner .path) { 
    stroke: #ec4141;
}
</style>