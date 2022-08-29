<template>
    <SearchAlbumResult/>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router';

import SearchAlbumResult from '@/layout/content/main/searchresult/SearchAlbumResult.vue'

import { searchAlbum } from '@/network/search';

const store = useStore();
const route = useRoute();

onMounted(() => {
    searchAlbum(route.params.keywords as string).then((res:any) => {
        // console.log(res);
        store.commit('searchAlbum/setAlbumResult', res.result.albums);
        store.commit('searchAlbum/setAlbumCount', res.result.albumCount);
        store.state.searchAlbum.searchState = !store.state.searchAlbum.searchState;
    })
})

</script>

<style scoped lang='scss'>

</style>