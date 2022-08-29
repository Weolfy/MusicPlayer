<template>
    <div class="searchbar">
        <el-button circle size="small" class="btn" color="#d93b3b" @click="back">
            <el-icon>
                <ArrowLeft></ArrowLeft>
            </el-icon>
        </el-button>
        <el-button circle size="small" class="btn" color="#d93b3b" @click="forward">
            <el-icon>
                <ArrowRight></ArrowRight>
            </el-icon>
        </el-button>
        <div id="searchSong">
            <el-icon color="white" id="searchbtn" @click="search"><Search/></el-icon>
            <input type="text" v-model="searchInput" 
            @keyup.enter="search" 
            :placeholder="placeHolder"
            @focus="showHot" 
            >
        </div>
        <div class="menuPopover">
            <HotSearch :dataList="hotData" 
            @item-clicked="searchHot"
            @hide="hideHot" 
            v-show="showPopover"
            :state="popoverState"
            :guessList="briefSuggestList"
            :suggestList="fullSuggestList"
            />
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, watch, onMounted} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '@/store/index';

import axios from 'axios';

import {searchSong, 
        getHotSearch, 
        getDefaultKeywords, 
        getBriefSuggest, 
        getSuggest} from '@/network/search';

import { Debounce } from '@/utils/index';

import HotSearch from '@/components/content/searchmenu/HotSearch.vue'

const route = useRoute();
const router = useRouter();
const store = useStore();

let searchInput = ref('');
let placeHolder = ref('');

let hotData = ref([]);
let briefSuggestList = ref([]);
let fullSuggestList = ref([]);

let showPopover = ref(false);
let popoverState = ref(true);

const search = () => {
    hideHot();
    searchSong(searchInput.value).then((res:any) => {
        // console.log(res);
        router.push('/search/result/song/'+searchInput.value)
        store.commit('setSongResult', res.result.songs);
        store.commit('setSongCount', res.result.songCount);
        store.commit('changeStatus');
    });
};

const searchHot = (keyword:string) => {
    searchInput.value = keyword;
    search();
}

onMounted(() => {
    axios.all([
        getHotSearch(),
        getDefaultKeywords(),
    ]).then(axios.spread((hotres, dres) => {
        // console.log(hotres);
        placeHolder.value = dres.data.realkeyword;
        hotData.value = hotres.data;
    }))
})

const showHot = () => {
    showPopover.value = true;
};
const hideHot = () => {
    showPopover.value = false;
};
let debouncer = new Debounce().use(500);
const forward = () => {
    router.go(1);
};
const back = () => {
    router.back();
}

watch(() => searchInput.value, () => {
    if (searchInput.value) {
        popoverState.value = false;
        // console.log(searchInput.value);
        debouncer().then(() => {
            getSearchSuggest();
        })
    }else {
        popoverState.value = true;
    }
});



const getSearchSuggest = () => {
    if (searchInput.value !== '') {
        axios.all([
            getBriefSuggest(searchInput.value),
            getSuggest(searchInput.value)
        ]).then(axios.spread((briefRes, fullRes) => {
            // console.log(fullRes);
            briefSuggestList.value = briefRes.result.allMatch;
            fullSuggestList.value = fullRes.result;
        }))
    }
};

document.addEventListener('mousedown', (e:any) => {
    // console.log(e);
    let p = document.getElementsByClassName('menuPopover')[0];
    let s = document.querySelector('#searchSong');
    if (e.path.includes(p) || e.path.includes(s)) {

    } else {
        hideHot();
    }
})

</script>

<style scoped lang='scss'>
.searchbar {
    position: relative;
    display: flex;
    align-items: center;
    margin-left: 70px;
    .btn {
        border: none;
    }
    #searchSong {
        display: flex;
        align-items: center;
        width: 200px;
        height: 32px;
        line-height: 32px;
        background-color: #d93b3b;
        border-radius: 16px;
        margin-left: 16px;
        padding-left: 10px;
        input {
            width: 160px;
            height: 20px;
            font-size: 14px;
            outline: none;
            border: none;
            margin-left: 5px;
            background-color: transparent;
            color: white;
            &::-webkit-input-placeholder {
                color: rgba($color: #ececec, $alpha: 0.5);
                
            }
        }
        #searchbtn {
            cursor: pointer;
        }
        #searchbtn:hover {
            color: rgb(226, 223, 223);
        }
    }
    .menuPopover {
        position: absolute;
        top: 66px;
        left: 0px;
        z-index: 999;
    }
}
</style>