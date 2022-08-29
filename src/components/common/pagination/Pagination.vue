<template>
    <div class="pagi">
        <el-pagination background layout="prev, pager, next" :total="totalCount" 
        :page-size="pageSize" 
        v-model:currentPage="cPage"
        :pager-count="pagerCount"
        />
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, watch } from 'vue'
const props = defineProps({
    // 总数量
    totalCount: Number,
    // 每页数量
    pageSize: Number,
    // 超过该页时省略,必须是奇数！！！！
    pagerCount: Number
});
const emit = defineEmits(["pageChange"]);
let cPage = ref(1);
watch(() => cPage.value, () => {
    emit("pageChange", cPage.value);
});
const resetPage = () => {
    cPage.value = 1;
};
defineExpose({
    resetPage,
})
</script>

<style scoped lang='scss'>
.pagi {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    padding-bottom: 30px;
}

:deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active ) {
    background-color: #ec4141 !important;
}

:deep(.el-pagination) {
    --el-pagination-hover-color: #ec4141;
    --el-pagination-button-width: 24px !important;
    --el-pagination-button-height: 24px !important;
}

:deep(.el-pagination.is-background .el-pager li) {
    min-width: 24px !important;
    border-radius: 3px;
}
</style>