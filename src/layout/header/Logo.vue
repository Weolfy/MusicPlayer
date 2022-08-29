<template>
    <div id="logo">
        <img src="@/assets/logo.png" alt="TheLogo">
        云 音 乐
    </div>
</template>

<script setup lang='ts'>

</script>

<style scoped lang='scss'>
#logo {
    display: flex;
    align-items: center;
    height: 60px;
    width: 150px;
    // background-color: white;
    line-height: 60px;
    font-weight: 540;
    letter-spacing: 2px;
    font-size: 17px;
    color: white;
    user-select: none;
    img {
        width: 48px;
        height: 40px;
    }
}
</style>