<template>
  <div class="control">
    <el-header title="控制显示栏" minsize></el-header>
    <div class="box">
      <p class="p1"><span class="s1"></span>控制回路</p>
      <table>
        <tr class="r1">
          <td width="30%">回路名称</td>
          <td>遥测值</td>
          <td>状态</td>
          <td>指令值</td>
        </tr>
        <tr class="r2">
          <td class="d1">航迹跟踪</td>
          <td class="d2">
            <div>0.00</div>
          </td>
          <td class="d2"><div>OFF</div></td>
          <td class="d2"><div>0.00</div></td>
        </tr>
        <tr class="r2">
          <td class="d1">地速</td>
          <td class="d2"><div>{{(robot.socket1.velocityGround).toFixed(2)}}</div></td>
          <td class="d2"><div>OFF</div></td>
          <td class="d2"><div>0.00</div></td>
        </tr>
        <tr class="r2">
          <td class="d1">地速方向(deg)</td>
          <td class="d2"><div>0.00</div></td>
          <td class="d2"><div>OFF</div></td>
          <td class="d2"><div>0.00</div></td>
        </tr>
        <tr class="r2">
          <td class="d1">高度(m)</td>
          <td class="d2"><div>{{robot.socket1.curAlt}}</div></td>
          <td class="d2"><div>OFF</div></td>
          <td class="d2">
            <div>{{ robot.socket1.targetHeight }}</div>
          </td>
        </tr>
        <tr class="r2">
          <td class="d1">滚转(deg)</td>
          <td class="d2"><div>{{(robot.socket1.roll*(180/3.14)).toFixed(2)}}</div></td>
          <td class="d2"><div>OFF</div></td>
          <td class="d2">
            <div>{{ (robot.socket2.targetRoll * (180/3.14)).toFixed(2) }}</div>
          </td>
        </tr>
        <tr class="r2">
          <td class="d1">俯仰(deg)</td>
          <td class="d2"><div>{{(robot.socket1.pitch*(180/3.14)).toFixed(2)}}</div></td>
          <td class="d2"><div>OFF</div></td>
          <td class="d2"><div>{{ (robot.socket2.targetPitch *(180/3.14)).toFixed(2) }}</div></td>
   </tr>
        <tr class="r2">
          <td class="d1">指向(deg)</td>
          <td class="d2"><div>0.00</div></td>
          <td class="d2"><div>OFF</div></td>
          <td class="d2"><div>0.00</div></td>
        </tr>
      </table>
    </div>
    <div class="line"></div>
    <div class="box">
      <p class="p1"><span class="s1"></span>控制指令</p>
      <div class="boxCon">
        <div class="list" v-for="(item, index) in machine" :key="index * 6.66">
          <span class="s3">电机{{ index + 1 }}</span>
          <span class="s4">{{ item }}</span>
        </div>
      </div>
      <div class="boxCon">
        <div class="list">
          <span class="s3">升降</span>
          <span class="s4">{{ robot.socket2.throttle }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import elHeader from "@/components/header.vue";
import { useStore } from "vuex";
import { defineComponent, computed, ref } from "vue";
export default defineComponent({
  name: "control",
  components: {
    elHeader,
  },
  setup() {
    const store = useStore();
    const robot = computed(() => store.state.Robot);
    const machine = ref([]);
    machine.value = robot.value.socket2.pwm;
    return {
      robot,
      machine,
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
    .boxCon {
      display: flex;
      align-content: center;
      flex-flow: wrap;
      justify-content: space-between;
      .list {
        display: flex;
        align-items: center;
        margin: 0px 15px 10px 15px;
        width: 150px;
        .s3 {
          color: #fff;
          font-size: @font14;
          margin-right: 8px;
          width: 50px;
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
    table {
      width: 100%;
      text-align: center;
      .r1 {
        font-size: @font14;
        color: #6f8cea;
        margin-bottom: 10px;
      }
      .r2 {
        .d1 {
          color: #fff;
        }
        .d2 {
          padding: 5px 10px;
          width: 100px;

          div {
            height: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #3d4661;
            color: #7595fb;
            border: 1px solid #7287fd;
            border-radius: 10px;
          }
        }
      }
    }
  }
}
</style>
