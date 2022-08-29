<template>
    <div class="layout">
        <div class="tagChooser">
            <div class="button" @click="toggleShow">
                {{currentTag + '  〉'}}
            </div>
            <div class="menu" v-show="showMenu">
                <TagMenu 
                :tagTypes="tagTypes" 
                :tagList="tagList"
                :defaultTag="currentTag"
                @currentTagChanged="currentTagChanged"
                />
            </div>
        </div>
        <div class="hotTags">
            <ul>
                <li v-for="item in hotTags" class="tag" @click="hotClick(item.playlistTag.name)">
                    <span>
                        {{item.playlistTag.name}}
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted, watch } from 'vue'

import { getCateList } from '@/network/getDiscoverData';

import TagMenu from './TagMenu.vue';
const props = defineProps(['hotTags']);
const emit = defineEmits(['tagChanged']);

let currentTag = ref('日语');
let tagList = ref([]);
let tagTypes = ref([]);
let showMenu = ref(false);

onMounted(() => {
    getCateList().then((res:any) => {
        tagList.value = res.sub;
        tagTypes.value = res.categories;
    })
});

const currentTagChanged = (tagname:any) => {
    currentTag.value = tagname;
    showMenu.value = false;
};

const toggleShow = () => {
    showMenu.value = !showMenu.value;
};

const hotClick = (hot: any) => {
    currentTag.value = hot;
    showMenu.value = false;
}

watch(() => currentTag.value, () => {
    emit('tagChanged', currentTag.value);
})
</script>

<style scoped lang='scss'>
.layout {
    display: flex;
    width: auto;
    justify-content: space-between;
    align-items: center;
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
    .hotTags {
        ul {
            list-style: none;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .tag {
                color: #676767;
                font-size: 12px;
                margin: 0 10px;
                cursor: default;
                &:hover {
                    color: #303030;
                }
            }
        }
    }
}
</style>