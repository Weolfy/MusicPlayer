<template>
    <div class="layout">
        <div class="type" @click="goCateHot(cateId)">
            {{cateName}}
        </div>
        <div class="recommendList">
            <ul>
                <li class="item" v-for="item in topFive">
                    <div class="cover" @click="goRadioDetail(item.id)">
                        <img v-lazy="item.picUrl" alt="">
                    </div>
                    <div class="info">
                        <div class="tag" v-if="item.secondCategory">{{item.secondCategory}}</div>
                        <div class="name" @click="goRadioDetail(item.id)">{{item.name}}</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, toRefs, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { getRecommendRadio } from '@/network/getRadioData'

const router = useRouter();

const props = defineProps(['cateId','cateName']);
const {cateId} = toRefs(props);

let topFive:any = ref([]);
onMounted(() => {
    getRecommendRadio(cateId?.value).then((res:any) => {
        // console.log(res);
        topFive.value = res.djRadios.slice(0,5);
    })
});

const goCateHot = (cateId:number) => {
    router.push('category/'+ cateId)
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
    align-items: flex-start;
    width: 100%;
    .type {
        font-size: 18px;
        font-weight: 600;
        color: #303030;
        cursor: pointer;
        &:hover {
            color: #000;
        }
    }
    .recommendList {
        margin-top: 10px;
        width: 100%;
        ul {
            list-style: none;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            flex-wrap: wrap;
            .item {
                width: 130px;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
                .cover {
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
                .info {
                    color: #303030;
                    font-size: 14px;
                    text-align: left;
                    width: 100%;
                    margin-top: 8px;
                    display: -webkit-box;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    .tag {
                        display: inline;
                        font-size: 11px;
                        color: #acacac;
                        border: 1px solid #d4d4d4;
                        border-radius: 3px;
                        padding: 0 1px;
                        cursor: default;
                    }
                    .name {
                        display:inline;
                        word-break: break-all;
                        word-wrap: break-word;
                        margin-left: 5px;
                        
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
</style>