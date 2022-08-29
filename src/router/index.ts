import {createRouter, createWebHistory, RouteRecordRaw, createWebHashHistory} from 'vue-router'

const BaseHome = () => import('@/layout/Index.vue');

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'index',
        redirect: '/discover',
        component: BaseHome,
        meta: {
            title: '首页'
        }
    },
    {
        path: '/search',
        name: 'search',
        component: BaseHome,
        meta: {
            title: '搜索页'
        },
        children: [
            {
                path: 'result',
                component: () => import('@/views/search/Search.vue'),
                name: 'result',
                meta: {
                    title: '搜索结果'
                },
                children: [
                    {
                        path: 'song/:keywords',
                        component: () => import('@/views/search/song/SearchSong.vue'),
                        name: 'song',
                        meta: {
                            title: '单曲',
                            base: '/song/'
                        }
                    },
                    {
                        path: 'album/:keywords',
                        component: () => import('@/views/search/album/SearchAlbum.vue'),
                        name: 'album',
                        meta: {
                            title: '专辑',
                            base: '/album/'
                        }
                    },
                    {
                        path: 'artist/:keywords',
                        component: () => import('@/views/search/artist/SearchArtist.vue'),
                        name: 'artist',
                        meta: {
                            title: '歌手',
                            base: '/artist/'
                        }
                    },
                    {
                        path: 'video/:keywords',
                        component: () => import('@/views/search/video/SearchVideo.vue'),
                        name: 'video',
                        meta: {
                            title: '视频',
                            base: '/video/'
                        }
                    },
                    {
                        path: 'songlist/:keywords',
                        component: () => import('@/views/search/songlist/SearchSongList.vue'),
                        name: 'songlist',
                        meta: {
                            title: '歌单',
                            base: '/songlist/'
                        }
                    },
                    {
                        path: 'radio/:keywords',
                        component: () => import('@/views/search/radio/SearchRadio.vue'),
                        name: 'radio',
                        meta: {
                            title: '电台',
                            base: '/radio/'
                        }
                    }
                ]
            }
        ]
    },
    {
        path: '/detail',
        name: 'detail',
        component: BaseHome,
        meta: {
            title: '详情页'
        },
        children: [
            {
                path: 'song/:id',
                name: 'songDetail',
                component: () => import('@/layout/content/main/detail/song/SongDetail.vue'),
                meta: {
                    title: '歌曲详情'
                }
            },
            {
                path: 'artist/:id',
                name: 'artistDetail',
                component: () => import('@/layout/content/main/detail/artist/ArtistDetail.vue'),
                meta: {
                    title: '歌手详情'
                }
            },
            {
                path: 'album/:id',
                name: 'albumDetail',
                component: () => import('@/layout/content/main/detail/album/AlbumDetail.vue'),
                meta: {
                    title: '专辑详情'
                }
            },
            {
                path: 'songList/:id',
                name: 'songListDetail',
                component: () => import('@/layout/content/main/detail/songlist/SongListDetail.vue'),
                meta: {
                    title: '歌单详情'
                }
            },
            {
                path: 'radio/:id',
                name: 'radioDetail',
                component: () => import('@/layout/content/main/detail/radio/RadioDetail.vue'),
                meta: {
                    title: '电台详情'
                }
            },
        ]
    },
    {
        path: '/discover',
        name: 'discover',
        redirect: '/discover/recommend',
        component: BaseHome,
        meta: {
            title: '发现音乐页面'
        },
        children: [
            {
                path: 'recommend',
                name: 'recommend',
                component: () => import('@/views/discover/recommend/Recommend.vue'),
                meta: {
                    title: '个性推荐',
                    base: '/recommend',
                    from: '/discover'
                }
            },
            {
                path: 'songlist',
                name: 'discoverSongList',
                component: () => import('@/views/discover/songlist/SongList.vue'),
                meta: {
                    title: '歌单',
                    base: '/songlist',
                    from: '/discover'
                }
            },
            {
                path: 'rank',
                name: 'discoverRank',
                component: () => import('@/views/discover/rank/Rank.vue'),
                meta: {
                    title: '排行榜',
                    base: '/rank',
                    from: '/discover'
                }
            },
            {
                path: 'artist',
                name: 'discoverArtist',
                component: () => import('@/views/discover/artist/Artist.vue'),
                meta: {
                    title: '歌手',
                    base: '/artist',
                    from: '/discover'
                }
            },

        ]
    },
    {
        path: '/radio',
        name: 'radioPage',
        redirect: '/radio/index',
        component: BaseHome,
        meta: {
            title: '电台页面'
        },
        children: [
            {
                path: 'index',
                name: 'radioIndex',
                component: () => import('@/views/radio/radioindex/RadioIndex.vue'),
                meta: {
                    title: '电台首页',
                    base: '/index',
                    from: '/radio'
                },
            },
            {
                path: 'category/:cateId',
                name: 'categoryHot',
                component: () => import('@/views/radio/radiocategory/CateHot.vue'),
                meta: {
                    title: '电台分类热门',
                    base: '/category',
                    from: '/radio'
                }
            }
        ]
    },
    {
        path: '/video',
        name: 'videoPage',
        redirect: '/video/index',
        component: BaseHome,
        meta: {
            title: '视频页面'
        },
        children: [
            {
                path: 'index',
                name: 'videoIndex',
                component: () => import('@/views/video/VideoIndex.vue'),
                meta: {
                    title: '视频首页',
                    base: '/index',
                    from: '/video'
                },
            },
            {
                path: 'mv',
                name: 'mvIndex',
                component: () => import('@/views/video/MvIndex.vue'),
                meta: {
                    title: 'MV页面',
                    base: '/mv',
                    from: '/video'
                },
            },
            
        ]
    },
    {
        path: '/privatefm',
        name: 'privateFm',
        redirect: '/privatefm/index',
        component: BaseHome,
        meta: {
            title: '私人FM页面'
        },
        children: [
            {
                path: 'index',
                name: 'privateFmIndex',
                component: () => import('@/views/privatefm/PrivateFm.vue'),
                meta: {
                    title: '私人FM',
                    base: '/index',
                    from: '/privatefm'
                }
            }
        ]
    },
    {
        path: '/mymusic',
        name: 'myMusic',
        component: BaseHome,
        meta: {
            title: '我的音乐',
        },
        children: [
            {
                path: 'recent',
                name: 'recent',
                component: () => import('@/views/mymusic/recent/Recent.vue'),
                meta: {
                    title: '最近播放',
                    base: '/recent',
                    from: '/mymusic/recent'
                }
            },
            {
                path: 'mycollection',
                name: 'collection',
                redirect: '/mymusic/mycollection/album',
                component: () => import('@/views/mymusic/mycollection/MyCollection.vue'),
                meta: {
                    title: '我的收藏',
                    base: '/mycollection',
                    from: '/mymusic/mycollection'
                },
                children: [
                    {
                        path: 'album',
                        name: 'albumCollection',
                        component: () => import('@/views/mymusic/mycollection/AlbumCollection.vue'),
                        meta: {
                            title: '收藏的专辑',
                            base: '/album',
                            from: '/mymusic/mycollection'
                        }
                    },
                    {
                        path: 'artist',
                        name: 'artistCollection',
                        component: () => import('@/views/mymusic/mycollection/ArtistCollection.vue'),
                        meta: {
                            title: '收藏的歌手',
                            base: '/artist',
                            from: '/mymusic/mycollection'
                        }
                    },
                ]
            }
        ]
    },
    {
        path: '/mysonglists',
        name: 'mySongLists',
        component: BaseHome,
        meta: {
            title: '创建的歌单'
        },
        children: [
            {
                path: 'myfavourite',
                name: 'myFavourite',
                component: () => import('@/views/mysonglists/MyFavourite.vue'),
                meta: {
                    title: '我喜欢的音乐',
                    base: '/myfavourite',
                    from: '/mysonglists/myfavourite'
                }
            }
        ]
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;