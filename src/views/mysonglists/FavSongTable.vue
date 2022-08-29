<template>
    <div class="buttons">
        <div class="button" @click="coverPlaylist()">全部播放</div>
        <div class="button" @click="addToPlaylist()">添加到播放列表</div>
    </div>
    <el-table :data="dataList" stripe 
    style="width: 100%"
    header-row-class-name="tableheader" 
    @row-dblclick="playRow">
        <el-table-column type="index" :index="1" width="35" />
        <el-table-column label="" width="30" class="icon">
            <template #default="scope">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <span class="num"></span>
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
        <el-table-column label="音乐标题" width="260" class="title">
            <template #default="scope">
                <div :title="scope.row.title">
                    {{scope.row.title}}
                </div>
            </template>
        </el-table-column>
        <el-table-column label="歌手" width="180" class-name="artist">
            <template #default="scope">
                <div :title="scope.row.artist[0].name" @click="goArtistDetail(scope.row.artist[0].id)">
                    {{scope.row.artist[0].name}}
                </div>
            </template>
        </el-table-column>
        <el-table-column label="专辑" width="120" class-name="album">
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
    </el-table>
</template>

<script setup lang='ts'>
import { ref, reactive, computed, onMounted, toRefs } from 'vue'
import { useRoute, useRouter} from 'vue-router'
import { useStore } from '@/store'

import { getSongUrl } from '@/network/play'

const route = useRoute();
const router = useRouter();
const store = useStore();

const props = defineProps(["dataList"]);
const {dataList} = toRefs(props);

// 格式化歌曲时长
const formatDuration = (duration: string):string => {
    let time = new Date(duration);
    let min:(number|string) = time.getMinutes();
    min = min < 10 ? ('0'+min ): min;
    let second:(number|string) = time.getSeconds();
    second = second < 10 ? ('0'+second) : second;
    return min + ':' + second;
}

// 点击播放事件
const playRow = (row: any) => {
    // console.log(row.id);
    getSongUrl(row.id).then((res: any) => {
        // console.log(res.data[0].url);
        store.commit('setCurrentUrl', res.data[0].url);
        store.commit('pushRecent', {
            id: row.id,
            title: row.title,
            artist: row.artist,
            type: '歌曲',
            time: +new Date(),
        });
        store.commit('pushCurrentPlaylist', {
            id: row.id,
            title: row.title,
            artist: row.artist,
            from: '歌单',
            duration: row.duration,
            url: res.data[0].url,
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
    let song = {
        id: row.id,
        title: row.title,
        artist: row.artist,
        album: row.album,
        duration: formatDuration(row.duration),
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

// 添加到播放列表
const coverPlaylist = async() => {
    store.commit('clearPlaylist');
    for(let i=0;i<dataList?.value.length;i++) {
        let res = await getSongUrl(dataList?.value[i].id);
        let realUrl = res.data[0].url;
        store.commit('pushCurrentPlaylistOrder', {
            id: dataList?.value[i].id,
            title: dataList?.value[i].title,
            artist: dataList?.value[i].artist,
            from: '歌单',
            duration: dataList?.value[i].duration,
            url: realUrl
        });
        if(i==0) {
            store.commit('setCurrentUrl', realUrl);
            store.commit('pushRecent', {
                id: dataList?.value[i].id,
                title: dataList?.value[i].title,
                artist: dataList?.value[i].artist,
                type: '歌曲',
                time: +new Date(),
            });
            store.commit('setCurrentSongId', dataList?.value[i].id);
        }
    }
};
const addToPlaylist = async() => {
    for(let i=0;i<dataList?.value.length;i++) {
        let res = await getSongUrl(dataList?.value[i].id);
        let realUrl = res.data[0].url;
        store.commit('pushCurrentPlaylistOrder', {
            id: dataList?.value[i].id,
            title: dataList?.value[i].title,
            artist: dataList?.value[i].artist,
            from: '详情',
            duration: dataList?.value[i].duration,
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

:deep(.el-progress-bar) {
    margin-top: 12px;
    padding-right: 5px;
}
</style>