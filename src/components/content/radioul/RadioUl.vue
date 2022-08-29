<template>
    <div class="radioList">
        <div class="buttons">
            <div class="button" @click="coverPlaylist">播放该电台</div>
            <div class="button" @click="addToPlaylist">添加到播放列表</div>
        </div>
        <div class="programCount">共{{programCount}}期</div>
        <ul class="programList" v-infinite-scroll="load">
            <li class="program" v-for="(program, index) in dataList" :key="program.id" @dblclick="playProgram(program)">
                <div class="programLayout">
                    <div class="index">
                        {{index+1}}
                    </div>
                    <div class="cover">
                        <img :src="program.coverUrl" alt="封面">
                    </div>
                    <div class="name">
                        {{program.name}}
                    </div>
                    <div class="playCount">
                        播放量: {{program.listenerCount}}
                    </div>
                    <div class="like">
                        喜欢: {{program.likedCount}}
                    </div>
                    <div class="uploadDate">
                        {{formatDate(program.createTime)}}
                    </div>
                    <div class="duration">
                        {{formatDuration(program.duration)}}
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, toRefs, watch,computed } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '@/store';

import { getRadioSongs, getProgramDetail } from '@/network/getDetail';
import { getSongUrl } from '@/network/play';

const route = useRoute();
const router = useRouter();
const store = useStore();

const props = defineProps(['programCount', 'programData']);

let dataList:Array<any> = reactive([]);
watch(() => props.programData, () => {
    dataList.push(...props.programData)
})
let currentIndex = ref(0);
let cPlaylist = computed(() => {
    return store.getters['getCurrentPlaylist']
});

interface resType {
    programs: Array<any>
}

const load = () => {
    if (currentIndex.value < props.programCount) {
        currentIndex.value += 30;
        getRadioSongs(route.params.id as string, 30, currentIndex.value).then((res:resType) => {
            // console.log(res);
            for(let i=0;i < res.programs.length;i++) {
                dataList.push(res.programs[i]);
                // console.log(res.programs[i]);
            }
        })
    }else {
        return;
    }
};

const formatDate = (timestamp: number|string):string=> {
    let time = new Date(timestamp);
    let year:(number|string) = time.getFullYear();
    let month:(number|string) = time.getMonth();
    month = month < 10 ? '0'+(month+1) : (month+1);
    let day:(number|string) = time.getDate();
    day = day < 10 ? '0'+day : day;
    return year+'-'+month+'-'+day;
}
const formatDuration = (timestamp: number|string):string=> {
    let time = new Date(timestamp);
    let min: (number|string) = time.getMinutes();
    min = min < 10? '0'+min : min;
    let seconds: (number|string) = time.getSeconds();
    seconds = seconds < 10? '0'+seconds : seconds;
    return min + ':' +seconds;
}

const getRealUrl = async(id: number) => {
    const programInfo = await getProgramDetail(id);
    const realSong = await getSongUrl(programInfo.program.mainSong.id);
    return realSong;
}

const playProgram = (program: any) => {
    getRealUrl(program.id).then((realSong: any) => {
        // console.log(program);
        let realUrl = realSong.data[0].url;
        store.commit('setCurrentUrl', realUrl);
        store.commit('pushRecent', {
            id: realSong.data[0].id,
            title: program.name,
            artist: [{name:program.radio.name}],
            type: '电台',
            time: +new Date(),
        });
        store.commit('pushCurrentPlaylist', {
            id: realSong.data[0].id,
            title: program.name,
            artist: [{name:program.radio.name}],
            from: '电台',
            duration: program.duration,
            url: realUrl
        });
        store.commit('setCurrentSongId', realSong.data[0].id);
    });
    
};

const coverPlaylist = () =>{
    store.commit('clearPlaylist');
    for(let i=0;i < dataList.length;i++) {
        getRealUrl(dataList[i].id).then((realSong:any) => {
            let realUrl = realSong.data[0].url;
            store.commit('pushCurrentPlaylist', {
                id: realSong.data[0].id,
                title: dataList[i].name,
                artist: [{name:dataList[i].radio.name}],
                from: '电台',
                duration: dataList[i].duration,
                url: realUrl
            });
        })
    };
};
const addToPlaylist = () => {
    for(let i=0;i < dataList.length;i++) {
        getRealUrl(dataList[i].id).then((realSong:any) => {
            let realUrl = realSong.data[0].url;
            store.commit('pushCurrentPlaylist', {
                id: realSong.data[0].id,
                title: dataList[i].name,
                artist: [{name:dataList[i].radio.name}],
                from: '电台',
                duration: dataList[i].duration,
                url: realUrl
            });
        })
    }
};
</script>

<style scoped lang='scss'>
.radioList {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #303030;
    width: 690px;
    .buttons {
        width: 690px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .button {
            width: 130px;
            height: 30px;
            line-height: 30px;
            margin-right: 15px;
            background-color: #ec4141;
            border-radius: 15px;
            font-size: 14px;
            color: #fff;
            cursor: pointer;
            &:hover {
                background-color: #cc3232;
            }
        }
    }
    .programCount {
        width: 100%;
        font-size: 13px;
        text-align: left;
    }
    .programList {
        list-style: none;
        width: 100%;
        li:nth-of-type(even) {
            background-color: #f9f9f9;
        }
        li:hover {
            background-color: #f1f1f1;
        }
        .programLayout {
            display: flex;
            align-items: center;
            width: 100%;
            height: 80px;
            color: #a9a9a9;
            .index {
                width: 50px;
                font-size: 13px;
            }
            .cover {
                width: 80px;
                img {
                    width: 60px;
                    height: 60px;
                    border-radius: 4px;
                }
            }
            .name {
                width: 230px;
                color: #303030;
                font-size: 14px;
                text-align: left;
            }
            .playCount {
                width: 90px;
                font-size: 12px;
            }
            .like {
                width: 90px;
                font-size: 12px;
            }
            .uploadDate {
                width: 90px;
                font-size: 12px;
            }
            .duration {
                font-size: 12px;
            }
        }
    }
}
</style>