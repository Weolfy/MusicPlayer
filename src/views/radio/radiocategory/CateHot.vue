<template>
    <div class="layout" v-loading="isLoading">
        <div class="cateTitle">
            {{cateName}}
        </div>
        <div class="hotList">
            <ul>
                <li class="hotItem" v-for="item in hotData" :key="item.id" @dblclick="goRadioDetail(item.id)">
                    <div class="cover" @click="goRadioDetail(item.id)">
                        <img v-lazy="item.picUrl" alt="">
                    </div>
                    <div class="info">
                        <div class="name" @click="goRadioDetail(item.id)">
                            {{item.name}}
                        </div>
                        <div class="desc">
                            {{item.rcmdtext}}
                        </div>
                        <div class="count">
                            声音：{{item.programCount}} , 收藏：{{filterCount(item.subCount)}}
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import {useRoute, useRouter} from 'vue-router'

import { getCateHot,getRadioCategory } from '@/network/getRadioData'

const route = useRoute();
const router = useRouter();

let cateName = ref('');
let cateList = ref([]);
let hotData:any = ref([]);

let isLoading = ref(true);

onMounted(() => {
    getRadioCategory().then((res:any) => {
        cateList.value = res.categories;
        let currentCate:any = cateList.value.filter((item:any) => {
            return item.id == route.params.cateId;
        });
        cateName.value = currentCate[0].name;
    })
    getCateHot(20,0,route.params.cateId as string).then((res:any) => {
        hotData.value = res.djRadios;
        isLoading.value = false;
    });
});

const filterCount = (count: number) => {
    if (count > 100000) {
        return Math.floor(count / 10000) + '万';
    }else {
        return count;
    }
}

const goRadioDetail = (id:number) => {
    router.push('/detail/radio/'+ id)
}
</script>

<style scoped lang='scss'>
.layout {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .cateTitle {
        margin-top: 20px;
        width: 750px;
        font-size: 20px;
        font-weight: 600;
        color: #303030;
        text-align: left;
    }
    .hotList {
        width: 750px;
        margin-top: 30px;
        ul {
            list-style: none;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: flex-start;
            .hotItem {
                margin-top: 20px;
                width: 350px;
                height: 134px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                .cover {
                    width: 134px;
                    height: 134px;
                    border-radius: 6px;
                    overflow: hidden;
                    cursor: pointer;
                    img {
                        width: 134px;
                        height: 134px; 
                    }
                }
                .info {
                    margin-left: 10px;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: center;
                    font-size: 14px;
                    width: 190px;
                    cursor: default;
                    user-select: none;
                    .name {
                        color: #303030;
                        margin-bottom: 15px;
                        cursor: pointer;
                        &:hover {
                            color: #000;
                        }
                    }
                    .desc {
                        color: #9f9f9f;
                        font-size: 12px;
                        text-align: left;
                    }
                    .count {
                        margin-top: 10px;
                        color: #9f9f9f;
                        font-size: 12px;
                    }
                }
            }
        }
    }
}
</style>