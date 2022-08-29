<template>
    <ul class="artistList">
        <li class="artistItem" v-for="(artist, index) in dataList" :key="index" @click="goArtistDetail(artist.id)">
            <div class="img">
                <img :src="artist.picUrl" alt="头像">
            </div>
            <div class="artistName">{{artist.name}}</div>
            <span class="nickName" v-if="artist.alias.length !== 0">({{artist.alias[0]}})</span>
        </li>
    </ul>
</template>

<script setup lang='ts'>
import { ref, reactive, watch } from 'vue'
import { useRoute,useRouter } from 'vue-router';
import { useStore } from '@/store';

const route = useRoute();
const router = useRouter();
const store = useStore();

interface artistItem {
    id: number,
    name: string,
    picUrl: string,
    alias: Array<string>
}

let resultList:any = reactive([]);
const dataList: Array<artistItem> = reactive([]);
watch(() => store.state.searchArtist.searchState, () => {
    resultList = store.state.searchArtist.resultList;
    dataList.length = 0;
    for (let i = 0;i < resultList.length; i++) {
        dataList.push({
            id: resultList[i].id,
            name: resultList[i].name,
            picUrl: resultList[i].picUrl,
            alias: resultList[i].alias
        });
    };
    
});

const goArtistDetail = (id: number) => {
    router.push('/detail/artist/'+ id);
}

</script>

<style scoped lang='scss'>
.artistList {
    list-style: none;
    li:nth-of-type(even) {
        background-color: #f9f9f9;
    }
    li:hover {
        background-color: #f1f1f1;
    }
    .artistItem {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 80px;
        cursor: pointer;
        .img {
            width: 60px;
            height: 60px;
            // background-color: aqua;
            border: 1px solid #b9b9b9;
            border-radius: 6px;
            line-height: 60px;
            overflow: hidden;
            img {
                display: block;
                width: 60px;
                height: 60px;
            }
        }
        .artistName {
            margin-left: 10px;
            color: #303030;
        }
        .nickName {
            margin-left: 5px;
            font-size: 14px;
            color: #a5a5a5;
        }
    }
}
</style>