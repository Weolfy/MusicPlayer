<template>
    <div class="table">
        <div class="buttons">
            <div class="button" @click="coverPlaylist()">全部播放</div>
            <div class="button" @click="addToPlaylist()">添加到播放列表</div>
        </div>
    <el-table :data="dataList" stripe 
    style="width: 100%"
    header-row-class-name="tableheader" 
    @row-dblclick="playRow"
    @row-contextmenu="popMenu"
    @row-click="clickOutside"
    >
        <el-table-column type="index" :index="1" width="35" />
        <el-table-column label="" width="30" class="icon">
            <template #default="scope">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <span class="num">{{scope.row.index < 10? '0' + scope.row.index : scope.row.index}}</span>
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
                <div :title="scope.row.name">
                    <div v-if="getCopy(scope.row)" class="noCopyright">{{scope.row.name}}</div>
                    <div v-else>{{scope.row.name}}</div> 
                    <span class="trialTags" v-if="isTrial(scope.row)">试听</span>
                    <span class="trialTags" v-else-if="isVIP(scope.row)">VIP</span>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="歌手" width="100" class-name="artist">
            <template #default="scope">
                <div :title="scope.row.ar[0].name" @click="goArtistDetail(scope.row.ar[0].id)">
                    {{scope.row.ar[0].name}}
                </div>
            </template>
        </el-table-column>
        <el-table-column label="专辑" width="140" class-name="album">
            <template #default="scope">
                <div :title="scope.row.al.name" @click="goAlbumDetail(scope.row.al.id)">
                    {{scope.row.al.name}}
                </div>
            </template>
        </el-table-column>
        <el-table-column label="时长" width="60" class="duration">
            <template #default="scope">
                {{formatDuration(scope.row.dt)}}
            </template>
        </el-table-column>
        <el-table-column label="热度" class="hot">
            <template #default="scope">
                <el-progress :percentage="scope.row.pop" 
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
</template>

<script setup lang='ts'>
import { ref, reactive, computed, toRefs } from 'vue'
import { useRoute, useRouter} from 'vue-router'
import { useStore } from '@/store'

import {ElMessage} from 'element-plus'

import { getSongUrl } from '@/network/play'

const route = useRoute();
const router = useRouter();
const store = useStore();

const props = defineProps(["dataList"]);
let {dataList} = toRefs(props);

// 格式化歌曲时长
const formatDuration = (duration: string):string => {
    let time = new Date(duration);
    let min:(number|string) = time.getMinutes();
    min = min < 10 ? ('0'+min ): min;
    let second:(number|string) = time.getSeconds();
    second = second < 10 ? ('0'+second) : second;
    return min + ':' + second;
}

// 判断版权
const getCopy = (row:any):boolean => {
    if (row.privilege) {
        return row.privilege.cp === 0;
    }else {
        return false
    }
};
const isTrial = (row:any):boolean => {
    if (row.privilege) {
        return row.fee == 1&&row.privilege.cp != 0
    }else {
        return row.fee == 1&&row.copyright != 0
    }
};
const isVIP = (row:any):boolean => {
    if (row.privilege) {
        return row.fee == 1&&row.privilege.cp == 0
    }else {
        return row.fee ==1&&row.copyright == 0
    }
};

// 点击播放事件
const playRow = (row: any) => {
    if (getCopy(row) || isVIP(row)) {
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
            title: row.name,
            artist: row.ar,
            type: '歌曲',
            time: +new Date(),
            url
        });
        store.commit('pushCurrentPlaylist', {
            id: row.id,
            title: row.name,
            artist: row.ar,
            from: '详情',
            duration: row.dt,
            url
        });
        store.commit('setCurrentSongId', row.id);
    });
    
    
}

// 处理跳转
const goArtistDetail = (id: number) => {
    router.push('/detail/artist/'+ id);
};

const goAlbumDetail = (id: number) => {
    router.push('/detail/album/'+ id);
};

const goSongDetail = (id: number) => {
    router.push('/detail/song/'+ id)
};

// 处理Liked
const pushFav = (row: any) => {
    if (row.privilege.cp == 0) {
        return
    }
    let song = {
        id: row.id,
        title: row.name,
        artist: row.ar,
        album: row.al,
        duration: row.dt,
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
    event.preventDefault();
    let menu:HTMLElement = document.querySelector('.rClickMenu')!;
    menu.style.top = ((row.no -1)*30 + event.offsetY + 53) + 'px';
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
    playRow(currentRow.value);
};

const playNext = () => {
    if (getCopy(currentRow.value) || isVIP(currentRow.value)) {
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

// 添加到播放列表相关事件
const coverPlaylist = async() => {
    store.commit('clearPlaylist');
    for(let i=0;i<dataList?.value.length;i++) {
        if (dataList?.value[i].privilege) {
            if (dataList?.value[i].privilege.cp == 0) {
                continue
            }
        }else {
            if (dataList?.value[i].fee ==1&&dataList?.value[i].copyright == 0) {
                continue
            }
        }
        let res = await getSongUrl(dataList?.value[i].id);
        let realUrl = res.data[0].url;
        store.commit('pushCurrentPlaylistOrder', {
            id: dataList?.value[i].id,
            title: dataList?.value[i].name,
            artist: dataList?.value[i].ar,
            from: '详情',
            duration: dataList?.value[i].dt,
            url: realUrl
        });
        if(i==0) {
            store.commit('setCurrentUrl', realUrl);
            store.commit('pushRecent', {
                id: dataList?.value[i].id,
                title: dataList?.value[i].name,
                artist: dataList?.value[i].ar,
                type: '歌曲',
                time: +new Date(),
            });
            store.commit('setCurrentSongId', dataList?.value[i].id);
        }
    }
};
const addToPlaylist = async() => {
    for(let i=0;i<dataList?.value.length;i++) {
        if (dataList?.value[i].privilege) {
            if (dataList?.value[i].privilege.cp == 0) {
                continue
            }
        }else {
            if (dataList?.value[i].fee ==1&&dataList?.value[i].copyright == 0) {
                continue
            }
        }
        let res = await getSongUrl(dataList?.value[i].id);
        let realUrl = res.data[0].url;
        store.commit('pushCurrentPlaylistOrder', {
            id: dataList?.value[i].id,
            title: dataList?.value[i].name,
            artist: dataList?.value[i].ar,
            from: '详情',
            duration: dataList?.value[i].dt,
            url: realUrl
        });
    }
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
        div {
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            white-space: nowrap !important;
        }
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

.table {
    position: relative;
    .buttons {
        display: flex;
        width: 100%;
        justify-content: flex-start;
        align-items: center;
        margin: 10px 0;
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