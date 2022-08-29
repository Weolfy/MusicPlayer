<template>
    <ul class="radioList">
        <li class="radioItem" v-for="radio in dataList" :key="radio.id">
            <div class="cover">
                <img :src="radio.picUrl" alt="电台封面">
            </div>
            <div class="radioTitle" @click="goRadioDetail(radio.id)">
                {{radio.name}}
            </div>
            <div class="playCount">
                播放量: {{filterPlayCount(radio.playCount)}}
            </div>
            <div class="songCount">
                声音{{radio.programCount}}
            </div>
            <div class="creator">
                by {{radio.dj.nickname}}
            </div>
        </li>
    </ul>
</template>

<script setup lang='ts'>
import { ref, reactive, watch } from 'vue'
import { useStore } from '@/store';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

interface radioItem {
    commentCount: number,
    createTime: number,
    desc: string,
    dj: any,
    id: number,
    picUrl: string,
    name: string,
    playCount: number,
    programCount: number,

};

let resultList: any = reactive([]);
const dataList: Array<radioItem> = reactive([]);
watch(() => store.state.searchRadio.searchState, () => {
    resultList = store.state.searchRadio.resultList;
    dataList.length = 0;
    for (let i = 0;i < resultList.length; i++) {
        dataList.push({
            commentCount: resultList[i].commentCount,
            createTime: resultList[i].createTimt,
            desc: resultList[i].desc,
            dj: resultList[i].dj,
            id: resultList[i].id,
            picUrl: resultList[i].picUrl,
            name: resultList[i].name,
            playCount: resultList[i].playCount,
            programCount: resultList[i].programCount
        })
    }
});

const filterPlayCount = (playCount: number) => {
    if (playCount < 100000) {
        return playCount;
    }else {
        return Math.floor(playCount / 10000) + '万'
    }
};

const goRadioDetail = (id:number) => {
    router.push('/detail/radio/'+ id)
}
</script>

<style scoped lang='scss'>
.radioList {
    list-style: none;
    li:nth-of-type(even) {
        background-color: #f9f9f9;
    }
    li:hover {
        background-color: #f1f1f1;
    }
    .radioItem {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 80px;
        .cover {
            width: 60px;
            height: 60px;
            border-radius: 6px;
            overflow: hidden;
            img {
                width: 60px;
                height: 60px;
            }
        }
        .radioTitle {
            width: 300px;
            text-align: left;
            margin-left: 10px;
            color: #303030;
            font-size: 14px;
            cursor: pointer;
        }
        .playCount {
            color: #a5a5a5;
            font-size: 13px;
            width: 100px;
        }
        .songCount {
            color: #a5a5a5;
            font-size: 13px;
            width: 80px;
            text-align: left;
            margin-left: 20px;
        }
        .creator {
            color: #a5a5a5;
            font-size: 13px;
            width: 80px;
        }
    }
}
</style>