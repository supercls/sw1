<template>
  <div class="control">
    <el-header title="传感器数据" minsize></el-header>
    <div class="box">
      <div
        v-for="(item, index) in list"
        :key="index * 6.66"
        style="margin-bottom: 15px;width:50%"
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
import { senList } from "@/utils/arrayList";
export default defineComponent({
  name: "control",
  components: {
    elHeader,
  },
  setup() {
    const store = useStore();
    const robot = computed(() => store.state.Robot);
    const list = ref(senList);
    const filterFun = (child) => {
      if (child.field != "") {
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
    display: flex;
    justify-content: space-between;
    padding-top: 40px;
    flex-flow: wrap;
    .boxCon {
      display: flex;
      flex-direction: row;
      align-content: center;
      flex-flow: row wrap;
      .list {
        display: flex;
        align-items: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 0px 1% 10px 1%;

        .s3 {
          color: #fff;
          font-size: @font14;
          margin-right: 18px;
          width: 130px;
          text-align: right;
        }
        .s4 {
          height: 35px;
          flex-shrink: 0;
          line-height: 35px;
          text-align: center;
          background: #3d4661;
          width: 90px;
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
       font-weight: bolder;
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