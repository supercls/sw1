<template>
  <div class="flysys">
    <div class="box">
      <i class="iconfont icon-sanjiaoleft" @click="scorllGp(2)"></i>

      <div class="content">
        <ul class="scorllStation">
          <li
            v-for="(item, index) in STATIONS"
            :key="index * 1.1"
            class="stationlist"
          >
            <span>{{ item.name }}：</span>
            <p
              :style="{
                background: item.bg,
                color: item.color,
                borderColor: item.color,
              }"
            >
              {{ filFunction(index) }}
            </p>
          </li>
        </ul>
      </div>
      <i class="iconfont icon-sanjiaoright" @click="scorllGp(1)"></i>
    </div>
  </div>
</template>
<script >
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import { sysList } from "@/utils/arrayList";
export default defineComponent({
  name: "flysys",
  setup() {
    let scorllX = 0;
    let state1 = [
      "NO_GPS",
      "NO_FIX",
      "2D_FIX",
      "3D_FIX",
      "DGPS",
      "RTK_FLOAT",
      "RTK_FIXED",
    ];

    const STATIONS = ref(sysList);
    const filFunction = (index) => {
      try{


      switch (index) {
        case 0:
          if (Robot.value.socket1.roll &&
            Math.abs(Robot.value.socket1.roll * 180 / Math.PI) < 50 &&
             Math.abs(Robot.value.socket1.pitch * 180 / Math.PI) < 50 ) {
            STATIONS.value[index].bg = "#1D3C1F";
            STATIONS.value[index].color = "#2ABD2A";
            return "正常";
          } else {
            STATIONS.value[index].bg = "#462929";
            STATIONS.value[index].color = "#D43737";
            return "异常";
          }
        case 1:
          if (Robot.value.socket2.gpsState  == undefined){
            STATIONS.value[index].bg = "#462929";
            STATIONS.value[index].color = "#D43737";
            return "通讯异常";
          } else if (Robot.value.socket2.gpsState == 3) {
            STATIONS.value[index].bg = "#1D3C1F";
            STATIONS.value[index].color = "#2ABD2A";
            return "3D_FIX";
          } else {
            STATIONS.value[index].bg = "#462929";
            STATIONS.value[index].color = "#D43737";
            return state1[Robot.value.socket2.gpsState];
          }
        case 2:
          if (Robot.value.socket1.roll) {
            STATIONS.value[index].bg = "#1D3C1F";
            STATIONS.value[index].color = "#2ABD2A";
            return "有数据";
          } else {
            STATIONS.value[index].bg = "#462929";
            STATIONS.value[index].color = "#D43737";
            return "无数据";
          }
        case 3:
          return Robot.value.socket1.flightMode;
        case 4:
          if (Robot.value.socket1.roll){
            return "自动模式";
          }else{
            return "";
          }
        case 5:
          return Robot.value.socket1.navStatus;
        case 6:
          return Robot.value.socket2.boardVoltage;
        case 7:
          return Robot.value.socket2.powerVoltage;
        case 8:
          if(Robot.value.socket1.signalStatus == undefined) {
            STATIONS.value[index].bg = "#462929";
            STATIONS.value[index].color = "#D43737";
            return "通讯异常";
          }else if (Robot.value.socket1.signalStatus == 0) {
            STATIONS.value[index].bg = "#1D3C1F";
            STATIONS.value[index].color = "#2ABD2A";
            return "正常";
          } else if (Robot.value.socket1.signalStatus == 1) {
            STATIONS.value[index].bg = "#372308";
            STATIONS.value[index].color = "#EE6A30";
            return "GPS信号丢失";
          } else {
            STATIONS.value[index].bg = "#462929";
            STATIONS.value[index].color = "#D43737";
            return "2.4G信号丢失";
          }
        case 9:
          if (Robot.value.socket1.lockStatus == undefined){
            STATIONS.value[index].bg = "#462929";
            STATIONS.value[index].color = "#D43737";
            return "通讯异常";
          }else if (Robot.value.socket1.lockStatus == 1) {
            STATIONS.value[index].bg = "#1D3C1F";
            STATIONS.value[index].color = "#2ABD2A";
            return "已解锁";
          } else {
            STATIONS.value[index].bg = "#462929";
            STATIONS.value[index].color = "#D43737";
            return "未解锁";
          }
      }
      }catch(e){
        console.log(e)
      }
    };
    const store = useStore();
    const Robot = computed(() => {
      return store.state.Robot;
    });
    console.log(Robot);
    const scorllGp = (index) => {
      let swidth = document.querySelector(".scorllStation").offsetWidth;
      let iwdth = document.querySelector(".stationlist").offsetWidth + 25;
      let length = STATIONS.value.length;
      if (index == 2) {
        if (scorllX == 0) {
          return;
        }
        scorllX -= iwdth;
        document.querySelector(
          ".scorllStation"
        ).style.transform = `translateX(-${scorllX}px)`;
      } else if (index == 1) {
        if (scorllX >= iwdth * length - swidth) {
          return;
        }
        scorllX += iwdth;
        document.querySelector(
          ".scorllStation"
        ).style.transform = `translateX(-${scorllX}px)`;
      }
    };
    return {
      scorllGp,
      filFunction,
      Robot,
      STATIONS,
    };
  },
});
</script>
<style lang="less" scoped>
.flysys {
  .box {
    display: flex;
    padding: 0 15px;
    align-items: center;
    i {
      font-size: 20px;
      color: #556297;
      cursor: pointer;
    }
  }
  .content {
    align-items: center;
    overflow: hidden;
    position: relative;
    margin: 0 30px;
    i {
      position: absolute;
    }
  }
  ul {
    padding: 15px 0;
    transition: transform 0.3s ease 0s;
    display: flex;
    li {
      display: flex;
      align-items: center;
      margin: 0 5px;
      text-overflow: ellipsis;
      white-space: nowrap;
      p {
        width: 90px;
        height: 38px;
        background: #3d4661;
        text-align: center;
        line-height: 38px;
        border: 1px solid #7287fd;
        margin-left: 10px;
        flex-shrink: 0;
        color: #fff;
        border-radius: 10px;
      }
      span {
        color: #fff;
        flex-shrink: 0;
        font-size: @font14;
      }
    }
  }
}
</style>
