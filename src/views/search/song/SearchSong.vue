<template>
    <SearchSongResult :loading="isLoading"/>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue';
import { useStore } from '@/store';
import {useRoute} from 'vue-router';

import { searchSong } from '@/network/search';

import SearchSongResult from '@/layout/content/main/searchresult/SearchSongResult.vue';

const store = useStore();
const route = useRoute();
let isLoading = ref(false);

onMounted(() => {
    searchSong(route.params.keywords as string).then((res:any) => {
        isLoading.value = true;
        // console.log(res);
        store.commit('setSongResult', res.result.songs);
        store.commit('setSongCount', res.result.songCount);
        store.commit('changeStatus');
        isLoading.value = false;
    })
    
})

</script>

<style scoped lang='scss'>
    ul {
        list-style: none;
    }
</style>