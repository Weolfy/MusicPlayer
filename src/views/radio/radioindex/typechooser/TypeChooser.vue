<template>
    <div class="layout">
        <ul class="typeList" ref="list" :style="{'left': currentLeft+'px'}">
            <li class="types" v-for="item in dataList" :key="item.id" @click="goCateHot(item.id)">
                <div class="icon">
                    <img :src="item.picPCWhiteUrl" alt="">
                </div>
                <div class="typeName">
                    {{item.name}}
                </div>
            </li>
        </ul>
        <div class="rightButton" @click="goRight" v-if="showRight">
            ＞
        </div>
        <div class="leftButton" @click="goLeft" v-if="showLeft">
            ＜
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps(['dataList']);
const router = useRouter();

const list = ref();
let currentLeft = ref(0);
let showLeft = ref(false);
let showRight = ref(true);

watch(() => currentLeft.value, () => {
    if (currentLeft.value < 0) {
        showLeft.value = true;
        showRight.value = true;
    }else if (currentLeft.value == 0) {
        showLeft.value = false;
    }
    if (currentLeft.value === -500) {
        showRight.value = false;
    }
})

const goRight = () => {
    if (currentLeft.value == -500) {
        return
    }else {
        currentLeft.value -= 250;
    }
}
const goLeft = () => {
    if (currentLeft.value == 0) {
        return
    }else {
        currentLeft.value += 250;
    }
}

const goCateHot = (cateId:number) => {
    router.push('category/' + cateId);
}
</script>

<style scoped lang='scss'>
.layout {
    position: relative;
    width: 250px;
    height: 168px;
    overflow: hidden;
    .typeList {
        position: absolute;
        top: 0;
        left: 0;
        width: 690px;
        height: 168px;
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
        .types {
            width: 62.5px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            margin: 0px 0px;
            cursor: pointer;
            user-select: none;
            .icon {
                position: relative;
                width: 30px;
                height: 30px;
                overflow: hidden;
                img {
                    position: absolute;
                    top: 0;
                    left: -30px;
                }
            }
            .typeName {
                font-size: 12px;
                color: #303030;
                &:hover {
                    color: #000;
                }
            }
        }
    }
    .rightButton {
        position: absolute;
        top: 78px;
        right: 0;
        cursor: pointer;
        user-select: none;
        height: 25px;
        border-radius: 6px;
        background-color: rgba($color: #000000, $alpha: 0.4);
        color: #fff;
    }
    .leftButton {
        position: absolute;
        top: 78px;
        left: 0;
        cursor: pointer;
        user-select: none;
        height: 25px;
        border-radius: 6px;
        background-color: rgba($color: #000000, $alpha: 0.4);
        color: #fff;
    }
}
</style>