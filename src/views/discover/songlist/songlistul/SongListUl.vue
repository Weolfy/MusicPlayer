<template>
    <div class="ullayout">
        <ul class="songlistUl">
            <li class="songlistItem" v-for="item in dataList" :key="item.id">
                <div class="cover" @click="goSongListDetail(item.id)">
                    <img v-lazy="item.coverImgUrl" alt="封面">
                </div>
                <div class="title" :title="item.name" @click="goSongListDetail(item.id)">
                    {{item.name}}
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();

const props = defineProps(['dataList']);

const goSongListDetail = (id:number) => {
    router.push('/detail/songlist/'+ id);
}
</script>

<style scoped lang='scss'>
.ullayout {
    display: flex;
    justify-content: center;
    .songlistUl {
        width: 100%;
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        .songlistItem {
            width: 170px;
            margin: 15px 0;
            .cover {
                width: 170px;
                height: 170px;
                border-radius: 6px;
                overflow: hidden;
                cursor: pointer;
                img {
                    width: 170px;
                    height: 170px; 
                }
            }
            .title {
                margin-top: 10px;
                display: -webkit-box;
                overflow: hidden;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                text-overflow: ellipsis;
                text-align: left;
                font-size: 14px;
                color: #303030;
                cursor: pointer;
                &:hover {
                    color: #000;
                }
            }
        }
    }
}
</style>