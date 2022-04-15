<template>
  <a-config-provider>
    <router-view></router-view>
  </a-config-provider>
</template>
<script >
import { defineComponent , onMounted} from "vue";
import {uavSocket} from '@/utils/websocket.js'
export default defineComponent({
  name: "App",
  setup() {
    onMounted(() =>{
      //uavSocket()
    })
  },
});
</script>
<style lang="less">
body {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>