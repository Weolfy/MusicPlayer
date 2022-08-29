<template>
    <div>
    <Teleport to="body">
        <div class="playerMask">
            <div class="playerWrapper">
                <video :src="videoUrl" id="player" controls >

                </video>
            </div>
        </div>
    </Teleport>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
const props = defineProps(['videoUrl']);
const emit = defineEmits(['close']);

let player: HTMLVideoElement| null;

onMounted(() => {
    player = document.querySelector('#player');
})

window.addEventListener('mousedown', (e:any) => {
    // console.log(e);
    let pw = document.querySelector('.playerWrapper');
    if (e.path.includes(pw)) {
        return;
    }else {
        if(player) {player.pause()};
        emit('close');
    }
})

</script>

<style scoped lang='scss'>
.playerMask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: 0.5);
    z-index: 9999;
    .playerWrapper {
        position: relative;
        width: 600px;
        height: 400px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 11111;
        outline: none;
        opacity: 1;
        #player {
            width: 600px;
            height: 400px;
            opacity: 1;
        }
    }
}
</style>