<template>
    <div class="headerComp">
        <Logo/>
        <Searchbar/>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import Searchbar from './Searchbar.vue';
import Logo from './Logo.vue';
</script>

<style scoped lang='scss'>
.headerComp {
    display: flex;
    height: 100%;
}
</style>