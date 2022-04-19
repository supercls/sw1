<template>
    <div class="control">
        <el-header title="控制显示栏" minsize></el-header>
    </div>
</template>
<script>
import elHeader from "@/components/header.vue";
import {defineComponent} from 'vue'
export default defineComponent({
    name:'control',
    components:{
        elHeader
    },
    setup(){

    }
})
</script>
<style lang="less" scoped>
    .control{

    }
</style>