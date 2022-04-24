<template>
  <div class="flycheck">
    <elHeader title="飞前检查" minsize></elHeader>
    <div class="box">
      <div class="tab">
        <div
          class="item"
          v-for="(item, index) in tabs"
          :key="index * 3.33"
          @click="changeTab(item, index)"
        >
          <p>{{ item.name }}</p>
          <i v-show="checkList[index].checked" class="iconfont icon-dui"></i>
        </div>
      </div>
      <div class="content">
        <div class="list" v-show="tabs[0].checked">
          <p class="p1">
            <span></span>检查各连接器是否安装牢靠，各舵机安装是否良好。
          </p>
          <div class="footer">
            <a-checkbox
              @change="(e) => changeBox(e, 1)"
              v-model:checked="checkList[0].checked"
            >
              检查完成
            </a-checkbox>
          </div>
        </div>
        <div class="list" v-show="tabs[1].checked">
          <p class="p1"><span></span>转动机身，检查显示是否与实际姿态一致。</p>
          <div style="display: flex; align-items: center; margin-top: 25px">
            <div class="item">
              <span class="s3">滚转</span>
              <span class="s4">{{filterFun(robot.socket1.roll)}}</span>
            </div>
            <div class="item">
              <span class="s3">俯仰</span>
              <span class="s4">{{filterFun(robot.socket1.pitch)}}</span>
            </div>
            <div class="item">
              <span class="s3">偏航</span>
              <span class="s4">{{filterFun(robot.socket1.yaw)}}</span>
            </div>
          </div>

          <div class="footer">
            <a-checkbox
              @change="(e) => changeBox(e, 2)"
              v-model:checked="checkList[1].checked"
            >
              检查完成
            </a-checkbox>
          </div>
        </div>
        <div class="list" v-show="tabs[2].checked">
          <p class="p1"><span></span>转动机身，检查显示是否与实际姿态一致。</p>
          <p class="p1">
            <span></span
            >将机身左右滚转30°，检查当前偏航角与磁航向误差是否在±10°以内。
          </p>
          <div style="display: flex; align-items: center; margin-top: 25px">
            <div class="item">
              <span class="s3">偏航角</span>
              <span class="s4">{{filterFun(robot.socket1.yaw)}}</span>
            </div>
            <div class="item">
              <span class="s3">磁航向</span>
              <span class="s4">{{filterFun(robot.socket2.magOrient)}}</span>
            </div>
            <div class="item">
              <span class="s3">偏航角与磁航向误差</span>
              <span class="s4">{{Math.abs(filterFun(robot.socket2.magOrient) - filterFun(robot.socket1.yaw))}}</span>
            </div>
          </div>

          <div class="footer">
            <a-checkbox
              @change="(e) => changeBox(e, 3)"
              v-model:checked="checkList[2].checked"
            >
              检查完成
            </a-checkbox>
          </div>
        </div>
        <div class="list" v-show="tabs[3].checked">
          <p class="p1"><span></span>转动机身，检查显示是否与实际姿态一致。</p>
          <p class="p1">
            <span></span
            >将机身左右滚转30°，检查当前偏航角与磁航向误差是否在±10°以内。
          </p>
          <div style="display: flex; align-items: center; margin-top: 25px">
            <div class="item">
              <span class="s3">GPS时间</span>
              <span class="s4">{{}}</span>
            </div>
            <div class="item">
              <span class="s3">GPS状态</span>
              <span class="s4">{{GPSFUN(robot.socket2.gpsState)}}</span>
            </div>
            <div class="item">
              <span class="s3">卫星数</span>
              <span class="s4">{{}}</span>
            </div>
          </div>
          <div style="display: flex; align-items: center; margin-top: 25px">
            <div class="item">
              <span class="s3">pDop</span>
              <span class="s4">{{robot.socket2.dop}}</span>
            </div>
            <div class="item">
              <span class="s3">主电源</span>
              <span class="s4">{{robot.socket2.boardVoltage}}</span>
            </div>
            <div class="item">
              <span class="s3">动力电源</span>
              <span class="s4">{{}}</span>
            </div>
          </div>

          <div class="footer">
            <a-checkbox
              @change="(e) => changeBox(e, 4)"
              v-model:checked="checkList[3].checked"
            >
              最终确认
            </a-checkbox>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref,computed } from "vue";
import elHeader from "@/components/header.vue";
import { message } from 'ant-design-vue';
import { useStore } from "vuex";
const { remote } = window.require("electron");
export default defineComponent({
  name: "flycheck",
  components: {
    elHeader,
  },
  setup() {
      const store = useStore();
    const robot = computed(() => store.state.Robot);
    const tabs = ref([]);
    const checkList = ref([
      {
        checked: false,
      },
      {
        checked: false,
      },
      {
        checked: false,
      },
      {
        checked: false,
      },
    ]);
    let stategps = [
      "NO_GPS",
      "NO_FIX",
      "2D_FIX",
      "3D_FIX",
      "DGPS",
      "RTK_FLOAT",
      "RTK_FIXED",
    ];
    tabs.value = [
      {
        name: "1.线路检查",
        checked: true,
      },
      {
        name: "2.姿态检查",
        checked: false,
      },
      {
        name: "3.磁罗盘检查",
        checked: false,
      },
      {
        name: "4.最终确认",
        checked: false,
      },
    ];
    const changeTab = (item, index) => {
      tabs.value.map((val) => (val.checked = false));
      item.checked = true;
    };
    const changeBox = (e, index) => {
      if (index <= 3) {
        if (e.target.checked) {
          tabs.value.map((val) => (val.checked = false));
          tabs.value[index].checked = true;
        }
      } else {
          let onoff = checkList.value.every((item) =>item.checked == true)
          if(!onoff){
              message.error('请完成全部检查');
              checkList.value[3].checked = false;
          }
          else{
              message.success('全部检查完成');
              remote.getCurrentWindow().close();
          }
      }
    };
     const filterFun = (val) =>{
      return  val ? parseFloat(val*180/Math.PI).toFixed(3) :''
    }
     const GPSFUN = (val) =>{
      return stategps[val]
    }
    return {
      tabs,
      checkList,
      robot,
      changeTab,
      filterFun,
      changeBox,
      GPSFUN
    };
  },
});
</script>
<style lang="less" scoped>
.flycheck {
  min-height: 100vh;
  background: #252c49;
  opacity: 0.9;
  .footer {
    position: fixed;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
  }
  .box {
    padding: 10px 20px;
    padding-top: 40px;
    .content {
      .list {
        .item {
          display: flex;
          align-items: center;
          margin-right: 15px;
          .s3 {
            color: #fff;
            font-size: @font14;
            margin-right: 8px;
            min-width: 80px;
          }
          .s4 {
            height: 35px;
            flex-shrink: 0;
            line-height: 35px;
            display: inline-block;
            text-align: center;
            background: #3d4661;
            width: 80px;
            color: #7595fb;
            border: 1px solid #7287fd;
            border-radius: 10px;
          }
        }
        .p1 {
          span {
            width: 10px;
            height: 10px;
            background: #4fab1e;
            display: inline-block;
            border-radius: 50%;
            margin-right: 10px;
          }
          color: #fff;
          margin-top: 15px;
          font-size: @font14;
        }
      }
    }
    .tab {
      display: flex;
      align-items: center;
      border-radius: 15px;
      .item {
        background: #3e4970;
        cursor: pointer;
        display: flex;
        align-items: center;
        border: 1px solid #5a7dee;
        border-radius: 5px;
        padding: 5px 15px;
        margin: 15px 8px;
        i{
           color: #4fab1e;
           font-size: 20px;
        }
        p {
          color: #fff;
        }
      }
    }
  }
}
</style>