<template>
  <div class="indexlayout-main-content">
    <div class="mapLayout">
      <!-- <img src="../../assets/images/map.png" alt="" /> -->
      <div class="map">
        <map-con></map-con>
      </div>
      <div class="bottomLayout">
        <div class="line-bg"></div>
        <p class="title">系统状态栏</p>
        <div class="line-bg"></div>
        <flysys></flysys>
      </div>
    </div>
    <div class="rightLayout">
      <div class="flyPart">
        <p class="bg"></p>
        <p class="title">仪表显示器</p>
        <div class="content" style="justify-content: center; display: flex">
          <flymock></flymock>
        </div>
      </div>
      <div class="objectPart">
        <p class="title">对象列表栏</p>
        <flyobject></flyobject>
      </div>
      <div class="actionPart">
        <p class="title">动作指令栏</p>
        <flyaction></flyaction>
      </div>
    </div>
    <!-- <flymock></flymock>
    <button @click="removeStore">删除</button> -->
  </div>
</template>

<script>
import flymock from "../component/flymock/index.vue";
import flyaction from "../component/flyaction/index.vue";
import flyobject from "../component/flyobject/index.vue";
import flysys from "../component/flysys/index.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import mapCon from '@/map/index.vue'

import { defineComponent, computed, onMounted } from "vue";

export default defineComponent({
  name: "home",
  components: {
    flymock,
    flyaction,
    mapCon,
    flyobject,
    flysys,
  },
  setup: () => {
    const store = useStore();
    const router = useRouter();
    const robot = computed(() => store.state.robot);
    console.log(robot);
    const removeStore = () => {
      store.dispatch("removeToken");
      setTimeout(() => {
        router.push({
          path: "/home/setting",
        });
      }, 1000);
    };
    onMounted(() =>{
      // setTimeout(() =>{
      //   Electronwindow('/home/flycheck', 650, 700, "#/home/flycheck");
      // },3000)
    })
    return {
      removeStore,
      robot,
    };
  },
});
</script>
<style lang="less" scoped>
.indexlayout-main-content {
  padding: 0 15px;
  display: flex;
  .mapLayout {
    flex: 3;
    position: relative;
    .map{
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .bottomLayout {
      position: absolute;
      bottom: 10px;
      background: #242c49;
      opacity: 0.95;
      left: 10px;
      overflow: hidden;
      right: 10px;
      .title {
        height: 32px;
        line-height: 32px;
        color: #91a9ff;
        padding-left: 15px;
        font-size: @font14;
      }

      .line-bg {
        width: 100%;
        height: 2px;
        background: linear-gradient(
          90deg,
          #727fea 0%,
          rgba(122, 185, 255, 0.02) 98%
        );
      }
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  .rightLayout {
    flex: 1;
    padding: 0 10px;
    .title {
      font-weight: normal;
      padding-left: 6px;
      color: #91a9ff;
      font-size: @font14;
    }
    .content {
      border: 1px solid #3c467e;
      border-radius: 6px;
      padding: 10px 10px;
      box-shadow: #3c467e 0px 0px 5px 1px inset;
    }
    .actionPart {
      margin-top: 2px;
    }
    .objectPart {
      margin-top: 2px;
    }
    .flyPart {
      .bg {
        width: 100%;
        height: 2px;
        background: linear-gradient(
          90deg,
          #727fea 0%,
          rgba(122, 185, 255, 0.02) 98%
        );
      }
    }
  }
}
</style>