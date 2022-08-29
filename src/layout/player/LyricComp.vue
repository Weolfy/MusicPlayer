<template>
    <div class="lyricsLayout">
        <div class="line">
            {{currentLine}}
        </div>
        <div v-if="isPure">
            纯音乐，请欣赏
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, toRefs, watch, onMounted } from 'vue'

const props = defineProps(['dataList']);
let {dataList} = toRefs(props);
let player:HTMLAudioElement;
let currentLyrics = ref();
let currentLine = ref('');
let isPure = ref(false);

// 格式化歌词
const formatLyrics = (lyrics: string) => {
    if (lyrics == '') {
        currentLine.value = '暂无歌词'
        return 'noLyrics';
    } else {
        let lines = lyrics.split('\n');
        // console.log(lines)
        let pattern = /\[\d{2}:\d{2}.\d{2,3}\]/g;
        let result:any = {};
        let timeline:any = [];
        let lyricsline:any = [];
        lines[lines.length - 1].length === 0 && lines.pop();
        lines.forEach((value, index, array) => {
            let time = value.match(pattern)!;
            let lyric = value.replace(pattern, '');
            if (lyric == '纯音乐，请欣赏') {
                isPure.value = true;
            }
            let realTime = time[0].slice(1,-1).split(':');
            timeline.push(parseInt(realTime[0], 10) * 60 + parseFloat(realTime[1]))
            lyricsline.push(lyric);
        });
        result = {
            timeline,
            lyricsline
        }
        return result;
    }
    
};

const updateLyrics = () => {
    for (let i = 0;i<currentLyrics.value.timeline.length; i++) {
        if(player.currentTime > currentLyrics.value.timeline[i] && player.currentTime < currentLyrics.value.timeline[i+1]) {
            currentLine.value = currentLyrics.value.lyricsline[i];
        }
    }
}

onMounted(() => {
    player = document.querySelector('#originplayer')!;
    // console.log(player);
    player.addEventListener('ended', () => {
        isPure.value = false;
        player.removeEventListener('timeupdate', updateLyrics);
        currentLine.value = '';
    });
});

watch(() => dataList?.value, () => {
    currentLyrics.value = formatLyrics(dataList?.value);
    // console.log(currentLyrics.value);
    if (currentLyrics.value !== 'noLyrics') {
        player.addEventListener('timeupdate', updateLyrics);
    }
})
</script>

<style scoped lang='scss'>
.lyricsLayout {
    width: 680px;
    height: 175px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    background-color: rgba($color: #4b4b4b, $alpha: 0.7);
    font-size: 28px;
    color: white;
    text-shadow: 0 0 3px rgb(53, 164, 255);
    // line-height: 175px;
    user-select: none;
    cursor: grab;
    z-index: 999;
}
</style>