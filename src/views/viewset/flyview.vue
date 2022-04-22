<template>
  <div class="control">
    <el-header title="控制显示栏" minsize></el-header>
    <div class="box">
      <div
        v-for="(item, index) in list"
        :key="index * 6.66"
        style="margin-bottom: 5px"
      >
        <p class="p1"><span class="s1"></span>{{ item.title }}</p>
        <div class="boxCon">
          <div
            class="list"
            v-for="(child, jindex) in item.children"
            :key="jindex"
          >
            <span class="s3">{{ child.name }}</span>
            <span class="s4">{{ filterFun(child) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import elHeader from "@/components/header.vue";
import { useStore } from "vuex";
import { defineComponent, computed, ref } from "vue";
import { flyList } from "@/utils/arrayList";
export default defineComponent({
  name: "control",
  components: {
    elHeader,
  },
  setup() {
     let state1 = [
      "NO_GPS",
      "NO_FIX",
      "2D_FIX",
      "3D_FIX",
      "DGPS",
      "RTK_FLOAT",
      "RTK_FIXED",
    ];
    const store = useStore();
    const robot = computed(() => store.state.Robot);
    const list = ref(flyList);
    const filterFun = (child) => {
      if (child.field != "") {
        if(child.name == 'GPS状态：'){
          return state1[robot.value[child.obj][child.field]]
        }
        return robot.value[child.obj][child.field];
      }
      else{
        return '0.00'
      }
    };
    return {
      robot,
      list,
      filterFun,
    };
  },
});
</script>
<style lang="less" scoped>
.control {
  min-height: 100vh;
  background: #252c49;
  opacity: 0.9;
  .line {
    height: 1px;
    border: 1px dashed #6f8cea;
    margin: 10px 20px;
  }
  .box {
    padding: 10px 20px;
    padding-top: 40px;
    .boxCon {
      display: flex;
      align-content: center;
      flex-flow: row wrap;

      .list {
        display: flex;
        align-items: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 0px 15px 10px 55px;

        .s3 {
          color: #fff;
          font-size: @font14;
          margin-right: 8px;
          width: 130px;
          text-align: left;
        }
        .s4 {
          height: 35px;
          flex-shrink: 0;
          line-height: 35px;
          text-align: center;
          background: #3d4661;
          width: 80px;
          color: #7595fb;
          border: 1px solid #7287fd;
          border-radius: 10px;
        }
      }
    }
    .p1 {
      color: #fff;
      display: flex;
      align-items: center;
      font-size: @font14;
      margin-bottom: 10px;
      .s1 {
        display: inline-block;
        width: 5px;
        height: 16px;
        background: #f8fb20;
        margin-right: 10px;
      }
    }
  }
}
</style>