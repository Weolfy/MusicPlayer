<template>
    <div class="recommendLayout">
        <div class="tabbar">
            <CommonTabBar :tabList="tabs"/>
        </div>
        <div class="carousel" v-loading="isLoading">
            <Carousel :bannerList="banners"/>
        </div>
        <div class="recommendList">
            <div class="songlist">
                <SongListUl :dataList="recommendSongList"></SongListUl>
            </div>
            <div class="radio">
                <RadioUl :dataList="recommendProgramList"/>
            </div>
            <div class="private">
                <PrivateUl :dataList="privateList" />
            </div>
            <div class="new">
                <NewMusicUl :dataList="newList" />
            </div>
            <div class="mv">
                <MvUl :dataList="mvList" />
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'

import { getBanners, 
        getRecommendSonglist, 
        getRecommendProgram,
        getPrivateContent,
        getNewMusic,
        getRecommendMv,
        } from '@/network/getDiscoverData'

import CommonTabBar from '@/components/common/commontabbar/CommonTabBar.vue'
import Carousel from '@/components/common/carousel/Carousel.vue'
import SongListUl from '@/components/content/discoverul/songlistul/SongListUl.vue'
import RadioUl from '@/components/content/discoverul/radioul/RadioUl.vue'
import PrivateUl from '@/components/content/discoverul/privateul/PrivateUl.vue'
import NewMusicUl from '@/components/content/discoverul/newmusicul/NewMusicUl.vue'
import MvUl from '@/components/content/discoverul/mvul/MvUl.vue'

const route = useRoute();
const router = useRouter();
const store = useStore();


const tabs = computed(() => {
    return store.getters['getDiscoverTabs'];
});
let banners = ref([]);
let isLoading = ref(true);
let recommendSongList = ref([]);
let recommendProgramList = ref([]);
let privateList = ref([]);
let newList = ref([]);
let mvList = ref([]);

onMounted(() => {
    getBanners(0).then((res:any) => {
        banners.value = res.banners;
        isLoading.value = false;
    });
    getRecommendSonglist(10).then((res:any) => {
        // console.log(res);
        recommendSongList.value = res.result;
    });
    getRecommendProgram().then((res:any) => {
        // console.log(res);
        recommendProgramList.value = res.programs.slice(0, 6);
    });
    getPrivateContent().then((res:any) => {
        privateList.value = res.result;
    });
    getNewMusic().then((res:any) => {
        newList.value = res.result;
    });
    getRecommendMv().then((res:any) => {
        mvList.value = res.result.slice(0,3);
    })
});

</script>

<style scoped lang='scss'>
.recommendLayout {
    display: flex;
    flex-direction: column;
    align-items: center;
    .tabbar {
        margin-top: 15px;
    }
    .carousel {
        width: 760px;
        margin-top: 20px;
    }
    .recommendList {
        width: 760px;
        margin-top: 0px;
        div {
            margin-top: 30px;
        }

    }
}

:deep(.el-loading-spinner .path) {
    stroke: #ec4141;
}
</style>