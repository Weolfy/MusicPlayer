<template>
    <div class="mvIndexLayout">
        <div class="tabbar">
            <CommonTabBar :tabList="tabs"/>
        </div>
        <div class="title">
            全部MV
        </div>
        <div class="screen">
            <div class="area">
                <span class="sreenType">地区：</span>
                <ul>
                    <li class="screenItem"
                    v-for="item in areaTags"
                    :key="item"
                    :class="{active: item == currentArea}"
                    @click="changeArea(item)"
                    >
                        <span>{{item}}</span>
                    </li>
                </ul>
            </div>
            <div class="type">
                <span class="sreenType">类型：</span>
                <ul>
                    <li 
                    class="screenItem"
                    v-for="item in typeTags"
                    :key="item"
                    :class="{active: item == currentType}"
                    @click="changeType(item)"
                    >
                        <span>{{item}}</span>
                    </li>
                </ul>
            </div>
            <div class="order">
                <span class="sreenType">排序：</span>
                <ul>
                    <li 
                    class="screenItem"
                    v-for="item in orderTags"
                    :key="item"
                    :class="{active: item == currentOrder}"
                    @click="changeOrder(item)"
                    >
                        <span>{{item}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="mvList" v-loading="isLoading">
            <MvUl :dataList="mvDataList" />
            <Pagination :totalCount="totalCount" 
            :pagerCount="9"
            :pageSize="30"
            @pageChange="pageChange"
            />
        </div>
        
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive,computed, onMounted, watch, inject } from 'vue'
import { useStore } from '@/store'

import { getAllMv } from '@/network/getVideoData'

import CommonTabBar from '@/components/common/commontabbar/CommonTabBar.vue'
import MvUl from './mvul/MvUl.vue'
import Pagination from '@/components/common/pagination/Pagination.vue'


const store = useStore();

const tabs = computed(() => {
    return store.getters['getVideoTabs'];
});

let areaTags = ref([
    '全部','内地','港台','欧美','日本','韩国',
]);
let typeTags = ref([
    '全部', '官方版', '原声','现场版', '网易出品'
]);
let orderTags = ref(['上升最快', '最热', '最新']);

let currentArea = ref('内地');
let currentType = ref('全部');
let currentOrder = ref('最热');

let totalCount = ref(0);
let mvDataList = ref([]);
let mvPerPage = ref(30);
const pagi = ref();

const scrollBar:any = inject('scrollBar');

let isLoading = ref(true);

const changeArea = (tag: string) => {
    currentArea.value = tag;
};
const changeType = (tag: string) => {
    currentType.value = tag;
};
const changeOrder = (tag: string) => {
    currentOrder.value = tag;
};


onMounted(() => {
    getAllMv(currentArea.value, currentType.value, currentOrder.value, 30, 0).then((res:any) => {
        // console.log(res);
        totalCount.value = res.count;
        mvDataList.value = res.data;
        isLoading.value = false;
    });
});

watch(() => currentArea.value, () => {
    isLoading.value = true;
    getAllMv(currentArea.value, currentType.value, currentOrder.value, mvPerPage.value, 0).then((res:any) => {
        // console.log(res);
        totalCount.value = res.count;
        mvDataList.value = res.data;
        isLoading.value = false;
    });
});
watch(() => currentType.value, () => {
    isLoading.value = true;
    getAllMv(currentArea.value, currentType.value, currentOrder.value, mvPerPage.value, 0).then((res:any) => {
        // console.log(res);
        totalCount.value = res.count;
        mvDataList.value = res.data;
        isLoading.value = false;
    });
});
watch(() => currentOrder.value, () => {
    isLoading.value = true;
    getAllMv(currentArea.value, currentType.value, currentOrder.value, mvPerPage.value, 0).then((res:any) => {
        // console.log(res);
        totalCount.value = res.count;
        mvDataList.value = res.data;
        isLoading.value = false;
    });
});

const pageChange = (currentPage: number) => {
    isLoading.value = true;
    scrollBar.value.setScrollTop(0);
    let offset = (currentPage - 1) * mvPerPage.value;
    getAllMv(currentArea.value, currentType.value, currentOrder.value, mvPerPage.value, offset).then((res:any) => {
        mvDataList.value = res.data;
        isLoading.value = false;
    });
}


</script>

<style scoped lang='scss'>
.mvIndexLayout {
    display: flex;
    flex-direction: column;
    align-items: center;
    .tabbar {
        margin-top: 15px;
    }
    .title {
        width: 700px;
        font-size: 18px;
        font-weight: 600;
        text-align: left;
        color: #303030;
        cursor: pointer;
        &:hover {
            color: #000;
        }
    }
    .screen {
        width: 700px;
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        font-size: 12px;
        color: #303030;
        cursor: default;
        div {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 25px;
            ul {
                list-style: none;
                display: flex;
                align-items: center;
                .screenItem {
                    width: 76px;
                    border-right: 1px solid #dddddd;
                    &:last-of-type {
                        border-right: none;
                    }
                    &.active {
                        color: #ec4141;
                        span {
                            background-color: rgb(255, 239, 241);
                            padding: 3px 10px;
                            border-radius: 10px;
                            &:hover {
                                color: #ec4141;
                            }
                        }
                    }
                    span {
                        cursor: pointer;
                        &:hover {
                            color: #000;
                        }
                    }
                }
            }
        }
    }
    .mvList {
        width: 700px;
    }
}

</style>