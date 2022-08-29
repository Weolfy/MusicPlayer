<template>
    <div class="videoIndexLayout">
        <div class="tabbar">
            <CommonTabBar :tabList="tabs"/>
        </div>
        <div class="tagChooser">
            <TagChooser />
        </div>
        <div class="mvList">
            
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive,computed } from 'vue'
import { useStore } from '@/store'

import CommonTabBar from '@/components/common/commontabbar/CommonTabBar.vue'
import TagChooser from './tagchooser/TagChooser.vue'
import MvUl from '@/components/content/mvul/MvUl.vue'

const store = useStore();

const tabs = computed(() => {
    return store.getters['getVideoTabs'];
});
</script>

<style scoped lang='scss'>
.videoIndexLayout {
    display: flex;
    flex-direction: column;
    align-items: center;
    .tabbar {
        margin-top: 15px;
    }
    .tagChooser {
        width: 700px;
    }
    .mvList {
        width: 700px;
    }
}
</style>