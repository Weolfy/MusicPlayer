<template>
    <div id="title">搜索 <span>{{title}}</span></div><br>
    <div class="searchLayout">
        <SearchTabBar/>
        <div id="searchTable">
            <router-view></router-view>
        </div>
    </div> 
</template>

<script setup lang='ts'>
import { ref, reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import SearchSong from './song/SearchSong.vue'
import SearchTabBar from '@/layout/content/main/searchtabbar/SearchTabBar.vue';

const route = useRoute();
const router = useRouter();

let title = computed(() => {
    return route.params.keywords;
})

defineProps(['searchTitle'])
</script>

<style scoped lang='scss'>
.searchLayout {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
}
#title {
    color: rgb(41, 41, 41);
    float: left;
    font-size: 20px;
    font-weight: 800;
    margin-top: 20px;
    padding-left: 28px;
    span {
        font-weight: 600;
    }
}
#searchTable {
    width: 700px;
    height: 200px;
    // background-color: aqua;
}
</style>