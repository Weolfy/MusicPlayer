<template>
    <audio :src="cUrl" 
    id="originplayer" 
    controls autoplay
    
    ></audio>
    <div class="customPlayer">
        <div class="info">
            <div class="cover">
                <img :src="cSongImg" alt="封面">
            </div>
            <div class="tA">
                <div class="title" :title="cSongName">
                    {{cSongName}}
                </div>
                <div class="artists" v-if="cSongArtists.length > 0">
                    <div v-if="cSongArtists.length > 1">
                        <span v-for="(a,index) in cSongArtists" :key="a.id">
                            <span class="artist" :title="a.name">{{a.name}}</span>
                            <span v-if="index+1 !== cSongArtists.length">
                            &nbsp;/&nbsp;
                            </span>
                        </span>
                    </div>
                    <span v-else class="artist" :title="cSongArtists[0].name">
                        {{cSongArtists[0].name}}
                    </span>
                </div>
            </div>
            <div class="like">
                <i id="loveIcon" class="iconfont icon-aixin1-copy" title="喜欢"
                v-if="!isLiked(cId)"
                @click="pushFav"
                ></i>
                <i id="loveIcon" class="iconfont icon-aixin" title="取消喜欢"
                v-else
                @click="removeFav(cId)"
                ></i>
            </div>
        </div>
        <div class="playerControl">
            <div class="buttons">
                <div class="state">
                    <i class="iconfont icon-liebiaoxunhuan" 
                    v-if="playState == 0" 
                    @click="changePlayState"
                    title="列表循环"></i>
                    <i class="iconfont icon-danquxunhuan" 
                    v-else-if="playState == 1"
                    @click="changePlayState" 
                    title="单曲循环"></i>
                    <i class="iconfont icon-bofang-suijibofang" 
                    v-else-if="playState == 2" 
                    @click="changePlayState"
                    title="随机播放"></i>
                </div>
                <div class="pre" @click="playPre">
                    <i class="iconfont icon-shangyishou" title="上一首"></i>
                </div>
                <div class="playPause" @click="togglePlay">
                    <i class="iconfont icon-bofang" id="play" title="播放" v-if="!isPlaying"></i>
                    <i class="iconfont icon-zanting" id="pause" title="暂停" v-else></i>
                </div>
                <div class="next" @click="playNext">
                    <i class="iconfont icon-xiayishou" title="下一首"></i>
                </div>
                <div class="lyrics" @click="toggleLyricsShow">
                    词
                </div>
            </div>
            <div class="progressBar">
                <div class="currentTime">{{formatDuration(currentTime)}}</div>
                <div class="bar">
                    <el-slider v-model="progress" 
                    :show-tooltip="false" 
                    size="small"
                    :max="360"
                    :step="1"
                    @change="updateProgress"
                    @input="dragProgress"
                    />
                </div>
                <div class="totalTime">{{formatDuration(totalDuration)}}</div>
            </div>
        </div>
        <div class="otherOptions">
            <div class="volume">
                <i class="iconfont icon-yinliang" @click="toggleControl"></i>
                <div class="volumeControl" v-show="showControl">
                    <el-slider v-model="volume" 
                    vertical 
                    height="80px" 
                    :show-tooltip="false"
                    :max="1"
                    :step="0.01"
                    />
                </div>
            </div>
            <div class="download">
                <i class="iconfont icon-xiazai" title="下载" @click="triggerDownload"></i>
                <a :href="cUrl" v-show="false" ref="downloadBtn" target="_blank"></a>
            </div>
            <div class="playlist" @click="togglePlaylistShow">
                <i class="iconfont icon-bofangliebiao" title="播放列表"></i>
            </div>
        </div>
    </div>
    <div class="lyricPanel" v-show="lyricsShow">
        <LyricComp :dataList="cLyrics"/>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, computed, watch, onMounted, inject, onBeforeUnmount } from 'vue'
import { useStore } from '@/store/index';

import { getSongDetail } from '@/network/search';
import { getSongLyrics } from '@/network/getDetail';

import LyricComp from './LyricComp.vue';

import Axios from 'axios';

import defaultImg from '@/assets/img/default.png';

const store = useStore();

let cUrl = computed(() => {
    return store.getters['getCurrentUrl'];
});
let cId = computed(() => {
    return store.getters['getCurrentSongId'];
});
let cSongName = ref('');
let cSongImg = ref(defaultImg);
let cSongArtists:any = ref([]);
let cSongAlbum = ref();
let cSongDuration = ref(0);
let cPlaylist = computed(() =>{
    return store.getters['getCurrentPlaylist'];
});
let cLyrics = ref();

let lyricsShow = ref(false);
let lyricPanel:HTMLDivElement;
let isPanelMoving = ref(false);

// liked相关
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
const pushFav = () => {
    let song = {
        id: cId.value,
        title: cSongName.value,
        artist: cSongArtists.value,
        album: cSongAlbum.value,
        duration: cSongDuration.value,
    };
    store.commit('pushFav', song);
};
const removeFav = (id: number|string) => {
    store.commit('removeFav', id);
}

// 播放和暂停相关
let isPlaying = ref(false);
const play = () =>{
    if(cPlaylist.value.length == 0) {return};
    isPlaying.value = true;
    player.play();
};
const pause = () =>{
    isPlaying.value = false;
    player.pause();
};
const togglePlay = () => {
    if(isPlaying.value === true) {
        pause();
    }else {
        play();
    }
};
// 上一首、下一首
const playPre = () => {
    if(cPlaylist.value.length == 0) {return};
    let currentSong = cPlaylist.value.filter((item:any) => {
        return item.id == cId.value;
    });
    let index = cPlaylist.value.indexOf(currentSong[0]);
    let length = cPlaylist.value.length;
    if (index == 0) {
        let url = cPlaylist.value[length - 1].url;
        store.commit('setCurrentUrl', url);
        store.commit('pushRecent', {
            id: cPlaylist.value[length - 1].id,
            title: cPlaylist.value[length - 1].title,
            artist: cPlaylist.value[length - 1].artist,
            type: '歌曲',
            time: +new Date(),
            url: url,
        });
        store.commit('setCurrentSongId', cPlaylist.value[length - 1].id);
    }else {
        let url = cPlaylist.value[index - 1].url;
        store.commit('setCurrentUrl', url);
        store.commit('pushRecent', {
            id: cPlaylist.value[index - 1].id,
            title: cPlaylist.value[index - 1].title,
            artist: cPlaylist.value[index - 1].artist,
            type: '歌曲',
            time: +new Date(),
            url: url,
        });
        store.commit('setCurrentSongId', cPlaylist.value[index - 1].id);
    }
};
const playNext = () => {
    if(cPlaylist.value.length == 0) {return};
    let currentSong = cPlaylist.value.filter((item:any) => {
        return item.id == cId.value;
    });
    let index = cPlaylist.value.indexOf(currentSong[0]);    
    if (index + 1 == cPlaylist.value.length) {
        let url = cPlaylist.value[0].url;
        store.commit('setCurrentUrl', url);
        store.commit('pushRecent', {
            id: cPlaylist.value[0].id,
            title: cPlaylist.value[0].title,
            artist: cPlaylist.value[0].artist,
            type: '歌曲',
            time: +new Date(),
            url: url,
        });
        store.commit('setCurrentSongId', cPlaylist.value[0].id);
    }else {
        let url = cPlaylist.value[index+1].url;
        store.commit('setCurrentUrl', url);
        store.commit('pushRecent', {
            id: cPlaylist.value[index+1].id,
            title: cPlaylist.value[index+1].title,
            artist: cPlaylist.value[index+1].artist,
            type: '歌曲',
            time: +new Date(),
            url: url,
        });
        store.commit('setCurrentSongId', cPlaylist.value[index+1].id);
    }
};
const playRandom = () => {
    let randomIndex = Math.floor(Math.random()*(cPlaylist.value.length));
    console.log(randomIndex);
    let url = cPlaylist.value[randomIndex].url;
    store.commit('setCurrentUrl', url);
    store.commit('pushRecent', {
        id: cPlaylist.value[randomIndex].id,
        title: cPlaylist.value[randomIndex].title,
        artist: cPlaylist.value[randomIndex].artist,
        type: '歌曲',
        time: +new Date(),
        url: url,
    });
    store.commit('setCurrentSongId', cPlaylist.value[randomIndex].id);
}

// 播放模式切换
let playState = ref(0);
const changePlayState = () => {
    if (playState.value < 2) {
        playState.value += 1;
    }else if(playState.value = 2){
        playState.value = 0;
    }
};
// 音量控制面板的显示
let showControl = ref(false);
const toggleControl = () => {
    if(showControl.value == false) {
        showControl.value = true;
    }else {
        showControl.value = false;           
    }
};

// 播放器核心事件
let progress = ref(0);
let currentTime = ref(0);
let totalDuration = ref(0);
let player:HTMLAudioElement;
let volume = ref(0.5);
const updateEvent = () =>{
    currentTime.value = player.currentTime;
    let percent = (currentTime.value / totalDuration.value)*360;
    progress.value = Math.floor(percent);
    if(currentTime.value == totalDuration.value) {
        isPlaying.value = false;
    }
}
onMounted(() => {
    saveMode();
    player = document.querySelector('#originplayer')!;
    player.volume = volume.value;
    player.addEventListener('loadedmetadata', () => {
        getSongDetail(cId.value).then((res:any) => {
            // console.log(res);
            cSongName.value = res.songs[0].name;
            cSongImg.value = res.songs[0].al.picUrl;
            cSongArtists.value = res.songs[0].ar;
            cSongAlbum.value = res.songs[0].al;
            cSongDuration.value = res.songs[0].dt;
            if(cSongName.value == null) {
                let latestSong = store.getters['getRecent'][0];
                cSongName.value = latestSong.title;
                cSongArtists.value = latestSong.artist;
            }
        });
        getSongLyrics(cId.value).then((res:any) => {
            // console.log(res);
            cLyrics.value = res.lrc.lyric;
        })
    })
    player.addEventListener('play', () => {
        isPlaying.value = true;
        totalDuration.value = player.duration;
    });
    player.addEventListener('timeupdate', updateEvent);
    player.addEventListener('ended', () => {
        if(playState.value === 1) {
            currentTime.value = 0;
            player.loop = true;
            player.currentTime = 0;
            player.play();
        }else if(playState.value === 0) {
            if (cPlaylist.value.length == 1) {
                currentTime.value = 0;
                player.loop = true;
                player.currentTime = 0;
                player.play();
            }else {
                player.loop = false;
                playNext();
                // console.log('下一首');
            }
        }else if(playState.value === 2) {
            player.loop = false;
            // console.log('随机下一首');
            playRandom();
        }
    });

    getFavData();
    getCollectionData();
    lyricPanel = document.querySelector('.lyricPanel')!;
    let x:number,y:number,l:number,t:number;
    lyricPanel.addEventListener('mousedown', (e:MouseEvent) => {
        x = e.clientX;
        y = e.clientY;

        l = lyricPanel.offsetLeft;
        t = lyricPanel.offsetTop;

        isPanelMoving.value = true;
    });
    document.addEventListener('mousemove', (e:MouseEvent) => {
        if(isPanelMoving.value == false) {
            return;
        };
        let mouseX = e.clientX;
        let mouseY = e.clientY;
        let nLeft = mouseX - (x-l);
        let nTop = mouseY - (y-t);
        lyricPanel.style.left = nLeft + 'px';
        lyricPanel.style.top = nTop + 'px';
    });
    document.addEventListener('mouseup', (e:MouseEvent) => {
        isPanelMoving.value = false;
    })
});
// 音量设置
watch(() => volume.value, () => {
    player.volume = volume.value;
});
// 格式化从audio标签获取的时间簇
const formatDuration = (duration: number):string => {
    let min:any = Math.floor(duration / 60);
    let second:any = Math.floor(duration % 60);
    min = min < 10 ? ('0'+min ): min;
    second = second < 10 ? ('0'+second) : second;
    return min + ':' + second;
};

// 进度条的更新与拖动
const updateProgress = (val:any) => {
    currentTime.value = totalDuration.value * (val/360);
    player.currentTime = currentTime.value;
    player.addEventListener('timeupdate', updateEvent);
};

const dragProgress = (val: any) =>{
    player.removeEventListener('timeupdate', updateEvent);
    currentTime.value = totalDuration.value * (val/360);

}

// 歌词相关
const toggleLyricsShow = () => {
    if (lyricsShow.value === true) {
        lyricsShow.value = false;
    }else {
        lyricsShow.value = true;
    }
}

// 下载相关
const downloadBtn = ref();
const triggerDownload = () => {
    download(cUrl.value);
};
async function download(fileUrl:string) {
    let res = await Axios({
        method: 'get',
        url: fileUrl,
        responseType: "blob"
    });
    let newUrl = window.URL.createObjectURL(res.data);
    let a = document.createElement("a");
    a.href = newUrl;
    a.download = cSongArtists.value[0].name + '-' + cSongName.value + '.mp3';
    a.click();
    a.remove();
    window.URL.revokeObjectURL(newUrl);
}

// 播放列表相关
const playlistDrawer:any = inject('playlistDrawer');
const togglePlaylistShow = () => {
    playlistDrawer.value.toggleShow();
}

// 获取localstorage里的数据
const getFavData = () => {
    let favLocal = localStorage.getItem('myFav');
    if(favLocal) {
        let favList = JSON.parse(favLocal);
        if(favList.length > 0) {
            store.state.myFavourite = favList;
        }
    }
}
const getCollectionData = () => {
    let albumCollectionLocal = localStorage.getItem('albumCollection');
    if(albumCollectionLocal) {
        let album = JSON.parse(albumCollectionLocal);
        if (album.length > 0) {
            store.state.albumCollection = album;
        }
    };
    let artistCollectionLocal = localStorage.getItem('artistCollection');
    if(artistCollectionLocal) {
        let artist = JSON.parse(artistCollectionLocal);
        if (artist.length > 0) {
            store.state.artistCollection = artist;
        }
    };
}

// 播放模式、音量的记录
const saveMode = () => {
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('playState',JSON.stringify(playState.value));
        localStorage.setItem('playVolume',JSON.stringify(volume.value));
    });
    let localPlayState = localStorage.getItem('playState');
    let localPlayVolume = localStorage.getItem('playVolume');
    if(localPlayState) {
        let playMode = JSON.parse(localPlayState);
        playState.value = playMode;
    };
    if(localPlayVolume) {
        let playVolume = JSON.parse(localPlayVolume);
        volume.value = playVolume;
    }
}

</script>

<style scoped lang='scss'>
#originplayer {
    width: 1000px;
    height: 73px;
    display: none;
}
.lyricPanel {
    position: absolute;
    top: 360px;
    left: 180px;
    z-index: 999;
}
.customPlayer {
    position: relative;
    width: 1000px;
    height: 73px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .info {
        width: 260px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .cover {
            margin-left: 15px;
            width: 48px;
            height: 48px;
            border-radius: 3px;
            overflow: hidden;
            img {
                width: 48px;
                height: 48px;
            }
        }
        .tA {
            margin-left: 10px;
            width: 150px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            color: #303030;
            .title {
                width: 150px;
                font-size: 14px;
                margin-bottom: 3px;
                text-align: left;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                cursor: pointer;
                &:hover {
                    color: #000;
                }
            }
            .artists {
                font-size: 13px;
                .artist {
                    cursor: pointer;
                    &:hover {
                        color: #000;
                    }
                }
            }
        }
        .like {
            cursor: pointer;
        }   
    }
    .playerControl {
        width: 480px;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .buttons {
            width: 230px;
            margin-top: 5px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            color: #2e2e2e;
            cursor: default;
            div {
                cursor: pointer;
                &:hover {
                    color: #ec4141;
                }
            }
            .playPause {
                width: 34px;
                height: 34px;
                line-height: 34px;
                text-align: center;
                border-radius: 17px;
                cursor: pointer;
                &:hover {
                    background-color: #e5e5e5;
                }
                #play {
                    margin-left: 4px;
                }
            }
            .lyrics {
                font-size: 12px;
                margin-bottom: 2px;
            }
        }
        .progressBar {
            width: 480px;
            height: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            .bar {
                width: 360px;
                :deep(.el-slider__runway) {
                    height: 3px;
                    cursor: default !important;
                    &:hover {
                        height: 6px;
                        .el-slider__bar {
                            height: 6px;
                        }
                        .el-slider__button {
                            display: inline-block;
                        }
                    }
                    .el-slider__bar {
                        height: 3px;
                        background-color: #ec4141;
                    }
                    .el-slider__button-wrapper {
                        cursor: default;
                    }
                    .el-slider__button {
                        display: none;
                        width: 8px;
                        height: 8px;
                        background-color: #ec4141;
                        border: none;
                        cursor: default;
                    }
                }
            }
            .currentTime, .totalTime {
                font-size: 11px;
                color: #9f9f9f;
                margin: 0 8px;
            }
        }
    }
    .otherOptions {
        width: 260px;
        height: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        color: #2e2e2e;
        div {
            margin-right: 30px;
            font-size: 18px;
            i {
                cursor: pointer;
            }
            &.volume {
                position: relative;
                font-weight: 600;
                .volumeControl {
                    width: 30px;
                    height: 100px;
                    box-shadow: 0 0 8px #888888;
                    position: absolute;
                    background-color: #fff;
                    top: -105px;
                    left: -7px;
                    z-index: 999;
                    text-align: center;
                    :deep(.el-slider__runway) {
                        height: 4px;
                        cursor: default !important;
                        margin: 0 12px;
                        .el-slider__bar {
                            height: 4px;
                            background-color: #ec4141;
                        }
                        .el-slider__button-wrapper {
                            cursor: default;   
                        }
                        .el-slider__button {
                            width: 10px;
                            height: 10px;
                            background-color: #ec4141;
                            border: none;
                            cursor: default;
                        }
                    }
                }
            }
            &:hover {
                color: #000;
            }
        }
    }
} 
</style>