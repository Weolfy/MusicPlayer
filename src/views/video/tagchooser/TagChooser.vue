<template>
    <div class="tagChooser">
        <div class="button" @click="toggleShow">
            {{currentTag + '  〉'}}
        </div>
        <div class="menu" v-show="showMenu">
            <TagMenu 
            :defaultTag="currentTag"
            :tagList="tagList"
            @currentTagChanged="currentTagChanged"
            />
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted, watch } from 'vue'

import { getVideoTags } from '@/network/getVideoData';

import TagMenu from './TagMenu.vue'

const emit = defineEmits(['tagChanged']);

let currentTag = ref('全部视频');
let tagList = ref([]);
let showMenu = ref(false);

const toggleShow = () => {
    showMenu.value = !showMenu.value;
}

onMounted(() => {
    getVideoTags().then((res:any) => {
        tagList.value = res.data;
    })
});

const currentTagChanged = (tagname:any) => {
    currentTag.value = tagname;
    showMenu.value = false;
};

watch(() => currentTag.value, () => {
    emit('tagChanged', currentTag.value);
});
</script>

<style scoped lang='scss'>
.tagChooser {
        position: relative;
        .button {
            width: 90px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            font-size: 14px;
            border-radius: 15px;
            border: 1px solid #d8d8d8;
            color: #000;
            cursor: pointer;
        }
        .menu {
            position: absolute;
            top: 40px;
        }
    }
</style>