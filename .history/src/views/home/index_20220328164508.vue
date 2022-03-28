<template>
  <div class="indexlayout-main-conent">
    <div class="mock">
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
        <div class="viewcenter cicleBox">
          <div class="clock" id="clock" ref="clock">

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
      <!-- <div class="p-top"><span></span></div> -->
    </div>
    <button @click="changeTarge">left</button>
  </div>
</template>
<style lang="less" scoped>
.mock {
  background: #436da7;
  height: 500px;
  width: 600px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  position: relative;
  .p-left {
    position: absolute;
    top: 202px;
    left: 100px;
    span {
      width: 60px;
      height: 3px;
      background: #c8d332;
      display: inline-block;
    }
  }
  .p-right {
    position: absolute;
    top: 202px;
    right: 100px;
    span {
      width: 60px;
      height: 3px;
      background: #c8d332;
      display: inline-block;
    }
  }
  .p-top {
    position: absolute;
    top: 70px;
    left: 269px;
    transform: rotate(90deg);
    span {
      width: 60px;
      height: 3px;
      background: #c8d332;
      display: inline-block;
    }
  }
  .viewbox {
    .viewTop {
      width: 300px;
      border-bottom: 1px dashed #fff;
      height: 45px;
      overflow: hidden;
      .left {
        transform: translateX(-180px);
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
          color: #fff;
          .s1 {
          }
          .s2 {
          }
        }
      }
    }
  }

  .viewLeft {
    margin: 50px;
    width: 50px;
    overflow: hidden;
    height: 330px;
    .left {
      width: 50px;
      transform: translateY(-1320px);
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
    margin: 50px;
    width: 50px;
    overflow: hidden;
    height: 330px;
    .left {
      width: 50px;
      transform: translateY(-450px);
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
  .cicleBox{
    /* 全局 */
* {
  margin: 0;
  padding: 0;
}
.clock {
  width: 300px;
  height: 300px;
  box-shadow: 0px 0px 20px 3px #444 inset;
  border-radius: 150px;
  position: relative;
  margin: 5px auto;
  z-index: 10;
  background-color:#233647;
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
  color: #D7DADD;
  font-family: fantasy, "Trebuchet MS";
}
.em_num {
  font-size: 16px;
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
  background-color: #D7DADD;
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
  transform-origin: 26% 50%;
  z-index: 7;
  position: absolute;
  top: 149px;
  left: 100px;
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
<script >
import {
  defineComponent,
  defineAsyncComponent,
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

    for (let i = -6; i < 7; i++) {
      arr3.push({
        title: i * 10,
      });
    }
    const leftlist = ref(arr);
    const rightlist = ref(arr1);
    const Toplist = ref(arr3);
    const leftBox = ref(null);
    const ToptBox = ref(null);
    const rightBox = ref(null);
    let dataObj = reactive({
      leftvalue: 0,
      rightvalue: 0,
      lineHtml: null,
      numberHtml: null,
    });
    const changeTarge = () => {
      //   setInterval(() => {
      let num = 10 * Math.random();
      leftBox.value.style.transform = `translateY(${
        (num / 10) * 30 - 1320 + "px"
      })`;
      dataObj.leftvalue = parseInt(num);
      rightBox.value.style.transform = `translateY(${-16 * 30 - 450 + "px"})`;
      dataObj.rightvalue = parseInt(num);

      let num1 = 16 * Math.random();
      console.log(num1);
      ToptBox.value.style.transform = `translateX(${
        -(num1 / 10) * 50 - 180 + "px"
      })`;

      let doms = document.getElementsByClassName('clock-num ')
      for(let i = 0;i<doms.length;i++){
        console.log(i)
        doms[i].style.transform = `rotate(${-90}deg)`
      }
      console.log(doms)
      document.getElementById("clock").style.transform = `rotate(${90}deg)`
      //  }, 800);
    };
    onMounted(() => {
      nextTick(() => {
        (function () {
          window.onload = initNumXY(150, 120, 40, 40);
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
                  "<div  class='clock-num em_num'>" + (i*30 == 360 ? 0:i*30) + "</div>";
              } else {
                clock.innerHTML += "<div class='clock-num'>" + i*30 + "</div>";
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
      Toplist,
      changeTarge,
      leftBox,
      rightBox,
      ToptBox,
      ...toRefs(dataObj),
    };
  },
});
</script>
