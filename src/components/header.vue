<template>
    <div class="el_header">
        <span> {{title}}</span>
        <i class="iconfont icon-guanbi" @click="closeWindow"></i>
    </div>
</template>
<script>
import {defineComponent} from 'vue'
const { remote } = window.require("electron");
export default defineComponent({
    name:'header',
    props:{
        title:{
            type:String,
            default:'标题',
        }
    },
    setup:() =>{
        const closeWindow = () =>{
            remote.getCurrentWindow().close()
        }
        return{
            closeWindow
        }
    }
})
</script>
<style lang="less" scoped>
.el_header{
    display: flex;
    justify-content: space-between;
    height: 32px;
    cursor: move;
    line-height: 32px;
    -webkit-app-region: drag;
    align-items: center;
    background: #242C49;
    border-bottom: 1px solid #7287FD;
    opacity: 0.9;
    padding: 0 15px;
    span{
        color: #91A9FF;
        font-size: 16px;
    }
    i{
        font-size:16px;
         -webkit-app-region: no-drag;
        cursor: pointer;
        color:#CCCCCD
    }
}
</style>