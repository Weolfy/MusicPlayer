<template>
    <div class="layout">
        <div class="title">
            收藏的歌手 <span v-if="collection.length > 0">({{collection.length}})</span>
        </div>
        <div class="list">
            <ul>
                <li class="artistItem" v-for="artist in collection" :key="artist.id" @click="goArtistDetail(artist.id)">
                    <div class="avatar">
                        <img v-lazy="artist.avatar" alt="歌手头像">
                    </div>
                    <div class="name">
                        {{artist.name}} <span class="alias" v-if="artist.alias">({{artist.alias}})</span>
                    </div>
                    <div class="albumCount">
                        专辑：{{artist.albumCount}}
                    </div>
                    <div class="mvCount">
                        MV：{{artist.mvCount}}
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'

const router = useRouter();
const store = useStore();

let collection = computed(() => {
    return store.getters['getArtistCollection']
});

const goArtistDetail = (id: number) => {
    router.push('/detail/artist/'+ id)
}

const beforeRefresh = () => {
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('artistCollection', JSON.stringify(collection.value));
    });
    let artistCollectionSession = localStorage.getItem('artistCollection');
    if(artistCollectionSession) {
        let artist = JSON.parse(artistCollectionSession);
        if (artist.length > 0) {
            store.state.artistCollection = artist;
        }
    }
};

onMounted(() => {
    beforeRefresh();
})
</script>

<style scoped lang='scss'>
.layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #303030;
    .title {
        width: 700px;
        text-align: left;
        font-size: 14px;
        font-weight: 600;
        display: flex;
        align-items: center;
        span {
            color: #cfcfcf;
            font-weight: 500;
        }
    }
    .list {
        width: 800px;
        ul {
            list-style: none;
            display: flex;
            flex-direction: column;
            cursor: default;
            .artistItem {
                width: 100%;
                height: 80px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                &:nth-of-type(odd) {
                    background-color: #fafafa;
                }
                &:hover {
                    background-color: #f1f2f3;
                }
                .avatar {
                    width: 60px;
                    height: 60px;
                    border-radius: 6px;
                    overflow: hidden;
                    margin-left: 50px;
                    cursor: pointer;
                    img {
                        width: 60px;
                        height: 60px;
                    }
                }
                .name {
                    margin-left: 10px;
                    width: 420px;
                    text-align: left;
                    font-size: 14px;
                    color: #303030;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    cursor: pointer;
                    &:hover {
                        color: #000;
                    }
                    span {
                        color: #969797;
                    }
                }
                .albumCount {
                    width: 150px;
                    text-align: left;
                    color: #969797;
                    font-size: 12px;
                }
                .mvCount {
                    width: 50px;
                    text-align: left;
                    color: #969797;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>