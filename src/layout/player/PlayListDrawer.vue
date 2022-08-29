<template>
    <div class="drawerLayout" v-show="drawer">
        <el-drawer
            v-model="drawer"
            title="当前播放列表"
            :direction="direction"
            :lock-scroll="false"
            :modal="false"
            :size="420"
            :show-close="false"
            modal-class="modal"
        >
            <div class="playlistLayout">
                <div class="header">
                    <div class="totalCount">
                        共{{store.state.currentPlaylist.length}}首
                    </div>
                    <div class="refresh" @click="refreshUrl">
                        刷新Url
                    </div>
                    <div class="clearPlaylist" @click="clearPlaylist">
                        清空列表
                    </div>
                </div>
                <div class="playlist">
                    <el-scrollbar>
                        <ul>
                            <li class="playlistItem" v-for="(song,index) in currentPlaylist" 
                            :key="song.id"
                            :class="{active: song.id == cId}"
                            @dblclick="clickToPlay(song)"
                            >
                                <div class="title" :title="song.title">
                                    <span>{{song.title}}</span>
                                </div>
                                <div class="artists">
                                    {{song.artist[0].name ? song.artist[0].name : song.artist}}
                                </div>
                                <div class="from" :title="'来自：' + song.from">
                                    {{song.from}}
                                </div>
                                <div class="duration">
                                    {{formatDuration(song.duration)}}
                                </div>
                                <div class="delete" @click="clickToDelete(song.id)">
                                    ×
                                </div>
                            </li>
                        </ul>
                    </el-scrollbar>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'

import {ElMessageBox} from 'element-plus'

import {getSongUrl} from '@/network/play'

const router = useRouter();
const store = useStore();

const drawer = ref(false);
const direction = ref('rtl');

const toggleShow = () => {
    drawer.value = !drawer.value;
};

const currentPlaylist = computed(() => {
    return store.getters['getCurrentPlaylist'];
});

let cId = computed(() => {
    return store.getters['getCurrentSongId'];
});

const clearPlaylist = () => {
    store.commit('clearPlaylist');
    store.commit('setCurrentUrl', '');
}

const clickToPlay = (song: any) =>{
    store.commit('setCurrentUrl', song.url);
    store.commit('pushRecent', {
        id: song.id,
        title: song.title,
        artist: song.artist,
        type: '歌曲',
        time: +new Date(),
        url: song.url
    });
    store.commit('setCurrentSongId', song.id);

}

const clickToDelete = (id: number) => {
    if (currentPlaylist.value.length == 1) {
        clearPlaylist();
    } else {
        store.commit('deleteFromPlaylist', id);
    }
};

const formatDuration = (duration: string):string => {
    let time = new Date(duration);
    let min:(number|string) = time.getMinutes();
    min = min < 10 ? ('0'+min ): min;
    let second:(number|string) = time.getSeconds();
    second = second < 10 ? ('0'+second) : second;
    return min + ':' + second;
};

// 解决刷新后数据丢失的问题
const beforeRefresh = () => {
    window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('PlayList', JSON.stringify(currentPlaylist.value));
    });
    let playlistSession = sessionStorage.getItem('PlayList');
    if(playlistSession) {
        let playlist = JSON.parse(playlistSession);
        if (playlist.length > 0) {
            store.state.currentPlaylist = playlist;
        }
    }
};

// 解决url失效的问题
const refreshUrl = async() => {
    if (currentPlaylist.value.length == 0) {
        return
    }
    for (let i = 0; i < currentPlaylist.value.length; i++) {
        let res = await getSongUrl(currentPlaylist.value[i].id);
        let url = res.data[0].url;
        currentPlaylist.value[i].url = url;
    };
    ElMessageBox.alert('Url刷新完成，请重新双击播放', '提示', {
        confirmButtonText: 'OK',
        confirmButtonClass: 'confirmBtn',
        customClass: 'refreshMessageBox'
    });
}


onMounted(() => {
    beforeRefresh();
})

defineExpose({
    toggleShow,
});
</script>

<style scoped lang='scss'>
.drawerLayout {
    position: absolute;
    width: 420px;
    height: 480px;
    top: 0;
    right: 0;
    z-index: 99;
    :deep(.modal) {
        position: absolute !important;
        width: 420px;
        height: 480px;
        top: 0px!important;
        right: 0px !important;
        z-index: 999;
    }
    .playlistLayout {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 400px;
        .header {
            width: 380px;
            height: 30px;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 0.5px solid #e0e0e0;
            .totalCount {
                font-size: 12px;
                color: #cccccc;
            }
            .refresh {
                font-size: 14px;
                color: #5188c7;
                cursor: pointer;
            }
            .clearPlaylist {
                font-size: 14px;
                color: #5188c7;
                cursor: pointer;
            }
        }
        .playlist {
            display: flex;
            flex-direction: column;
            width: 380px;
            height: 390px;
            ul {
                list-style: none;
                .playlistItem {
                    width: 100%;
                    height: 35px;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    cursor: default;
                    &:nth-of-type(odd) {
                        background-color: #fafafa;
                    }
                    &:hover {
                        background-color: #f5f5f5;
                        div {
                            color: #000;
                        }
                    }
                    &.active {
                        background-color: #e5e5e5;
                        .title, .artists, .from {
                            color: #ec4141;
                        }
                        .title {
                            position: relative;
                            span:after {
                                position: absolute;
                                content: '';
                                width: 0;
                                height: 0;
                                top: 50%;
                                left: -2px;
                                transform: translateY(-50%);
                                margin-left: 5px;
                                border-top: 4px solid transparent;
                                border-left: 6px solid #ec4141;
                                border-bottom: 4px solid transparent;
                            }
                        }
                    }
                    div {
                        text-align: left;
                        font-size: 12px;
                        color: #303030;
                    }
                    .title {
                        width: 195px;
                        text-indent: 10px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    .artists {
                        width: 90px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    .from {
                        width: 40px;
                    }
                    .duration {
                        color: #303030;
                    }
                    .delete {
                        margin-left: 6px;
                        font-size: 15px;
                        color: transparent;
                        cursor: pointer;
                        &:hover {
                            color: red;
                        }
                    }
                }
            }
        }
    }
}
:deep(.el-drawer.rtl) {
    height: 480px;
}
:deep(.el-drawer__header) {
    justify-content: flex-start;
    margin-bottom: 15px !important;
    span {
        font-size: 20px;
        font-weight: 600;
        color: #000;
        text-align: left;
    }
}
:deep(.el-drawer__body) {
    width: 380px;
    padding: 0 10px;
    overflow: hidden;
}

</style>
<style lang="scss">
.refreshMessageBox {
    .confirmBtn {
        background-color: #ec4141!important;
        border-color: #ec4141!important;
    }
    .el-message-box__headerbtn {
        &:hover {
            .el-message-box__close {
                color: #ec4141!important;
            }
        }
    }
}
</style>