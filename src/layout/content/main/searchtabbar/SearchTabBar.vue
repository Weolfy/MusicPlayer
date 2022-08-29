<template>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane 
        v-for="tab in tabList"
        :label="tab.title" 
        :name="tab.path"  
        :key="tab.path">
        </el-tab-pane>
    </el-tabs>
</template>

<script setup lang='ts'>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useStore } from '@/store/index';
import { useRoute, useRouter } from 'vue-router';

import type { TabsPaneContext } from 'element-plus'

const store = useStore();
const route = useRoute();
const router = useRouter();

const tabList = computed(() => {
    return store.getters['getTabList'];
})

const activeName = ref('');
const setActive = () => {
    activeName.value = route.meta.base as string;
}

const handleClick = (tab: TabsPaneContext, event: Event) => {
    const {props} = tab;
    router.push({
        path:'/search/result'+ props.name + route.params.keywords,
    })
}
watch(() => route.path, () => {
    setActive();
})
onMounted(() => {
    setActive();
});
</script>

<style scoped lang='scss'>
.demo-tabs {
    width: 700px;
    margin-top: -30px;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #000;
  font-size: 32px;
  font-weight: 600;
}
:deep(.el-tabs__nav-wrap::after) {
    display: none !important;
}

:deep(.el-tabs__active-bar) {
    background-color: #d93b3b !important;
    height: 3px !important;
    text-align: center !important;
}

:deep(.el-tabs__item) {
    font-size: 15px;
    color: rgb(55, 55, 55);
}
:deep(.el-tabs__item:hover) {
    color: #000000
}
:deep(.el-tabs__item) {
    font-size: 15px;
    color: rgb(55, 55, 55);
}
:deep(.is-active) {
    color: rgb(55, 55, 55);
    font-weight: 600;
}
</style>