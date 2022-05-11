<template>
  <div class="flycheck">
    <elHeader title="飞前检查" minsize></elHeader>
    <div class="box">
      <div class="tab">
        <div
          class="item"
          v-for="(item, index) in tabs"
          :key="index * 3.33"
          :class="{ active: activeIndex == index }"
          @click="changeTab(item, index)"
        >
          <p>{{ item.name }}</p>
          <img
            style="padding-left: 10px"
            v-show="checkList[index].checked"
            src="../../assets/images/icon1.png"
            alt=""
          />
        </div>
      </div>
      <div class="content">
        <div class="list" v-show="tabs[0].checked">
          <p class="p1">
            <span class="iconfont icon-tishi"></span
            >检查各连接器是否安装牢靠，各舵机安装是否良好。
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
          <p class="p1">
            <span class="iconfont icon-tishi"></span
            >转动机身，检查显示是否与实际姿态一致。
          </p>
          <div style="display: flex; align-items: center; margin-top: 25px">
            <div class="item">
              <span class="s3">滚转</span>
              <span class="s4">{{ filterFun(robot.socket1.roll) }}</span>
            </div>
            <div class="item">
              <span class="s3">俯仰</span>
              <span class="s4">{{ filterFun(robot.socket1.pitch) }}</span>
            </div>
            <div class="item">
              <span class="s3">偏航</span>
              <span class="s4">{{ filterFun(robot.socket1.yaw) }}</span>
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
          <div style="display: flex; justify-content: space-between">
            <div>
              <p class="p1">
                <span class="iconfont icon-tishi"></span
                >转动机身，检查显示是否与实际姿态一致。
              </p>

              <div
                style="
                  display: flex;
                  align-items: center;
                  margin: 35px 0;
                  flex-direction: column;
                "
              >
                <div class="item">
                  <span class="s3" style="width: 230px">偏航角</span>
                  <span class="s4">{{ filterFun(robot.socket1.yaw) }}</span>
                </div>
                <div class="item" style="margin-top: 30px; margin-bottom: 30px">
                  <span class="s3" style="width: 230px">磁航向</span>
                  <span class="s4">{{ robot.socket2.magOrient }}</span>
                </div>
                <div class="item">
                  <span class="s3" style="width: 230px"
                    >偏航角与磁航向误差</span
                  >
                  <span class="s4">{{
                    robot.socket2.magOrient
                      ? Math.abs(
                          robot.socket2.magOrient * 1000 -
                            filterFun(robot.socket1.yaw) * 1000
                        ) / 1000
                      : ""
                  }}</span>
                </div>
              </div>
              <p class="p1" style="color: #f5863c">
                <span class="iconfont icon-tishi"></span
                >将机身左右滚转30°，检查当前偏航角与磁航向误差是否在±10°以内。
              </p>
            </div>

            <div class="circle">
              <img class="img1" src="../../assets/images/circle.png" alt="" />
              <img class="img2" src="../../assets/images/tria.png" alt="" />
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
          <div style="display: flex; align-items: center; margin-top: 25px">
            <div class="item">
              <span class="s3">GPS时间</span>
              <span class="s4">0.00</span>
            </div>
            <div class="item">
              <span class="s3">GPS状态</span>
              <span class="s4">{{ GPSFUN(robot.socket2.gpsState) }}</span>
            </div>
            <div class="item">
              <span class="s3">卫星数</span>
              <span class="s4">{{ robot.socket2.satNum }}</span>
            </div>
          </div>
          <div style="display: flex; align-items: center; margin-top: 25px">
            <div class="item">
              <span class="s3">pDop</span>
              <span class="s4">{{ robot.socket2.dop }}</span>
            </div>
            <div class="item">
              <span class="s3">主电源</span>
              <span class="s4">{{ robot.socket2.boardVoltage }}</span>
            </div>
            <div class="item">
              <span class="s3">动力电源</span>
              <span class="s4">{{ robot.socket2.powerVoltage }}</span>
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
import { defineComponent, ref, computed, onMounted, nextTick } from "vue";
import elHeader from "@/components/header.vue";
import { message } from "ant-design-vue";
import { useStore } from "vuex";
import {
  getBeforeFlyCheck,
  beforeFlyCheck,
  updateBeforeFlyCheck,
} from "./service";
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
    const activeIndex = ref(0);
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
    const rotate = () => {
      nextTick(() => {
        document.querySelector(
          ".img2"
        ).style.transform = `rotate(${robot.value.socket2.magOrient}deg)`;
      });
    };
    const changeTab = (item, index) => {
      tabs.value.map((val) => (val.checked = false));
      activeIndex.value = index;
      item.checked = true;
      rotate();
    };
    const changeBox = (e, index) => {
      rotate();
      if (checkList.value[index - 1].id) {
        updateBeforeFlyCheck({
          id: checkList.value[index - 1].id,
          status: e.target.checked ? 0 : 1,
        });
      } else {
        beforeFlyCheck({
          seq: index,
          uid: store.state.Token,
        }).then((res) => {
          changeSeq();
        });
      }

      if (index <= 3) {
        if (e.target.checked) {
          activeIndex.value = index;
          tabs.value.map((val) => (val.checked = false));
          tabs.value[index].checked = true;
        } else {
          changeBox(
            {
              target: {
                checked: false,
              },
            },
            4
          );
        }
      } else {
        let onoff = checkList.value.every((item) => item.checked == true);
        if (!onoff) {
          message.error("请完成全部检查");
          checkList.value[3].checked = false;
        } else {
          message.success("全部检查完成");
          remote.getCurrentWindow().close();
        }
      }
    };
    const filterFun = (val) => {
      return val ? parseFloat((val * 180) / Math.PI).toFixed(3) : "";
    };
    const GPSFUN = (val) => {
      return stategps[val];
    };
    const changeSeq = async () => {
      try {
        let data = await getBeforeFlyCheck({
          uid: store.state.Token,
        });
        data.data.data.map((item) => {
          checkList.value[item.seq - 1].id = item.id;
          checkList.value[item.seq - 1].checked =
            item.status == 0 ? true : false;
        });
      } catch (e) {
        console.log(e);
      }
    };
    onMounted(() => {
      changeSeq();
    });
    return {
      tabs,
      checkList,
      robot,
      activeIndex,
      changeTab,
      changeSeq,
      filterFun,
      changeBox,
      GPSFUN,
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
    display: flex;
    align-items: center;
    justify-content: center;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    width: 135px;
    height: 40px;
    background: #3b4565;
    border: 1px solid #7287fd;
    border-radius: 4px;
  }
  .box {
    padding: 10px 20px;
    padding-top: 40px;
    .content {
      .list {
        .circle {
          position: relative;
          span {
            display: inline-block;
            width: 3px;
            height: 3px;
            background: #f00;
            position: absolute;
            z-index: 999;
            top: 50%;
            left: 50%;
          }
          .img1 {
          }
          .img2 {
            position: absolute;
            transition: transform 0.21s ease 0s;
            transform-origin: 50% 61%;
            top: 50%;
            margin-top: -66px;
            margin-left: -30px;
            left: 50%;
          }
        }
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
            display: inline-block;
            border-radius: 50%;
            margin-right: 10px;
          }
          color: #fff83e;
          margin-top: 15px;
          margin-left: 10px;
          font-size: @font14;
        }
      }
    }
    .tab {
      display: flex;
      align-items: center;
      border-radius: 15px;
      .active {
        background: #5f83f9 !important;
      }
      .item {
        background: #3e4970;
        cursor: pointer;
        display: flex;
        align-items: center;
        border: 1px solid #5a7dee;
        border-radius: 5px;
        padding: 0px 20px;
        border-radius: 15px;
        height: 35px;
        margin: 15px 8px;
        i {
          color: #4fab1e;
          padding-left: 3px;
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