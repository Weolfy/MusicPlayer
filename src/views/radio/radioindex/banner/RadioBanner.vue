<template>
    <el-carousel trigger="click" height="168px">
      <el-carousel-item v-for="item in dataList" :key="item.targetId">
        <div class="cardLayout" @click="goRadioDetail(item.targetId)">
            <img :src="item.pic" alt="">
            <div class="typeTitle">{{item.typeTitle}}</div>
        </div>
      </el-carousel-item>
    </el-carousel>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps(['dataList'])

const goRadioDetail = (id:number) => {
    router.push('/detail/radio/'+ id)
}
</script>

<style scoped lang='scss'>
.cardLayout {
    position: relative;
    cursor: pointer;
    img {
        width: 420px;
        height: 168px;
    }
    .typeTitle {
        position: absolute;
        bottom: -2px;
        right: -8px;
        background-color: #ec4141;
        padding: 5px 15px 10px 6px;
        border-radius: 6px;
        color: #fff;
        font-size: 13px;
        z-index: 9;
    }
}
</style>