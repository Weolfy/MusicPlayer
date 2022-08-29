<template>
    <el-scrollbar>
      <el-menu
        active-text-color="#000000"
        background-color="#fff"
        class="el-menu-vertical-demo"
        :default-active="activeIndex"
        :default-openeds="['/mymusic', '/mysonglists']"
      >
        <SidebarItem :itemList="itemList"/>
      </el-menu>
    </el-scrollbar>
</template>

<script setup lang='ts'>
import { ref, reactive, computed } from 'vue'
import {useRoute} from 'vue-router'
import SidebarItem from './SidebarItem.vue';

const route = useRoute();

let itemList = reactive([
    {
        path: '/discover',
        component: '',
        meta: {
            title: '发现音乐'
        },
        children: [],
    },
    {
        path: '/radio',
        component: '',
        meta: {
            title: '电台'
        },
        children: [],
    },
    {
        path: '/video',
        component: '',
        meta: {
            title: '视频'
        },
        children: [],
    },
    {
        path: '/privatefm',
        component: '',
        meta: {
            title: '私人FM'
        },
        children: [],
    },
    {
        path: '/mymusic',
        component: '',
        meta: {
            title: '我的音乐'
        },
        children: [
            {
                path: '/mymusic/recent',
                component: '',
                meta: {
                    title: '最近播放'
                },
            },
            {
                path: '/mymusic/mycollection',
                component: '',
                meta: {
                    title: '我的收藏'
                },
            },
            
        ],
    },
    {
        path: '/mysonglists',
        component: '',
        meta: {
            title: '创建的歌单'
        },
        children: [
            {
                path: '/mysonglists/myfavourite',
                component: '',
                meta: {
                    title: '我喜欢的音乐'
                },
            },
        ],
    },
]);

const activeIndex = computed(() => {
    const {meta} = route;
    return meta.from;
})
</script>

<style scoped lang='scss'>
.el-menu-vertical-demo {
    width: 200px;
    height: 480px;
    user-select: none;
}
:deep(.el-menu-item) {
    height: 35px;
    margin-left: 13px;
    margin-top: 2px;
    margin-right: 10px;
    border-radius: 4px;
}
:deep(.el-menu-item:hover) {
    background-color: rgb(240, 240, 240) !important;
}
:deep(.el-menu-vertical-demo>.el-menu-item.is-active) {
    font-size: 16px !important;
    font-weight: 700 !important;
    background-color: rgb(240, 240, 240) !important;
}
:deep(.el-sub-menu__title) {
    color: rgb(175, 175, 175)!important;
    font-size: 13px;
    font-weight: 50;
    height: 35px;
    margin-top: 6px;
}
:deep(.el-sub-menu .el-menu-item) {
    color: rgb(66, 66, 66) !important;
}
:deep(.el-sub-menu .el-menu-item.is-active) {
    background-color: rgb(240, 240, 240) !important;
    color: #000 !important;
}
:deep(.el-sub-menu .el-menu-item:hover) {
    color: rgb(0, 0, 0) !important;
}

</style>