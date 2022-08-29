<template>
    <div class="collectionLayout">
        <div class="tabbar">
            <CommonTabBar :tabList="tabList"/>
        </div>
        <div class="view">
            <router-view v-slot="{ Component }">
                <keep-alive>
                    <component :is="Component"/>
                </keep-alive>
            </router-view>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'

import CommonTabBar from '@/components/common/commontabbar/CommonTabBar.vue'

const tabList = reactive([
    {
        path: '/album',
        title: '专辑'
    },
    {
        path: '/artist',
        title: '歌手'
    }
]);


</script>

<style scoped lang='scss'>
.collectionLayout {
    display: flex;
    flex-direction: column;
    align-items: center;
    .tabbar {
        margin-top: 15px;
    }
}
</style>