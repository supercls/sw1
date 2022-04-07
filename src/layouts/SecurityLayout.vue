<template>
  <router-view />
</template>
<script>
import { defineComponent, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const electron = window.require("electron");
const { remote } = electron;
export default defineComponent({
  setup: () => {
    const store = useStore();
    const router = useRouter();
    const Token = computed(() => store.state.Token);
    if (!Token.value) {
      remote.getCurrentWindow().setSize(800, 400)
      router.push({
        path: "/login",
      });
    }
    return {
      Token,
    };
  },
});
</script>