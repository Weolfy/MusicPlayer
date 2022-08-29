<template>
    <SearchRadioResult/>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import { useStore } from '@/store';
import { useRoute } from 'vue-router';

import SearchRadioResult from '@/layout/content/main/searchresult/SearchRadioResult.vue';

import { searchRadio } from '@/network/search';

const store = useStore();
const route = useRoute();

onMounted(() => {
    searchRadio(route.params.keywords as string).then((res:any) => {
        // console.log(res);
        store.commit('searchRadio/setResultList', res.result.djRadios);
        store.commit('searchRadio/setRadioCount', res.result.djRadiosCount);
        store.state.searchRadio.searchState = !store.state.searchRadio.searchState;
    });
});
</script>

<style scoped lang='scss'>

</style>