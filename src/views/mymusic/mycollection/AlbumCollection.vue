<template>
    <div class="layout">
        <div class="title">
            收藏的专辑 <span v-if="collection.length > 0">({{collection.length}})</span>
        </div>
        <div class="list">
            <ul>
                <li class="albumItem" v-for="album in collection" :key="album.id" @click="goAlbumDetail(album.id)">
                    <div class="cover">
                        <img v-lazy="album.cover" alt="专辑封面">
                    </div>
                    <div class="albumTitle" @click="goAlbumDetail(album.id)">
                        {{album.name}}
                    </div>
                    <div class="artist" @click.stop="goArtistDetail(album.artistId)">
                        {{album.artist}}
                    </div>
                    <div class="songCount">
                        {{album.count}}首
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
    return store.getters['getAlbumCollection']
});

const goAlbumDetail = (id: number) => {
    router.push('/detail/album/'+ id);
};

const goArtistDetail = (id: number) => {
    router.push('/detail/artist/'+ id)
}

const beforeRefresh = () => {
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('albumCollection', JSON.stringify(collection.value));
    });
    let albumCollectionSession = localStorage.getItem('albumCollection');
    if(albumCollectionSession) {
        let album = JSON.parse(albumCollectionSession);
        if (album.length > 0) {
            store.state.albumCollection = album;
        }
    }
}

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
            .albumItem {
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
                .cover {
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
                .albumTitle {
                    margin-left: 10px;
                    width: 370px;
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
                }
                .artist {
                    width: 200px;
                    text-align: left;
                    color: #969797;
                    font-size: 12px;
                    cursor: pointer;
                    &:hover {
                        color: #616162;
                    }
                }
                .songCount {
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