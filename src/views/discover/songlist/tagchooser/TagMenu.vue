<template>
    <div class="tagMenu">
        <div class="all" @click="allClick" :class="{active: selectedTag==='全部歌单'}">
            <span>全部歌单</span>
        </div>
        <div class="sub">
            <ul v-for="(item,index) in tagTypes" :key="index">
                <div class="ulTitle">
                    {{item}}
                </div>
                <div class="subArea">
                    <li class="subTag" 
                    v-for="tag in filterTags(tagList, index)" 
                    :key="tag.name"
                    @click="tagClick(tag.name)"
                    :class="{selected: tag.name == selectedTag}"
                    >
                        <span>
                            {{tag.name}}
                        </span>
                    </li>
                </div>
                
            </ul>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted, toRefs, watch } from 'vue'

const props = defineProps(['tagTypes', 'tagList', 'defaultTag']);
const emit = defineEmits(['currentTagChanged']);

const {defaultTag} = toRefs(props);

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
})

const filterTags = (tags: Array<any>, type: number) => {
    let res = tags.filter((tag) => {
        return tag.category == type;
    });
    return res;
};

const tagClick = (tagName: any) => {
    selectedTag.value = tagName;
    emit('currentTagChanged', selectedTag.value);
}
const allClick = () => {
    selectedTag.value = '全部歌单';
    emit('currentTagChanged', selectedTag.value);
}
</script>

<style scoped lang='scss'>
.tagMenu {
    width: 730px;
    background-color: #fff;
    box-shadow: 0 0 5px rgba(151, 151, 151, 1);
    display: flex;
    flex-direction: column;
    .all {
        width: 100%;
        height: 55px;
        line-height: 55px;
        font-size: 14px;
        border-bottom: 1px solid #cfcfcf;
        text-align: left;
        text-indent: 40px;
        color: #303030;
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
        width: 100%;
        display: flex;
        flex-direction: column;
        color: #303030;
        ul {
            list-style: none;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-top: 20px;
            .ulTitle {
                width: 100px;
                height: 50px;
                line-height: 50px;
                font-size: 13px;
                color: #b8b8b8
            }
            .subArea {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                flex-wrap: wrap;
                width: 580px;
                .subTag {
                    width: 86px;
                    height: 30px;
                    line-height: 30px;
                    padding: 0 5px;
                    border-radius: 15px;
                    margin: 5px 0px;
                    font-size: 13px;
                    text-align: left;
                    cursor: pointer;
                    &:hover {
                        color: #ec4141;
                    }
                    span {
                        margin-left: 5px;
                        width: auto;
                    }
                    &.selected {
                        span {
                            background-color: rgb(255, 239, 241);
                            color: #ec4141;
                            padding: 5px 7px;
                            margin-left: -2px;
                            border-radius: 14px;
                        }
                    }
                }
            }
        }
    }
}
</style>