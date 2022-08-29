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
import { ref, reactive, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import type { TabsPaneContext } from 'element-plus'

const route = useRoute();
const router = useRouter();

const props = defineProps(['tabList']);

const activeName = ref('');
const setActive = () => {
    activeName.value = route.meta.base as string;
}
const handleClick = (tab: TabsPaneContext, e: Event) => {
    const {props} = tab;
    const from:any = route.meta.from;
    router.push({
        path: from + props.name
    })
};

onMounted(() => {
    setActive();
});
watch(() => route.path, () => {
    setActive();
})
</script>

<style scoped lang='scss'>
.demo-tabs {
    width: 700px;
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
    background-color: #ec4141 !important;
    height: 3px !important;
    text-align: center !important;
}

:deep(.el-tabs__item:hover) {
    color: #000000
}
:deep(.el-tabs__item) {
    font-size: 16px;
    color: rgb(55, 55, 55);
}
:deep(.is-active) {
    color: rgb(55, 55, 55);
    font-size: 19px;
    font-weight: 600;
}
</style>