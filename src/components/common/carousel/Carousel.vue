<template>
    <el-carousel :interval="4000" type="card" height="200px" ref="carousel">
        <el-carousel-item v-for="banner in bannerList" :key="banner">
            <img :src="banner.imageUrl" alt="轮播图封面" class="cover">
        </el-carousel-item>
    </el-carousel>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import type {ElCarousel} from "element-plus"

const props = defineProps(['bannerList']);
const carousel = ref<InstanceType<typeof ElCarousel>>();
onMounted(() => {
    if (carousel.value) {
        carousel.value.setActiveItem(1);
    }
})



</script>

<style scoped lang='scss'>
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-carousel__item {
    border-radius: 10px;
    height: 200px;
    &.is-in-stage.is-active {
        width: 540px !important;
        height: 200px !important;
        top: 0;
        left: -80px;
    }
    &.is-in-stage:not(.is-active) {
        width: 380px !important;
        height: 200px !important;
        left: 0px;
    }
}

.cover {
    width: 100%;
    height: 100%;
}

:deep(.el-carousel__indicators--outside button) {
    background-color: #d8d8d8;
    opacity: 1;
}
:deep(.el-carousel__indicator.is-active button) {
    background-color: #ec4141;
}
:deep(.el-carousel__indicator:hover button) {
    opacity: 1;
}
:deep(.el-carousel__button) {
    width: 6px;
    height: 6px;
    border-radius: 3px;
}
</style>