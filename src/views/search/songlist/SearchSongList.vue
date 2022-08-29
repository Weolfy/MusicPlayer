<template>
    <SearchSonglistResult/>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import { useStore } from '@/store';
import { useRoute } from 'vue-router';

import SearchSonglistResult from '@/layout/content/main/searchresult/SearchSonglistResult.vue';

import { searchSonglist } from '@/network/search';

const store = useStore();
const route = useRoute();

onMounted(() => {
    searchSonglist(route.params.keywords as string).then((res:any) => {
        // console.log(res);
        store.commit('searchSonglist/setSonglistResult', res.result.playlists);
        store.commit('searchSonglist/setSonglistCount', res.result.playlistCount);
        store.state.searchSonglist.searchState = !store.state.searchSonglist.searchState;
    })
})
</script>

<style scoped lang='scss'>

</style>