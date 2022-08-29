<template>
    <div class="popoverLayout">
        <div class="hotSearch" v-if="state">
        <el-scrollbar>
            <div class="title">热搜榜</div>
            <ul class="rank">
                <li class="rankItem" v-for="(item,index) in dataList" :key="item.searchWord"
                @click="itemClick(item.searchWord)"
                >
                    <div class="index">
                        {{index + 1}}
                    </div>
                    <div class="info">
                        <div class="titleAndHot">
                            <div class="ranktitle">{{item.searchWord}}</div>
                            <div class="hot">{{item.score}}</div>
                        </div>
                        <div class="desc" v-if="item.content">{{item.content}}</div>
                    </div>
                </li>
            </ul>
        </el-scrollbar>
        </div>
        <div class="searchSuggest" v-else>
            <el-scrollbar>
                <ul class="guess">
                    <div class="guessTitle">
                        猜你想搜
                    </div>
                    <li class="guessItem" v-for="guessItem in guessList"
                    @click="itemClick(guessItem.keyword)"
                    >
                        {{guessItem.keyword}}
                    </li>
                </ul>
                <ul class="result" v-for="resultType in suggestList.order" :key="resultType">
                    <div class="typeTitle">
                        {{getTypeTitle(resultType)}}
                    </div>
                    <li class="suggestItem" v-for="resultItem in suggestList[resultType]">
                        <div class="songItem" v-if="resultType == 'songs'" 
                        @click.stop="songClick(resultItem)"
                        >
                            {{resultItem.name}}
                            <span class="transNames" v-if="resultItem.transNames">
                                ({{resultItem.transNames[0]}})
                            </span>
                             - {{resultItem.artists[0].name}}
                        </div>
                        <div class="artistItem" v-else-if="resultType == 'artists'"
                        @click="artistClick(resultItem.id)"
                        >
                            {{resultItem.name}}
                        </div>
                        <div class="albumItem" v-else-if="resultType == 'albums'"
                        @click="albumClick(resultItem.id)"
                        >
                            {{resultItem.name}} - {{resultItem.artist.name}}
                        </div>
                        <div class="songlistItem" v-else-if="resultType == 'playlists'"
                        @click="songListClick(resultItem.id)"
                        >
                            {{resultItem.name}}
                        </div>
                    </li>
                </ul>
            </el-scrollbar>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, watch, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'

import { getSongUrl } from '@/network/play'

const router = useRouter();
const store = useStore();

const props = defineProps(['dataList', 'guessList', 'suggestList', 'state']);
const emit = defineEmits(["itemClicked", "hide"]);


const itemClick = (keyword: string) => {
    emit("itemClicked", keyword);
};

const getTypeTitle = (t: string) => {
    switch (t) {
        case 'songs':
            return '单曲';
            break;
        case 'artists':
            return '歌手';
            break;
        case 'albums':
            return '专辑';
            break;
        case 'playlists':
            return '歌单';
            break;
        default:
            break;
    }
};


const songClick = (item: any) => {
    emit("hide");
    getSongUrl(item.id).then((res:any) => {
        let url = res.data[0].url
        store.commit('setCurrentUrl', url);
        store.commit('pushRecent', {
            id: item.id,
            title: item.name,
            artist: item.artists,
            type: '歌曲',
            time: +new Date(),
            url
        });
        store.commit('pushCurrentPlaylist', {
            id: item.id,
            title: item.name,
            artist: item.artists,
            from: '搜索',
            duration: item.duration,
            url
        });
        store.commit('setCurrentSongId', item.id);
    });
};
const artistClick = (id: number) => {
    emit("hide");
    router.push('/detail/artist/' + id);
};
const albumClick = (id: number) => {
    emit("hide");
    router.push('/detail/album/' + id);
};
const songListClick = (id: number) => {
    emit("hide");
    router.push('/detail/songlist/' + id);
};
</script>

<style scoped lang='scss'>
.hotSearch {
    width: 355px;
    height: 460px;
    border-radius: 6px;
    box-shadow: 0 0 4px #c0c0c0;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    color: #303030;
    .title {
        width: 100%;
        height: 50px;
        font-size: 14px;
        text-align: left;
        text-indent: 20px;
        line-height: 50px;
    }
    .rank {
        width: 100%;
        list-style: none;
        display: flex;
        flex-direction: column;
        .rankItem {
            width: 100%;
            height: 55px;
            cursor: pointer;
            line-height: 55px;
            display: flex;
            &:hover {
                background-color: #f2f2f2;
            }
            &:nth-of-type(1),
            &:nth-of-type(2),
            &:nth-of-type(3) {
                .index {
                    color: red;
                }
                .ranktitle {
                    font-weight: 600;
                }
            }
            .index {
                width: 55px;
            }
            .info {
                height: 55px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                .titleAndHot {
                    flex-shrink: 1;
                    height: 20px;
                    line-height: 20px;
                    display: flex;
                    .ranktitle {
                        font-size: 12px;
                    }
                    .hot {
                        margin-left: 5px;
                        font-size: 12px;
                        color:#d3d3d3;
                    }
                }
                .desc {
                    height: 20px;
                    line-height: 20px;
                    flex-shrink: 1;
                    font-size: 12px;
                    text-align: left;
                    color: #acacac;
                }
            }
        }
    }
}
.searchSuggest {
    width: 400px;
    height: 460px;
    border-radius: 6px;
    box-shadow: 0 0 4px #c0c0c0;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    color: #303030;
    .guess {
        list-style: none;
        .guessTitle {
            height: 50px;
            line-height: 50px;
            text-align: left;
            text-indent: 35px;
            color: #999999;
            font-size: 14px;
        }
        .guessItem {
            width: 390px;
            height: 36px;
            line-height: 36px;
            font-size: 13px;
            text-align: left;
            text-indent: 35px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            cursor: default;
            &:hover {
                background-color: #f2f2f2;
            }
        }
    }
    .result {
        width: 100%;
        list-style: none;
        .typeTitle {
            height: 50px;
            line-height: 50px;
            text-align: left;
            text-indent: 35px;
            color: #999999;
            font-size: 14px;
        }
        .suggestItem {
            width: 400px;
            height: 36px;
            line-height: 36px;
            font-size: 13px;
            text-align: left;
            text-indent: 35px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            cursor: default;
            &:hover {
                background-color: #f2f2f2;
            }
            div {
                width: 100%;
                height: 100%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                z-index: 999;
            }
            .transNames {
                font-size: 13px;
                color: #999999;
            }            
        }
    }
}

</style>