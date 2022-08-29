<template>
    <ul class="albumList">
        <li class="albumItem" v-for="(album, index) in dataList" :key="album.id">
            <div class="img">
                <img :src="album.picUrl" alt="封面">
            </div>
            <div class="info">
                <div class="albumName" @click="goAlbumDetail(album.id)">{{album.name}}</div>
                <span class="description" v-if="album.alias.length !== 0">({{album.alias[0]}})</span>
            </div>  
            <div class="artist" @click="goArtistDetail(album.artist[0].id)">{{album.artist[0].name}}</div>
        </li>
    </ul>
</template>

<script setup lang='ts'>
import { ref, reactive, watch } from 'vue'
import { useStore } from '@/store';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

interface albumItem {
    name: string,
    id: number,
    artist: Array<any>,
    alias: Array<string>,
    picUrl: string
};

let resultList:any = reactive([]);
const dataList: Array<albumItem> = reactive([]);
watch(() => store.state.searchAlbum.searchState, () => {
    resultList = store.state.searchAlbum.resultList;
    dataList.length = 0;
    for (let i = 0;i < resultList.length; i++) {
        dataList.push({
            id: resultList[i].id,
            name: resultList[i].name,
            picUrl: resultList[i].picUrl,
            alias: resultList[i].alias,
            artist: resultList[i].artists
        });
    };
    
});

const goArtistDetail = (id: number) => {
    router.push('/detail/artist/'+ id);
};

const goAlbumDetail = (id: number) => {
    router.push('/detail/album/'+ id);
}
</script>   

<style scoped lang='scss'>
.albumList {
    list-style: none;
    li:nth-of-type(even) {
        background-color: #f9f9f9;
    }
    li:hover {
        background-color: #f1f1f1;
    }
    .albumItem {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 80px;
        .img {
            width: 60px;
            height: 60px;
            overflow: hidden;
            border-radius: 6px;

            img {
                width: 60px;
                height: 60px;
            }
        }
        .info {
            display: flex;
            justify-content: flex-start;
            width: 300px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            .albumName {
                margin-left: 20px;
                font-size: 14px;
                color: #303030;
                cursor: pointer;
            }
            .description {
                margin-left: 5px;
                font-size: 14px;
                color: #a5a5a5;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
        .artist {
            // margin-left: 150px;
            color: #303030;
            font-size: 14px;
            cursor: pointer;
        }
    }
}
</style>