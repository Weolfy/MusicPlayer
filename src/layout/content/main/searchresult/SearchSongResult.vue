<template>
    <div class="table">
    <el-table :data="dataList" 
    style="width: 100%"
    header-row-class-name="tableheader"
    @row-dblclick="playRow"
    @row-contextmenu="popMenu"
    @row-click="clickOutside"
    v-loading="loading"> 

        <el-table-column label="" width="60" class="icon">
            <template #default="scope">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <span class="num">{{scope.row.num < 10? '0' + scope.row.num : scope.row.num}}</span>
                    <i id="loveIcon" class="iconfont icon-aixin1-copy" title="喜欢"
                    @click="pushFav(scope.row)"
                    v-if="!isLiked(scope.row.id)"
                    ></i>
                    <i id="loveIcon" class="iconfont icon-aixin" title="取消喜欢"
                    @click="removeFav(scope.row.id)"
                    v-else
                    ></i>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="音乐标题" width="230" class="title">
            <template #default="scope">
                <div :title="scope.row.title">
                    <div v-if="scope.row.copyright === 0" class="noCopyright">{{scope.row.title}}</div>
                    <div v-else>{{scope.row.title}}</div> 
                    <span class="trialTags" v-if="scope.row.fee == 1&&scope.row.copyright != 0">试听</span>
                    <span class="trialTags" v-else-if="scope.row.fee == 1&&scope.row.copyright == 0">VIP</span>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="歌手" width="100" class-name="artist" >
            <template #default="scope">
                <div :title="scope.row.artist[0].name" @click="goArtistDetail(scope.row.artist[0].id)">
                    {{scope.row.artist[0].name}}
                </div>
            </template>
        </el-table-column>
        <el-table-column label="专辑" width="140" class-name="album">
            <template #default="scope">
                <div :title="scope.row.album.name" @click="goAlbumDetail(scope.row.album.id)">
                    {{scope.row.album.name}}
                </div>
            </template>
        </el-table-column>
        <el-table-column label="时长" width="60" class="duration">
            <template #default="scope">
                {{formatDuration(scope.row.duration)}}
            </template>
        </el-table-column>
        <el-table-column label="热度" class="hot">
            <template #default="scope">
                <el-progress :percentage="scope.row.hot" 
                :show-text="false" 
                color="#c8c8c8"
                />
            </template>
        </el-table-column>
        
    </el-table>
        <div class="rClickMenu" v-show="isShow">
            <ul>
                <li class="menuItem" @click="goSongDetail(currentRow.id)">查看详情</li>
                <li class="menuItem" @click="play">播放</li>
                <li class="menuItem" @click="playNext">下一首播放</li>
            </ul>
        </div>
    </div>
    <div class="pagi">
        <el-pagination background layout="prev, pager, next" 
        :page-size="50"
        v-model:currentPage="cPage"
        :total="songCount" />
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, computed, watch, onMounted } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import { useStore } from '@/store/index';

import {ElMessage} from 'element-plus';

import {searchSong} from '@/network/search';

import {getSongUrl} from '@/network/play';

const route = useRoute();
const router = useRouter();
const store = useStore();

const props = defineProps(['loading']);

interface songItem {
    loved: boolean,
    title: string,
    artist: any,
    album: any,
    duration: string,
    hot: number,
    id: number,
    num: number,
    mvid: number,
    fee: number,
    copyright: number,
}


let resultList:any= reactive([]);
const dataList:Array<songItem> = reactive([]);
watch(() => store.state.searchStatus, () => {
    if (store.getters['getSongCount'] == 0) {
        dataList.length = 0;
        ElMessage({
            message: '抱歉，未能找到 "'+route.params.keywords+'" 相关搜索结果',
            offset: 250,
            duration: 3000,
            customClass: 'cpMessage'
        });
        let elm:NodeListOf<HTMLElement> = document.querySelectorAll('.cpMessage.el-message');
        if(elm) {
            for (let i=0;i<elm.length;i++) {
                elm[i].style.cssText = ' --el-message-bg-color: #000; --el-message-border-color: #000; --el-message-text-color: #ec4141;'
            };
        }
        return
    }
    resultList = store.getters['getSongResult'];
    dataList.length = 0;
    for (let i = 0;i < resultList.length; i++) {
        dataList.push({
            loved: false,
            title: resultList[i].name,
            artist: resultList[i].ar,
            album: resultList[i].al,
            duration: resultList[i].dt,
            hot: resultList[i].pop,
            id: resultList[i].id,
            num: i + 1,
            mvid: resultList[i].mv,
            fee: resultList[i].fee,
            copyright: resultList[i].privilege.cp,
        });
    };
    // console.log(dataList);
})

const formatDuration = (duration: string):string => {
    let time = new Date(duration);
    let min:(number|string) = time.getMinutes();
    min = min < 10 ? ('0'+min ): min;
    let second:(number|string) = time.getSeconds();
    second = second < 10 ? ('0'+second) : second;
    return min + ':' + second;
}


const playRow = (row: any) => {
    if (row.copyright == 0) {
        ElMessage({
            message: '该歌曲因版权或会员原因，暂时无法播放，敬请谅解',
            offset: 250,
            duration: 2000,
            customClass: 'cpMessage'
        });
        let elm:NodeListOf<HTMLElement> = document.querySelectorAll('.cpMessage.el-message');
        if(elm) {
            for (let i=0;i<elm.length;i++) {
                elm[i].style.cssText = ' --el-message-bg-color: #000; --el-message-border-color: #000; --el-message-text-color: #ec4141;'
            };
        }
        return
    }
    // console.log(row.id);
    getSongUrl(row.id).then((res: any) => {
        // console.log(res.data[0].url);
        let url = res.data[0].url;
        store.commit('setCurrentUrl', url);
        store.commit('pushRecent', {
            id: row.id,
            title: row.title,
            artist: row.artist,
            type: '歌曲',
            time: +new Date(),
            url: url,
        });
        store.commit('pushCurrentPlaylist', {
            id: row.id,
            title: row.title,
            artist: row.artist,
            from: '搜索',
            duration: row.duration,
            url: url,
        });
        store.commit('setCurrentSongId', row.id);
    });
    
}

// 处理分页
const songCount = computed(() => {
    return store.getters['getSongCount'];
});
let cPage = ref(1);
watch(() => cPage.value, () => {
    searchSong(route.params.keywords as string, (cPage.value-1)*50).then((res:any) => {
        // console.log(res);
        store.commit('setSongResult', res.result.songs);
        store.commit('changeStatus');
    });
})

// 处理跳转
const goArtistDetail = (id: number) => {
    router.push('/detail/artist/'+ id);
};

const goAlbumDetail = (id: number) => {
    router.push('/detail/album/'+ id);
};

const goSongDetail = (id: number) => {
    router.push('/detail/song/'+ id)
}

// 处理Liked
const pushFav = (row: any) => {
    if (row.copyright == 0) {
        return
    }
    let song = {
        id: row.id,
        title: row.title,
        artist: row.artist,
        album: row.album,
        duration: row.duration,
    };
    store.commit('pushFav', song);
};
const removeFav = (id: number) => {
    store.commit('removeFav', id);
}

let likedList = computed(() => {
    return store.getters['getFav'];
});

const isLiked = computed(() => {
    return function(id: number) {
        let result = likedList.value.some((item:any) => {
            return item.id == id;
        });
        return result;
    }
});


// 右键菜单相关
let isShow = ref(false);
let currentRow = ref();
const popMenu = (row:any, column:any, event: MouseEvent) => {
    showMenu();
    // console.log(row);
    // console.log(event.offsetX,event.offsetY);
    
    event.preventDefault();
    let menu:HTMLElement = document.querySelector('.rClickMenu')!;
    menu.style.top = ((row.num -1)*31 + event.offsetY + 23) + 'px';
    menu.style.left = (event.offsetX + 74) + 'px';
    currentRow.value = row;
}
const showMenu = () => {
    isShow.value = true;
};
const hideMenu = () => {
    isShow.value = false;
};
const clickOutside = (row:any, column:any, event: any) => {
    let menu:HTMLElement = document.querySelector('.rClickMenu')!;
    if(!event.path.includes(menu)) {
        hideMenu();
    }
};

const play = () => {
    hideMenu();
    playRow(currentRow.value);
}
const playNext = () => {
    hideMenu();
    if (currentRow.value.copyright == 0) {
        ElMessage({
            message: '该歌曲因版权或会员原因，暂时无法播放，敬请谅解',
            offset: 250,
            duration: 2000,
            customClass: 'cpMessage'
        });
        let elm:NodeListOf<HTMLElement> = document.querySelectorAll('.cpMessage.el-message');
        if(elm) {
            for (let i=0;i<elm.length;i++) {
                elm[i].style.cssText = ' --el-message-bg-color: #000; --el-message-border-color: #000; --el-message-text-color: #ec4141;'
            };
        }
        return
    }
    getSongUrl(currentRow.value.id).then((res: any) => {
        // console.log(res.data[0].url);
        let url = res.data[0].url;
        store.commit('pushCurrentPlaylist', {
            id: currentRow.value.id,
            title: currentRow.value.title,
            artist: currentRow.value.artist,
            from: '搜索',
            duration: currentRow.value.duration,
            url: url,
        });
    });
}
</script>

<style scoped lang='scss'>

:deep(.el-table__row) {
    height: 15px !important;
    .cell {
        height: 30px !important;
        padding-right: 0 !important;
        font-size: 13px !important;
        line-height: 30px !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        white-space: nowrap !important;
        cursor: default;
        div {
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            white-space: nowrap !important;
        }
    }
    &:nth-of-type(odd) {
        background-color: #f9f9f9;
    }
    &:hover {
        background-color: #f0f1f2;
    }
}


:deep(.el-table__cell) {
    padding: 0 !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
}

:deep(.tableheader) {
    th {
        .cell {
            color: #676767;
            font-size: 13px;
            font-weight: 500;
            cursor: default;
            &:hover {
                color: #676767;
            }
        }
    }
}

.trialTags {
    position: absolute;
    top: 5px;
    right: 0px;
    width: 24px;
    height: 15px;
    line-height: 15px;
    padding: 1px 2px;
    text-align: center;
    font-size: 5px !important;
    color: #ec4141;
    border-radius: 3px;
    border: 1px solid #ec4141;
    background-color: transparent;
    z-index: 9;
}
.noCopyright {
    color: #bcbcbc
}
:deep(.artist) {
    .cell {
        color: #676767;
        cursor: pointer;
        &:hover {
            color: #303030;
        }
    }
}
:deep(.album) {
    .cell {
        color: #676767;
        cursor: pointer;
        &:hover {
            color: #303030;
        }
    }
}
.num {
    color: #bcbcbc;
}

#loveIcon {
    cursor: pointer;
}

:deep(.el-progress-bar) {
    margin-top: 12px;
    padding-right: 5px;
}

.pagi {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    padding-bottom: 30px;
}

:deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active ) {
    background-color: #ec4141 !important;
}
.table {
    position: relative;
}
.rClickMenu {
    width: 240px;
    height: auto;
    position: absolute;
    top: 0px;
    left: 0px;
    border-radius: 6px;
    box-shadow: 0 0 10px rgba(151, 151, 151, 1);
    color: #303030;
    background-color: #fff;
    z-index: 999;
    cursor: default;
    ul {
        width: 100%;
        list-style: none;
        display: flex;
        flex-direction: column;
        .menuItem {
            width: 100%;
            height: 35px;
            font-size: 13px;
            line-height: 35px;
            text-align: left;
            text-indent: 15px;
            &:hover {
                background-color: #ececec;
            }
            &:first-of-type {
                margin-top: 10px;
            }
            &:last-of-type {
                margin-bottom: 5px;
            }
        }
    }
}
</style>