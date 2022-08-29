<template>
    <ul class="albumList">
        <li class="albumItem" v-for="(album, index) in dataList" :key="album.id" @click="goAlbumDetail(album.id)">
            <div class="img">
                <img v-lazy="album.picUrl" alt="封面">
            </div>
            <div class="info">
                <div class="albumName">{{album.name}}</div>
                <span class="description" v-if="album.alias.length !== 0">({{album.alias[0]}})</span>
            </div>  
            <div class="artist">{{album.artists[0].name}}</div>
        </li>
    </ul>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();

const goAlbumDetail = (id: number) => {
    router.push('/detail/album/'+ id);
}

defineProps(['dataList']);
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
        cursor: pointer;
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
        }
    }
}
</style>