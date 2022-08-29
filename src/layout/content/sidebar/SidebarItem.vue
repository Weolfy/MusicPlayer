<template>
    <template v-for="item in itemList" :key="item.path">
        <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path">
            <template template #title>
                <span>{{item.meta.title}}</span>
            </template>
            <SidebarItem :itemList="item.children"></SidebarItem>
        </el-sub-menu>
        <el-menu-item v-else :index="item.path" @click="changePage(item.path)">
            <template #title>
                <span>{{item.meta.title}}</span>
            </template>
        </el-menu-item>
    </template>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import {useRouter} from 'vue-router'

const router = useRouter();

defineProps(['itemList']);

const changePage = (path: string) => {
    router.push(path);
}
</script>

<style scoped lang='scss'>

</style>