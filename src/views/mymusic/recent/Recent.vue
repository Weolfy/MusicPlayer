<template>
    <div class="recentLayout">
        <div class="title">
            最近播放
        </div>
        <div class="clearRecent" @click="clearRecent">
            清空
        </div>
        <div class="recentTable">
            <RecentTable />
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import { useRoute, useRouter} from 'vue-router'
import { useStore } from '@/store'

import RecentTable from './recentTable/RecentTable.vue'

const route = useRoute();
const router = useRouter();
const store = useStore();1

const clearRecent = () => {
    store.state.recent.length = 0;
}
</script>

<style scoped lang='scss'>
.recentLayout {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    color: #303030;
    cursor: default;
    .title {
        width: 740px;
        text-align: left;
        font-size: 20px;
        font-weight: 600;
        margin-top: 15px;
    }
    .recentTable {
        width: 740px;
        margin-top: 10px;
    }
    .clearRecent {
        width: 740px;
        height: 10px;
        text-align: right;
        font-size: 14px;
        color: #5091ca;
        cursor: pointer;
    }
}
</style>