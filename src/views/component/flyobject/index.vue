<template>
  <div>
    <div class="content">
      <div class="item">
        <div class="line"></div>
        <span>位置</span>
        <div class="line"></div>
      </div>
      <div class="box">
        <i
          class="iconfont icon-sanjiaoleft"
          @click="scorllGp(2, '.flys1', '.fliItems1')"
        ></i>
        <div class="scorlldiv">
          <ul class="flys1">
            <li class="fliItems1">
              <p>纬度</p>
              <span>{{ Robot.socket1.curLat }}</span>
            </li>
            <li>
              <p>经度</p>
              <span>{{ Robot.socket1.curLng }}</span>
            </li>
            <li>
              <p>高度</p>
              <span>{{ Robot.socket1.curAlt }}</span>
            </li>
            <li>
              <p>GPS状态</p>
              <span :style="{ color: co5 }">{{
                filterStatus("gpsState")
              }}</span>
            </li>
            <li>
              <p>Dop精度</p>
              <span>{{ Robot.socket2.dop }}</span>
            </li>
          </ul>
        </div>
        <i
          class="iconfont icon-sanjiaoright"
          @click="scorllGp(1, '.flys1', '.fliItems1')"
        ></i>
      </div>

      <div class="item">
        <div class="line"></div>
        <span>姿态</span>
        <div class="line"></div>
      </div>
      <div class="box">
        <i
          class="iconfont icon-sanjiaoleft"
          @click="scorllGp(2, '.flys2', '.fliItems2')"
        ></i>
        <div class="scorlldiv">
          <ul class="flys2">
            <li class="fliItems2">
              <p>滚转</p>
              <span>{{ filterFun(Robot.socket1.roll) }}</span>
            </li>
            <li>
              <p>俯仰</p>
              <span>{{ filterFun(Robot.socket1.pitch) }}</span>
            </li>
            <li>
              <p>偏航</p>
              <span>{{ filterFun(Robot.socket1.yaw) }}</span>
            </li>
          </ul>
        </div>
        <i
          class="iconfont icon-sanjiaoright"
          @click="scorllGp(1, '.flys2', '.fliItems2')"
        ></i>
      </div>

      <div class="item">
        <div class="line"></div>
        <span>状态</span>
        <div class="line"></div>
      </div>
      <div class="box">
        <i
          class="iconfont icon-sanjiaoleft"
          @click="scorllGp(2, '.flys3', '.fliItems3')"
        ></i>
        <div class="scorlldiv">
          <ul class="flys3">
            <li class="fliItems3">
              <p>通讯</p>
              <span :style="{ color: co3 }">{{
                rollFun(Robot.socket1.roll)
              }}</span>
            </li>
            <li>
              <p>姿态</p>
              <span :style="{ color: co1 }">{{ filterStatus("roll") }}</span>
            </li>
            <li>
              <p>GPS</p>
              <span :style="{ color: co5 }">{{
               filterStatus("gpsState")
              }}</span>
            </li>
            <li>
              <p>信号状态</p>
              <span :style="{ color: co4 }">{{
                filterStatus("signalStatus")
              }}</span>
            </li>
          </ul>
        </div>
        <i
          class="iconfont icon-sanjiaoright"
          @click="scorllGp(1, '.flys3', '.fliItems3')"
        ></i>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "flyobject",
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
    let co1 = ref("#dbe53c");
    let co2 = ref("#dbe53c");
    let co3 = ref("#dbe53c");
    let co4 = ref("#dbe53c");
    let co5 = ref("#dbe53c");
    const Robot = computed(() => {
      return store.state.Robot;
    });
    const filterFun = (val) => {
      return val ? parseFloat((val * 180) / Math.PI).toFixed(3) : "";
    };
    const filterStatus = (params) => {
      if (params == "roll") {
        if (
          Robot.value.socket1.roll &&
          Math.abs((Robot.value.socket1.roll * 180) / Math.PI) < 50 &&
          Math.abs((Robot.value.socket1.pitch * 180) / Math.PI) < 50
        ) {
          co1.value = "#dbe53c";
          return "正常";
        } else {
          co1.value = "#D43737";
          return "异常";
        }
      } else if (params == "signalStatus") {
        if (Robot.value.socket1.signalStatus == undefined) {
          co4.value = "#D43737";
          return "通讯异常";
        } else if (Robot.value.socket1.signalStatus == 0) {
          co4.value = "#dbe53c";
          return "正常";
        } else if (Robot.value.socket1.signalStatus == 1) {
          co4.value = "#D43737";
          return "GPS信号丢失";
        } else {
          co4.value = "#D43737";
          return "2.4G遥控器信号丢失";
        }
      } else if (params == "gpsState") {
        if (Robot.value.socket2.gpsState == undefined) {
          co5.value = "#D43737";
          return "通讯异常";
        } else if (Robot.value.socket2.gpsState == 3) {
          co5.value = "#dbe53c";
          return "3D_FIX";
        } else {
          co5.value = "#D43737";
          return "异常"
        }
      }
    };
    const GPSFUN = (val) => {
      if (val == 3) {
        co2.value = "#dbe53c";
        return "正常";
      } else {
        co2.value = "#D43737";
        return "异常";
      }
    };
    const rollFun = (val) => {
      if (val) {
        co3.value = "#dbe53c";
        return "有数据";
      } else {
        co3.value = "#D43737";
        return "无数据";
      }
    };
    const scorllGp = (index, dom1, dom2) => {
      let swidth = document.querySelector(dom1).offsetWidth;
      let iwdth = document.querySelector(dom2).offsetWidth + 15;
      let length = document
        .querySelector(dom1)
        .getElementsByTagName("li").length;
      let scorllX = parseInt(
        document.querySelector(dom1).getAttribute("num") || 0
      );
      if (index == 2) {
        if (scorllX == 0) {
          return;
        }
        scorllX -= iwdth;
        document.querySelector(
          dom1
        ).style.transform = `translateX(-${scorllX}px)`;
        document.querySelector(dom1).setAttribute("num", scorllX);
      } else if (index == 1) {
        if (scorllX >= iwdth * length - swidth) {
          return;
        }
        scorllX += iwdth;
        document.querySelector(
          dom1
        ).style.transform = `translateX(-${scorllX}px)`;
        document.querySelector(dom1).setAttribute("num", scorllX);
      }
    };
    return {
      Robot,
      filterFun,
      scorllGp,
      rollFun,
      co1,
      co2,
      co3,
      co4,
      co5,
      filterStatus,
      GPSFUN,
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
  .item {
    display: flex;
    align-items: center;
    margin: 5px;
    .line {
      border-top: 1px dashed #5565a9;
      flex: 1;
    }
    span {
      color: #7595fb;
      margin: 0 15px;
      font-size: @font12;
    }
  }
  .box {
    display: flex;
    align-items: center;
    width: 460px;
    margin-top: 5px;
    .scorlldiv {
      overflow: hidden;
      position: relative;
    }
    ul {
      display: flex;
      transition: transform 0.3s ease 0s;
      li {
        height: 53px;
        background: #29304f;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-content: center;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin: 0 10px;
        justify-content: center;
        flex-shrink: 0;
        width: 118px;
        border: 1px solid #3769b6;
        //  border-image: linear-gradient(180deg, #3769b6, #b6d5fd) 1 1;
        border-radius: 10px;
        p {
          font-size: 16px;
          flex-shrink: 0;
          color: #fff;
        }
        span {
          font-size: 14px;
          flex-shrink: 0;
          flex-shrink: 0;
          color: #dbe53c;
        }
      }
    }
    i {
      font-size: 20px;
      color: #556297;
      cursor: pointer;
    }
  }
}
</style>