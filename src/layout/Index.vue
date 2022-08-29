<template>
    <div class="common-layout">
        <el-header class="header">
            <Header/>
        </el-header>
        <el-container class="content">
          <el-aside width="200px" class="aside">
            <Sidebar/>
          </el-aside>
          <el-main class="main" id="main">
              <el-scrollbar ref="scrollBar">
                <router-view v-slot="{ Component }">
                  <keep-alive exclude="songDetail">
                    <component :is="Component"/>
                  </keep-alive>
                </router-view>
              </el-scrollbar>
              <PlayListDrawer ref="playlistDrawer"/>
          </el-main>
        </el-container>
        <el-footer class="footer">
            <Player/>
        </el-footer>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, provide, onMounted, onUpdated } from 'vue'
import Header from './header/Header.vue'
import Sidebar from './content/sidebar/Sidebar.vue'
import Player from './player/Player.vue'
import PlayListDrawer from './player/PlayListDrawer.vue'

const scrollBar = ref();
const playlistDrawer = ref();
onMounted(() => {
    provide('scrollBar', scrollBar);
    provide('playlistDrawer',playlistDrawer);
});
provide('scrollBar', scrollBar);
provide('playlistDrawer',playlistDrawer);
</script>

<style scoped lang='scss'>
.common-layout {
    height: 100%;
    .header {
        background-color: #ec4141;
    }
    .content {
        height: 480px;
        .aside {
            width: 200px;
            height: 480px;
            // background-color: aquamarine;
        }
        .main {
            background-color: white;
            padding: 0 !important;
            position: relative;
        }
    }
    .footer {
        background-color: #fff;
        border-top: 1px solid rgb(221, 221, 221);
        padding: 0 !important;
        height: 73px;
    }
}
:deep(.el-loading-spinner .path) { 
    stroke: #ec4141;
}


</style>