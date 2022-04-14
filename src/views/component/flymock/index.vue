<template>
  <div>
     <div class="mock">
      <div class="Gzbox" ref="Gzbox"></div>
      <div class="viewLeft">
        <div class="left" ref="leftBox">
          <div
            class="item"
            v-for="(left, leftindex) in leftlist"
            :key="leftindex * 1.1"
          >
            <span class="s1">{{ left.title }}</span>
            <span class="s2">┈┄</span>
          </div>
        </div>
      </div>
      <div class="viewbox">
        <div class="viewcenter cicleBox">
          <div class="clock" id="clock" ref="clock">
            <!-- <div class="origin "></div> -->
          </div>
          <div class="centerdiv">
            <ul ref="centerdiv">
              <li v-for="(item, index) in centerlist" :key="index * 8.88">
                <div class="large">
                  <span class="s1">{{item.title}}</span>
                  <span class="s2"></span>
                  <span class="s3">{{ item.title }}</span>
                </div>
                <div class="small">
                  <span></span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="viewTop">
          <div class="left" ref="ToptBox">
            <div
              class="item"
              v-for="(right, leftindex) in Toplist"
              :key="leftindex * 0.1"
            >
              <span class="s1">{{ right.title }}</span>
              <span class="s2">¦</span>
            </div>
          </div>
        </div>
      </div>

      <div class="viewRight">
        <div class="left" ref="rightBox">
          <div
            class="item"
            v-for="(right, leftindex) in rightlist"
            :key="leftindex"
          >
            <span class="s2">┈┄</span>
            <span class="s1">{{ right.title }}</span>
          </div>
        </div>
      </div>
      <div class="p-left"><span></span>{{ leftvalue }}</div>
      <div class="p-right">{{ rightvalue }}<span></span></div>
      <div class="p-bottom"><i class="iconfont icon-jiantou"></i></div>
      <div class="p-top"><i class="iconfont icon-jiantou"></i></div>
      <div class="p-center"><i class="iconfont icon-mono-top-full"></i></div>
      <div class="iconfont icon-planebfeiji feiji" ref="feiji"></div>
      <div class="dw1">
      ALT/m
      </div>
      <div class="dw2">
      IAS/m/s
      </div>
    </div>
    <!-- <button @click="changeTarge">left</button> -->
  </div>
</template>
<script >
import {
  defineComponent,
  ref,
  reactive,
  nextTick,
  onMounted,
  toRefs,
} from "vue";

export default defineComponent({
  name: "Home",
  setup() {
    let arr = [];
    let arr1 = [];
    for (let i = -50; i < 50; i++) {
      arr.unshift({
        title: i * 10,
      });
    }

    for (let i = -20; i < 21; i++) {
      arr1.unshift({
        title: i,
      });
    }

    let arr3 = [];

    for (let i = -18; i < 19; i++) {
      arr3.push({
        title: i * 10,
      });
    }

    const leftlist = ref(arr);
    const rightlist = ref(arr1);
    const Toplist = ref(arr3);
    const centerlist = ref(arr3.reverse());
    const leftBox = ref(null);
    const ToptBox = ref(null);
    const rightBox = ref(null);
    const feiji = ref(null);
    const Gzbox = ref(null);
    const centerdiv = ref(null);
    let dataObj = reactive({
      leftvalue: 0,
      rightvalue: 0,
      lineHtml: null,
      numberHtml: null,
    });
    let onOff = true;
    const changeTarge = () => {
      // setInterval(() => {
      let num = parseInt(10 * Math.random());
      leftBox.value.style.transform = `translateY(${
        (num / 10) * 30 - 1354 + "px"
      })`;
      dataObj.leftvalue = parseInt(num);

      rightBox.value.style.transform = `translateY(${num * 30 - 484 + "px"})`;
      dataObj.rightvalue = parseInt(num);

      let num1 = 16 * Math.random();
      console.log(num1);
      ToptBox.value.style.transform = `translateX(${
        -(num1 / 10) * 50 - 804 + "px"
      })`;

      //中间滚轮效果
      let deg = 360 * Math.random();

      let doms = document.getElementsByClassName("clock-num ");

      console.log(num);
      document.getElementById("clock").style.transform = `rotate(${-deg}deg)`;
      for (let i = 0; i < doms.length; i++) {
        doms[i].style.transform = `rotate(${deg}deg)`;
      }

      //俯仰效果
      centerdiv.value.style.transform = `translateY(${num * 35 - 560 + "px"})`;

      feiji.value.style.transform = `rotateX(${num * 10 + "deg"})`;

      //波浪效果
      onOff = !onOff;
      let gos = null;
      onOff
        ? (gos = `-${50 * Math.random()}`)
        : (gos = `${50 * Math.random()}`);
      Gzbox.value.style.transform = `rotate(${gos}deg) translateY(${
        num * 10 + "px"
      })`;

      //}, 600);
    };
    onMounted(() => {
      nextTick(() => {
        (function () {
          window.onload = initNumXY(110, 110, 40, 40);
          function initNumXY(R, r, w, h) {
            var numXY = [
              {
                left: R + 0.5 * r - 0.5 * w,
                top: R - 0.5 * r * 1.73205 - 0.5 * h,
              },
              {
                left: R + 0.5 * r * 1.73205 - 0.5 * w,
                top: R - 0.5 * r - 0.5 * h,
              },
              {
                left: R + r - 0.5 * w,
                top: R - 0.5 * h,
              },
              {
                left: R + 0.5 * r * 1.73205 - 0.5 * w,
                top: R + 0.5 * r - 0.5 * h,
              },
              {
                left: R + 0.5 * r - 0.5 * w,
                top: R + 0.5 * r * 1.732 - 0.5 * h,
              },
              {
                left: R - 0.5 * w,
                top: R + r - 0.5 * h,
              },
              {
                left: R - 0.5 * r - 0.5 * w,
                top: R + 0.5 * r * 1.732 - 0.5 * h,
              },
              {
                left: R - 0.5 * r * 1.73205 - 0.5 * w,
                top: R + 0.5 * r - 0.5 * h,
              },
              {
                left: R - r - 0.5 * w,
                top: R - 0.5 * h,
              },
              {
                left: R - 0.5 * r * 1.73205 - 0.5 * w,
                top: R - 0.5 * r - 0.5 * h,
              },
              {
                left: R - 0.5 * r - 0.5 * w,
                top: R - 0.5 * r * 1.73205 - 0.5 * h,
              },
              {
                left: R - 0.5 * w,
                top: R - r - 0.5 * h,
              },
            ];
            var clock = document.getElementById("clock");
            for (var i = 1; i <= 12; i++) {
              if (i % 3 == 0) {
                clock.innerHTML +=
                  "<div  class='clock-num em_num'>" +
                  (i * 30 == 360 ? 0 : i * 30) +
                  "</div>";
              } else {
                clock.innerHTML +=
                  "<div class='clock-num'>" + i * 30 + "</div>";
              }
            }
            var clock_num = document.getElementsByClassName("clock-num");
            for (var i = 0; i < clock_num.length; i++) {
              clock_num[i].style.left = numXY[i].left + "px";
              clock_num[i].style.top = numXY[i].top + "px";
            }
            for (var i = 0; i < 60; i++) {
              clock.innerHTML +=
                "<div class='clock-scale'> " +
                "<div class='scale-hidden'></div>" +
                "<div class='scale-show'></div>" +
                "</div>";
            }
            var scale = document.getElementsByClassName("clock-scale");
            for (var i = 0; i < scale.length; i++) {
              scale[i].style.transform = "rotate(" + (i * 6 - 90) + "deg)";
            }
          }
        })();
      });
    });
    return {
      leftlist,
      rightlist,
      centerlist,
      Toplist,
      changeTarge,
      leftBox,
      centerdiv,
      Gzbox,
      rightBox,
      feiji,
      ToptBox,
      ...toRefs(dataObj),
    };
  },
});
</script>
<style lang="less" scoped>
.mock {
background: linear-gradient(181deg, #0C7586, #B7D94D);
border-radius: 10px;
  height: 320px;
  width: 430px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  position: relative;
  .feiji {
    font-size: 120px;
    position: absolute;
    transition: transform 0.61s ease 0s, background-color 2s ease 3s;
    color: #ff7a39;
    opacity: 0.6;
    top: 55px;
    left: 160px;
  }
  .Gzbox {
    width: 1200px;
    height: 500px;
    background: linear-gradient(186deg, #0C489B, #7CB2F5);
    transform-origin: top center;
    transition: transform 0.61s ease 0s, background-color 2s ease 3s;
    position: absolute;
    border-top: 1px solid #fff;
    top:150px;
    left: -50%;
  }
  .centerdiv {
    position: absolute;
    top: 30px;
    height: calc(27 * 6px);
    overflow: hidden;
    left: 40%;
    transition: transform 0.61s ease 0s, background-color 2s ease 3s;
    transform: translateX(-35%);
    ul {
      transform: translateY(-560px);
      transition: transform 0.61s ease 0s, background-color 2s ease 3s;
      li {
        list-style: none;

        .large {
          display: flex;
          align-items: center;
          justify-content: space-around;
          font-size: 12px;
          .s1 {
            color: #F7FA25;
            padding: 0 5px;
             opacity: 0.8;
          }
          .s2 {
            width: 40px;
            height: 1px;
            background: #fff;
            display: inline-block;
            opacity: 0.6;
          }
          .s3 {
            margin-left: 5px;
            color: #F7FA25;
            opacity: 0.8;
          }
        }
        .small {
          display: flex;
          padding: 8px;
          align-items: center;
          justify-content: center;
          span {
            width: 15px;
            opacity: 0.6;
            height: 1px;
            background: #fff;
            margin-left: -24px;
            display: inline-block;
          }
        }
      }
    }
  }
  .p-left {
    position: absolute;
    top: 140px;
    left: 35px;
    color: #ff7a39;;
     display: flex;
    align-items: center;
    span {
      width: 30px;
      height: 3px;
      background: #ff7a39;
      display: inline-block;
    }
  }
  .p-right {
    position: absolute;
    top: 140px;
    display: flex;
    align-items: center;
    right: 35px;
    color: #ff7a39;;
    span {
      width:30px;
      height: 3px;
      background: #ff7a39;
      display: inline-block;
    }
  }
  .p-center {
    position: absolute;
    top: 131px;
    left: 196px;
    i {
      font-size: 40px;
      color: #ff7a39;
    }
  }
  .p-bottom {
    position: absolute;
    bottom: -10px;
    left: 202px;
    transform: rotate(180deg);
    i {
      font-size: 28px;
      color: #ff7a39;
    }
  }
  .dw1{
    position: absolute;
    top: 0px;
    left: 10px;
    color: #F7FA25;
    font-size: 12px;
  }
  .dw2{
    position: absolute;
    top: 0px;
    right: 10px;
    color: #F7FA25;
    font-size: 12px;
  }
  .p-top {
    position: absolute;
    top: -10px;
    left: 200px;
    transform: rotate(180deg);
    i {
      font-size: 28px;
      color: #ff7a39;
    }
    span {
      width: 60px;
      height: 3px;
      background: #ff7a39;
      display: inline-block;
    }
  }
  .viewbox {
    .viewTop {
      margin-top: 10px;
      width: 243px;
      border-bottom: 1px dashed #fff;
      position: absolute;
      left: 94px;
      height: 45px;
      overflow: hidden;
      .left {
        transform: translateX(-804px);
        display: flex;
        flex-direction: row;
        transition: transform 0.61s ease 0s, background-color 2s ease 3s;

        .item {
          display: flex;
          width: 50px;
          flex-shrink: 0;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          color: #DBE53C;
          .s1 {
          }
          .s2 {
          }
        }
      }
    }
  }

  .viewLeft {
    margin: 20px 10px 20px 10px;
    width: 50px;
    overflow: hidden;
    height: 270px;
    .left {
      width: 50px;
      transform: translateY(-1354px);
      transition: transform 0.61s ease 0s, background-color 2s ease 3s;
      border-right: 1px dashed #fff;
      .item {
        display: flex;
        height: 30px;
        line-height: 30px;
        align-items: center;
        justify-content: space-between;
        color: #fff;
        .s1 {
        }
        .s2 {
        }
      }
    }
  }
  .viewRight {
    margin: 20px 10px 20px 10px;
    width: 50px;
    overflow: hidden;
    height: 270px;
    .left {
      width: 50px;
      transform: translateY(-484px);
      transition: transform 0.61s ease 0s, background-color 2s ease 3s;
      border-left: 1px dashed #fff;
      .item {
        display: flex;
        height: 30px;
        line-height: 30px;
        align-items: center;
        justify-content: space-between;
        color: #fff;
        .s1 {
        }
        .s2 {
        }
      }
    }
  }
}
</style>
<style lang="less">
.cicleBox {
  margin-top: 40px;
  position: relative;
  /* 全局 */
  * {
    margin: 0;
    padding: 0;
  }
  .clock {
    width: 220px;
    height: 220px;
    // box-shadow: 0px 0px 20px 3px #444 inset;
    transition: transform 0.61s ease 0s, background-color 2s ease 3s;
    border-radius: 150px;
    position: relative;
    margin: 5px auto;
    z-index: 10;
    // background-color:#233647;
  }
  /* 时钟数字 */
  .clock-num {
    width: 40px;
    height: 40px;
    font-size: 12px;
    text-align: center;
    line-height: 40px;
    position: absolute;
    z-index: 8;
    color: #d7dadd;
  }
  .em_num {
    font-size: 16px;
  }

  .origin {
    width: 2px;
    height: 2px;
    border-radius: 10px;
    background-color: #000;
    position: absolute;
    font-size: 160px;
    color: #c8d332;
    top: 98px;
    left:98px;
    z-index: 14;
  }

  .time-info {
    width: 92px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    position: absolute;
    top: 270px;
    left: 154px;
    z-index: 11;
    background-color: #d7dadd;
    padding: 0;
    box-shadow: 0px 0px 9px 2px #222 inset;
  }
  .time {
    width: 30px;
    height: 30px;
    text-align: center;
    float: left;
    color: #fff;
    font-weight: bold;
  }
  #minute-time {
    border-left: 1px solid #fff;
    border-right: 1px solid #fff;
  }

  /* 刻度 */
  .clock-scale {
    width: 195px;
    height: 2px;
    transform-origin: 33% 50%;
    z-index: 7;
    position: absolute;
    top: 110px;
    left:47px;
  }
  .scale-show {
    width: 12px;
    height: 2px;
    background-color: #555;
    float: left;
  }
  .scale-hidden {
    width: 183px;
    height: 2px;
    float: left;
  }
}
</style>