<template>
    <div class="radioIndexLayout">
        <div class="panel">
            <div class="banner">
                <RadioBanner :dataList="bannerData"/>
            </div>
            <div class="typeChooser">
                <TypeChooser :dataList="cateData" />
            </div>
        </div>
        <div class="recommendRadio">
            <RecommendRadio 
            v-for="item in defaultCateList" 
            :cateId="item.id" 
            :cateName="item.name"
            class="rcmdUl"
            /> 
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'

import { getRadioBanner, getRadioCategory } from '@/network/getRadioData';

import RadioBanner from './banner/RadioBanner.vue';
import TypeChooser from './typechooser/TypeChooser.vue';
import RecommendRadio from './recommenditem/RecommendRadio.vue';

let bannerData = ref([]);
let cateData = ref([]);
let defaultCateList = ref([
    {
        id: 3001,
        name: '二次元'
    },
    {
        id: 2,
        name: '音乐推荐'
    },
    {
        id: 2001,
        name: '创作翻唱'
    },
    {
        id: 3,
        name: '情感'
    },
    {
        id: 3087096,
        name: '新闻资讯'
    }
])

onMounted(() => {
    getRadioBanner().then((res:any) => {
        bannerData.value = res.data;
    });
    getRadioCategory().then((res:any) => {
        cateData.value = res.categories;
    })
});
</script>

<style scoped lang='scss'>
.radioIndexLayout {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    .panel {
        width: 700px;
        height: 170px;
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 30px;
        .banner {
            width: 420px;
            height: 168px;
            border-radius: 6px;
            overflow: hidden;
        }
        .typeChooser {
            width: 250px;
            height: 168px;
            border-radius: 6px;
            background-color: #fef4f4;
        }
    }
    .recommendRadio {
        width: 700px;
        margin-top: 20px;
        .rcmdUl {
            margin-bottom: 30px;
        }
    }
}
</style>