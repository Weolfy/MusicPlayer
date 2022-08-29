<template>
    <div class="rdLayout" v-loading="loading">
        <div class="radioInfo">
            <div class="radioCover">
                <img :src="coverUrl" alt="电台封面">
            </div>
            <div class="info">
                <div class="radioName">
                    {{radioName}}
                </div>
                <div class="radioCreator">
                    <img :src="creator.avatarUrl" alt="头像">  {{creator.nickname}}
                </div>
                <div class="radioDesc" :class="{collapse: descCollapse}">
                    <el-button class="cButton" color="#ec4141" @click="toggleCollapse">{{buttonTitle}}</el-button>
                    {{desc}}
                </div>
            </div>
        </div>
        <div class="radioDetail">
            <RadioUl :programCount="programCount" :programData="progarmData"></RadioUl>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter} from 'vue-router'
import { useStore } from '@/store'

import axios from 'axios'

import { getRadioDetail, getRadioSongs } from '@/network/getDetail'

import RadioUl from '@/components/content/radioul/RadioUl.vue'

const route = useRoute();
const router = useRouter();
const store = useStore();

let radioName = ref('');
let coverUrl = ref('');
let creator:any = ref({});
let desc = ref('');

let descCollapse = ref(true);
let buttonTitle = ref('展开');

let programCount = ref(0);
let progarmData = ref([]);

let loading = ref(true);

onMounted(() => {
    axios.all([
        getRadioDetail(route.params.id as string),
        getRadioSongs(route.params.id as string,30)
    ]).then(axios.spread((dres,sres) => {
        // console.log(dres);
        // console.log(sres);
        
        radioName.value = dres.data.name;
        coverUrl.value = dres.data.picUrl;
        creator.value = dres.data.dj;
        desc.value = dres.data.desc;
        programCount.value = sres.count;
        progarmData.value = sres.programs;
        loading.value = false;
    }))
});

const toggleCollapse = () => {
    if (descCollapse.value === true) {
        descCollapse.value = false;
        buttonTitle.value = '收起';
    } else {
        descCollapse.value = true;
        buttonTitle.value = '展开'
    }
}
</script>

<style scoped lang='scss'>
.rdLayout {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #303030;
    .radioInfo {
        width: 690px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        margin-top: 30px;
        .radioCover {
            width: 184px;
            height: 184px;
            border-radius: 6px;
            overflow: hidden;
            img {
                width: 184px;
                height: 184px;
            }
        }
        .info {
            width: 450px;
            margin-left: 20px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            text-align: left;
            .radioName {
                font-size: 22px;
                font-weight: 600;
            }
            .radioCreator {
                width: 86px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 20px;
                font-size: 14px;
                img {
                    width: 24px;
                    height: 24px;
                    border-radius: 12px;
                }
            }
            .radioDesc {
                position: relative;
                width: 100%;
                font-size: 14px;
                margin-top: 20px;
                white-space: pre-line;
                .cButton {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    width: 40px;
                    height: 20px;
                    font-size: 12px;
                    cursor: pointer;
                }
                &.collapse {
                    height: 80px;
                    overflow: hidden;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    display: -webkit-box;
                    text-overflow: ellipsis;     
                }
            }
        }
    }
    .radioDetail {
        margin-top: 30px;
    }
}
:deep(.el-loading-spinner .path) {
    stroke: #ec4141;
}
</style>