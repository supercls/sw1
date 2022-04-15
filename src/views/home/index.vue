<template>
  <div class="indexlayout-main-content">
    <div class="mapLayout">
      <img src="../../assets/images/map.png" alt="" />
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
    {{ Token }}
    <a-button type="primary" @click="openDialog('a1')">
      打开新窗口1
    </a-button>
    <a-button type="primary" @click="openDialog('b1')">
      打开新窗口2</a-button
    >
    <button @click="removeStore">删除</button> -->
  </div>
</template>

<script>
import flymock from "../component/flymock/index.vue";
import flyaction from "../component/flyaction/index.vue";
import flyobject from "../component/flyobject/index.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Electronwindow } from "@/utils/openWindow";
import { defineComponent, computed, reactive } from "vue";

export default defineComponent({
  name: "home",
  components: {
    flymock,
    flyaction,
    flyobject,
  },
  setup: () => {
    const store = useStore();
    const router = useRouter();
    const robot = computed(() => store.state.robot);
    console.log(robot)
    const openDialog = (dom) => {
      Electronwindow(dom, 500, 500, "#/home/setting");
    };
    const removeStore = () => {
      store.dispatch("removeToken");
      setTimeout(() => {
        router.push({
          path: "/home/setting",
        });
      }, 1000);

    };
    return {
      openDialog,
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