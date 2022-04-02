<template>
  <div class="setting">
    <footer>
        <button @click="changes">修改store {{Token}}</button>
       <button @click="closeD">关闭</button>
    </footer>

  </div>
</template>
<script>
const { ipcRenderer ,remote} = window.require("electron");
import {useStore} from 'vuex'
import {defineComponent,computed} from 'vue'

export default defineComponent({
  name:'seting',
  setup:() =>{
    const store = useStore()
    const Token = computed(() =>store.state.Token)

    const closeD = () =>{
       remote.getCurrentWindow().hide()
    }
    const changes = () =>{
       store.dispatch("setToken","8999")
    }
    return{
      closeD,
      changes,
      Token
    }
  }
})
</script>
<style lang="less" scoped>
  .setting{
    background: #fff;
    -webkit-app-region: drag;
    padding-top: 100px;
    footer{
       -webkit-app-region: no-drag;   /**禁止拖动，否则点击事件无效 */
    }

  }

</style>