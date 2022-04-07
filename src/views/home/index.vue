<template>
  <div class="indexlayout-main-conent">
    <flymock></flymock>
    {{ Token }}
    <a-button type="primary" @click="openDialog('a1')">
      打开新窗口1
    </a-button>
    <a-button type="primary" @click="openDialog('b1')">
      打开新窗口2</a-button
    >
    <button @click="removeStore">删除</button>
  </div>
</template>

<script>
import flymock from "../component/flymock/index.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import {Electronwindow} from '@/utils/openWindow'
import { defineComponent, computed } from "vue";
export default defineComponent({
  name: "home",
  components: {
    flymock,
  },
  setup: () => {
    const store = useStore();
    const router = useRouter();
    const Token = computed(() => store.state.Token);

    const openDialog = (dom) => {
      Electronwindow(dom,500,500,"#/home/setting")
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
      Token,
    };
  },
});
</script>
