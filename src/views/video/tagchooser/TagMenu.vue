<template>
    <div class="tagMenu">
        <div class="all" @click="allClick" :class="{active: selectedTag == '全部视频'}">
            <span>全部视频</span>
        </div>
        <div class="sub">
            <ul class="tagList">
                <li class="tagItem" 
                v-for="tag in tagList" 
                :key="tag.id"
                :class="{selected: tag.name == selectedTag}"
                @click="tagClick(tag.name)"
                >
                    <span>
                        {{tag.name}}
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted, toRefs, watch } from 'vue'

const props = defineProps(['tagList', 'defaultTag']);
const {defaultTag} = toRefs(props);
const emit = defineEmits(['currentTagChanged']);

let selectedTag = ref('');
onMounted(() => {
    selectedTag.value = defaultTag?.value;
});
watch(() => defaultTag?.value, () => {
    if (defaultTag?.value === selectedTag.value) {
        return
    }else {
        selectedTag.value = defaultTag?.value;
    }
});
const allClick = () => {
    selectedTag.value = '全部视频';
    emit('currentTagChanged', selectedTag.value);
}
const tagClick = (tagName: any) => {
    selectedTag.value = tagName;
    emit('currentTagChanged', selectedTag.value);
}
</script>

<style scoped lang='scss'>
.tagMenu {
    width: 650px;
    background-color: #fff;
    box-shadow: 0 0 5px rgba(151, 151, 151, 1);
    display: flex;
    flex-direction: column;
    align-items: center;
    .all {
        width: 100%;
        height: 55px;
        line-height: 55px;
        font-size: 14px;
        border-bottom: 1px solid #cfcfcf;
        text-align: left;
        text-indent: 40px;
        color: #303030;
        cursor: pointer;
        &:hover {
            color: #ec4141;
        }
        &.active {
            span {
                color: #ec4141;
                background-color: rgb(255, 239, 241);
                padding: 5px 6px;
                border-radius: 15px;
                margin-left: -6px;
            }
        }
    }
    .sub {
        width: 576px;
        color: #303030;
        margin-top: 15px;
        ul {
            list-style: none;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: flex-start;
            .tagItem {
                width: 86px;
                height: 30px;
                line-height: 30px;
                padding: 0 5px;
                border-radius: 15px;
                margin: 5px 0px;
                font-size: 12px;
                text-align: center;
                cursor: pointer;
                &:hover {
                    color: #ec4141;
                }
                span {
                    // margin-left: 5px;
                    width: auto;
                }
                &.selected {
                    span {
                        background-color: rgb(255, 239, 241);
                        color: #ec4141;
                        padding: 5px 9px;
                        // margin-left: -2px;
                        border-radius: 14px;
                    }
                }
            
            }
        }
    }
}
</style>