<template>
    <div class="rankLayout">
        <div class="tabbar">
            <CommonTabBar :tabList="tabs"/>
        </div>
        <div class="officialRank">
            <div class="title">
                官方榜
            </div>
            <div class="oRank">
                <OfficialRank v-for="rank in oRanks" 
                :rankType="rank.ToplistType"
                :rankCover="rank.coverImgUrl"
                :rankId="rank.id"
                class="oRankItem"
                />
            </div>
        </div>
        <div class="globalRank">
            <div class="title">
                全球榜
            </div>
            <div class="gRank">
                <ul class="gRankUl">
                    <li class="gRankItem" v-for="rank in gRanks" :key="rank.id">
                        <div class="rankCover">
                            <img :src="rank.coverImgUrl" alt="" @click="goSongListDetail(rank.id)">
                        </div>
                        <div class="rankName" @click="goSongListDetail(rank.id)">
                            {{rank.name}}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'

import { getAllRank } from '@/network/getDiscoverData'


import CommonTabBar from '@/components/common/commontabbar/CommonTabBar.vue'
import OfficialRank from './officialrank/OfficialRank.vue'

import axios from 'axios'

const router = useRouter();
const store = useStore();
const tabs = computed(() => {
    return store.getters['getDiscoverTabs'];
});

let allRanks = ref([]);
let oRanks:any = computed(() => {
    return allRanks.value.filter((rank:any) => {
        return rank.ToplistType;
    })
});
let gRanks:any = computed(() => {
    return allRanks.value.filter((rank:any) => {
        return rank.ToplistType === undefined;
    })
})

onMounted(() => {
    getAllRank().then((res:any) => {
        allRanks.value = res.list;
        // console.log(oRanks.value);
    })
});

const goSongListDetail = (id:number) => {
    router.push('/detail/songlist/'+ id);
}
</script>

<style scoped lang='scss'>
.rankLayout {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #303030;
    .tabbar {
        margin-top: 15px;
    }
    .officialRank {
        width: 700px;
        .oRankItem {
            margin-top: 30px;
            &:nth-of-type(1) {
                margin-top: 10px;
            }
        }

    }
    .globalRank {
        width: 700px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        margin-top: 30px;
        .gRank {
            width: 100%;
            .gRankUl {
                list-style: none;
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                flex-wrap: wrap;
                .gRankItem {
                    width: 130px;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: center;
                    margin: 10px 5px;
                    .rankCover {
                        width: 130px;
                        height: 130px;
                        border-radius: 6px;
                        overflow: hidden;
                        cursor: pointer;
                        img {
                            width: 130px;
                            height: 130px;
                        }
                    }
                    .rankName {
                        width: 100%;
                        font-size: 14px;
                        text-align: left;
                        margin-top: 8px;
                        cursor: pointer;
                        &:hover {
                            color: #000;
                        }
                    }
                }
            }
        }
    }
}
.title {
    color: #303030;
    width: 100%;
    text-align: left;
    font-size: 20px;
    font-weight: 600;
}
</style>