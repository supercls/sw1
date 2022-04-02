<template>
    <a-config-provider>
      <router-view></router-view>
    </a-config-provider>
</template>
<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
export default defineComponent({
  name: 'App',
  setup() {

  }
})
</script>