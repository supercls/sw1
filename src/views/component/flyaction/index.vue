<template>
  <div>
    <div class="content">
      <ul>
        <li v-for="item in actionList" :key="item.id" @click="postAction(item)">
          <i class="iconfont" :class="item.icon"></i>
          <span>{{ item.name }}</span>
        </li>
      </ul>
      <div class="bottom">
        <span class="p1">高度调整：</span>
        <i
          class="iconfont i1 icon-pinleizengjia_o"
          @click="heightOrAngle = (heightOrAngle * 10 + 1) / 10"
        ></i>
        <i
          class="iconfont i2 icon-pinleijianshao_o"
          @click="heightOrAngle = (heightOrAngle * 10 - 1) / 10"
        ></i>
        <a-input-number
          v-model:value="heightOrAngle"
          style="
            width: 100px;
            background: #252c49;
            border: 1px solid #5565a9;
            color: #fff;
          "
          :step="0.1"
          :controls="false"
          string-mode
        />
        <span class="p3">米</span>
        <span class="p2" @click="heightAction()">发送</span>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive, ref } from "vue";
import { actionArr } from "@/utils/arrayList";
import { actionPost } from "./service";
import { message } from "ant-design-vue";
export default defineComponent({
  name: "flyobject",
  setup() {
    const actionList = reactive(actionArr);
    const heightOrAngle = ref(0.0);
    let deg = 0;
    let Adisabled = false;
    let Bdisabled = false;
    const postAction = (item) => {
      if (item.id < 5 || Adisabled) return;
      item.id == 5 ? (deg -= 10) : (deg += 10);
      Adisabled = true;
      actionPost({
        type: 1,
        heightOrAngle: deg,
      })
        .then(() => (Adisabled = false | message.success("指令已发送", 1)))
        .catch(() => (Adisabled = false));
    };
    const heightAction = () => {
      if (Bdisabled) return;
      Bdisabled = true;
      actionPost({
        type: 2,
        heightOrAngle: heightOrAngle.value,
      })
        .then(() => (Bdisabled = false | message.success("指令已发送", 1)))
        .catch(() => (Bdisabled = false));
    };
    return {
      postAction,
      heightAction,
      actionList,
      heightOrAngle,
    };
  },
});
</script>
<style lang="less" scoped>
.content {
  border: 1px solid #3c467e;
  border-radius: 6px;
  padding: 5px 10px;
  box-shadow: #3c467e 0px 0px 5px 1px inset;
  .bottom {
    display: flex;
    padding-left: 50px;
    align-items: center;
    span {
      color: #fff;
      font-size: 12px;
    }
    i {
      font-size: 45px;
      color: #5565a9;
      cursor: pointer;
    }
    .p3 {
      margin: 0 10px;
    }
    .p2 {
      width: 71px;
      margin-left: 30px;
      height: 32px;
      background: #3764f6;
      text-align: center;
      line-height: 32px;
      cursor: pointer;
      border-radius: 4px;
    }
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    border-bottom: 1px dashed #5565a9;
    padding-bottom: 10px;
    li {
      display: flex;
      cursor: pointer;
      flex-direction: column;
      box-shadow: #3c467e 0px 0px 5px 1px inset;
      align-items: center;
      width: 90px;
      height: 60px;
      margin: 5px 10px;
      background: #222947;
      border-radius: 10px;
      i {
        font-size: 20px;
        color: #8b9eff;
      }
      span {
        font-size: @font12;
        color: #fff;
      }
    }
  }
}
</style>