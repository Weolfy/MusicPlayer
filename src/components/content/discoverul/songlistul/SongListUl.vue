<template>
    <div class="title">推荐歌单</div>
    <ul class="songlistul">
        <li class="item" v-for="item in dataList" :key="item.id">
            <div class="cover" @click="goSongListDetail(item.id)">
                <img v-lazy="item.picUrl" alt="歌单封面">
            </div>
            <div class="songlistname" @click="goSongListDetail(item.id)">{{item.name}}</div>
        </li>
    </ul>
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
.title {
    color: #303030;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    &:hover {
        color: #000;
    }
}
.songlistul {
    color: #303030;
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-content: space-between;
    flex-wrap: wrap;
    .item {
        width: 138px;
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        .cover {
            width: 138px;
            height: 138px;
            overflow: hidden;
            border-radius: 6px;
            cursor: pointer;
            img {
                width: 138px;
                height: 138px;
            }
        }
        .songlistname {
            margin-top: 10px;
            text-align: left;
            font-size: 14px;
            cursor: pointer;
            &:hover {
                color: #000
            }
        }
    }
}
</style>