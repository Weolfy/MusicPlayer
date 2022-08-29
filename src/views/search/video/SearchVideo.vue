<template>
    <SearchVideoResult/>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'

import SearchVideoResult from '@/layout/content/main/searchresult/SearchVideoResult.vue';

import { searchVideo } from '@/network/search';

const store = useStore();
const route = useRoute();
let isLoading = ref(false);

onMounted(() => {
    searchVideo(route.params.keywords as string).then((res:any) => {
        // console.log(res);
        store.commit('searchVideo/setResultList', res.result.videos);
        store.commit('searchVideo/setVideoCount', res.result.videoCount);
        store.state.searchVideo.searchState = !store.state.searchVideo.searchState;
    });
});
</script>

<style scoped lang='scss'>

</style>