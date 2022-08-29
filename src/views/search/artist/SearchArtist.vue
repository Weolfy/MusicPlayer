<template>
    <SearchArtistResult/>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router';

import SearchArtistResult from '@/layout/content/main/searchresult/SearchArtistResult.vue'

import { searchArtist } from '@/network/search';

const store = useStore();
const route = useRoute();

onMounted(() => {
    searchArtist(route.params.keywords as string).then((res: any) => {
        // console.log(res);
        store.commit('searchArtist/setArtistResult', res.result.artists);
        store.commit('searchArtist/setArtistCount', res.result.artistCount);
        store.state.searchArtist.searchState = !store.state.searchArtist.searchState;
    })
    
});
</script>

<style scoped lang='scss'>

</style>