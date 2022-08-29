<template>
    <div class="artistLayout">
        <div class="tabbar">
            <CommonTabBar :tabList="tabs"/>
        </div>
        <div class="selector">
            <div class="language">
                <span class="title">
                    语种：
                </span>
                <ul class="options">
                    <li class="languageOptions" 
                    :class="{active: currentLanguage == item.tagName}"
                    v-for="item in languageTags" 
                    :key="item.id"
                    @click="changeCurrentLanguage(item.tagName)"
                    >
                        <span>{{item.tagName}}</span>
                    </li>
                </ul>
            </div>  
            <div class="artistType">
                <span class="title">
                    分类：
                </span>
                <ul class="options">
                    <li class="artistTypeOptions"
                    :class="{active: currentArtistType == item.tagName}"
                    v-for="item in artistTypeTags" 
                    :key="item.id"
                    @click="changeCurrentArtistType(item.tagName)"
                    >
                        <span>{{item.tagName}}</span>
                    </li>
                </ul>
            </div>
            <div class="screen">
                <span class="title">
                    筛选：
                </span>
                <ul class="options">
                    <li class="screenOptions"
                    :class="{active: currentScreen == item}" 
                    v-for="item in screenTags" 
                    :key="item"
                    @click="changeCurrentScreen(item)"
                    >
                        <span>{{item}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="artistList" v-loading="isLoading">
            <ul class="artists">
                <li class="artistItem" v-for="item in currentArtistData" :key="item.id">
                    <div class="artistImg" @click="goArtistDetail(item.id)">
                        <img v-lazy="item.img1v1Url" alt="歌手头像" >
                    </div>
                    <div class="artistName" @click="goArtistDetail(item.id)">
                        {{item.name}}
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted, computed, watch } from 'vue'
import { useRoute,useRouter } from 'vue-router';
import { useStore } from '@/store'

import { getArtist } from '@/network/getDiscoverData'

import CommonTabBar from '@/components/common/commontabbar/CommonTabBar.vue'
import Pagination from '@/components/common/pagination/Pagination.vue'

import axios from 'axios'

const router = useRouter();
const store = useStore();
const tabs = computed(() => {
    return store.getters['getDiscoverTabs'];
});

let languageTags = ref([
    {
        tagName: '全部',
        id: -1
    },
    {
        tagName: '华语',
        id: 7
    },
    {
        tagName: '欧美',
        id: 96
    },
    {
        tagName: '日本',
        id: 8
    },
    {
        tagName: '韩国',
        id: 16
    },
    {
        tagName: '其他',
        id: 0
    },
]);

let artistTypeTags = ref([
    {
        tagName: '全部',
        id: -1
    },
    {
        tagName: '男歌手',
        id: 1
    },
    {
        tagName: '女歌手',
        id: 2
    },
    {
        tagName: '乐队组合',
        id: 3
    },
]);

let screenTags = ref(['热门']);
for(let i=0;i<26;i++) {
    screenTags.value.push(String.fromCharCode(65+i));
};
screenTags.value.push('#');

let currentLanguage = ref('全部');
let clparams = computed(() => {
    let current =  languageTags.value.filter((item) => {
        return item.tagName == currentLanguage.value;
    });
    return current[0].id;
});

let currentArtistType = ref('全部');
let caparams = computed(() => {
    let current =  artistTypeTags.value.filter((item) => {
        return item.tagName == currentArtistType.value;
    });
    return current[0].id;
});

let currentScreen = ref('热门');
let csparams = computed(() =>{
    if (currentScreen.value === '热门') {
        return '-1';
    }else if (currentScreen.value === '#') {
        return '0';
    }else {
        return currentScreen.value
    }
});

let currentArtistData:any = ref([]);

let isLoading = ref(false);

onMounted(() => {
    isLoading.value = true;
    getArtist(50, 0, csparams.value, caparams.value, clparams.value)
    .then((res:any) => {
        console.log(res);
        currentArtistData.value = res.artists;
        isLoading.value = false;
    })
});

watch(() => currentLanguage.value, () => {
    isLoading.value = true;
    getArtist(50, 0, csparams.value, caparams.value, clparams.value)
    .then((res:any) => {
        console.log(res);
        currentArtistData.value = res.artists;
        isLoading.value = false;
    })
});
watch(() => currentArtistType.value, () => {
    isLoading.value = true;
    getArtist(50, 0, csparams.value, caparams.value, clparams.value)
    .then((res:any) => {
        console.log(res);
        currentArtistData.value = res.artists;
        isLoading.value = false;
    })
});
watch(() => currentScreen.value, () => {
    isLoading.value = true;
    getArtist(50, 0, csparams.value, caparams.value, clparams.value)
    .then((res:any) => {
        console.log(res);
        currentArtistData.value = res.artists;
        isLoading.value = false;
    })
});


const changeCurrentLanguage = (tagName: string) => {
    currentLanguage.value = tagName;
};
const changeCurrentArtistType = (tagName: string) => {
    currentArtistType.value = tagName;
};
const changeCurrentScreen = (tag:string) => {
    currentScreen.value = tag;
};

const goArtistDetail = (id: number) => {
    router.push('/detail/artist/'+ id);
}
</script>

<style scoped lang='scss'>
.artistLayout {
    display: flex;
    flex-direction: column;
    align-items: center;
    .tabbar {
        margin-top: 15px;
    }
    .selector {
        width: 740px;
        // height: 160px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        font-size: 12px;
        margin-left: 25px;
        color: #676767;
        .language {
            height: 20px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .languageOptions {
                width: 70px;
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
        .artistType {
            height: 20px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-top: 10px;
            .artistTypeOptions {
                width: 70px;
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
        .screen {
            
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            margin-top: 10px;
            .screenOptions {
                width: 60px;
                border-right: 1px solid #dddddd;
                margin-bottom: 15px;
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
        .options {
            list-style: none;
            width: 660px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
        }
    }
    .artistList {
        width: 740px;
        margin-top: 20px;
        .artists {
            list-style: none;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            flex-wrap: wrap;
            .artistItem {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
                width: 140px;
                margin-bottom: 25px;
                .artistImg {
                    width: 140px;
                    height: 140px;
                    border-radius: 6px;
                    overflow: hidden;
                    cursor: pointer;
                    img {
                        width: 140px;
                        height: 140px;
                    }
                }
                .artistName {
                    margin-top: 6px;
                    font-size: 14px;
                    text-align: left;
                    color: #303030;
                    cursor: pointer;
                    &:hover {
                        color: #000
                    }
                }
            }
        }
    }
}
:deep(.el-loading-spinner .path) { 
    stroke: #ec4141;
}
</style>