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
        <div class="viewcenter">
          <!-- <div class="clock">
            <ul class="min"></ul>
            <ul class="hour" v-html="lineHtml"></ul>
            <ul class="numbers"></ul>
            <ul class="pointer" v-html="numberHtml"></ul>
          </div> -->
          <div class="clock" id="clock">
            <!-- 原点 -->
            <div class="origin"></div>

            <!-- 时分秒针 -->
            <div class="clock-line hour-line" id="hour-line"></div>
            <div class="clock-line minute-line" id="minute-line"></div>
            <div class="clock-line second-line" id="second-line"></div>

            <!-- 日期 -->
            <div class="date-info" id="date-info"></div>
            <!-- 时间 -->
            <div class="time-info">
              <div class="time" id="hour-time"></div>
              <div class="time" id="minute-time"></div>
              <div class="time" id="second-time"></div>
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
// /* 表盘 */
// .clock {
//   width: 200px;
//   height: 200px;
//   margin: 30px auto;
//   border-radius: 100px;
//   background-color: #009688;
//   position: relative;
//   .hour {
//     li {
//       position: absolute;
//       width: 20px;
//       height: 10px;
//       left: 50%;
//       top: 50%;
//       transform-origin: left center;
//       transform: translate(85px, -5px);
//     }
//   }
// }
// /* 刻度 */

// .line-demo {
//   position: absolute;
//   width: 20px;
//   height: 10px;
//   left: 50%;
//   top: 50%;
//   transform-origin: left center;
//   transform: translate(85px, -5px);
// }
// .circle {
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   background: white;
//   width: 10px;
//   height: 10px;
//   border-radius: 5px;
//   margin-top: -5px;
//   margin-left: -5px;
// }

</style>
<style lang="less">
  .cicleBox{
    /* 全局 */
* {
  margin: 0;
  padding: 0;
}
.clock {
  width: 400px;
  height: 400px;
  border: 10px solid #333;
  box-shadow: 0px 0px 20px 3px #444 inset;
  border-radius: 210px;
  position: relative;
  margin: 5px auto;
  z-index: 10;
  background-color: #f6f6f6;
}
/* 时钟数字 */
.clock-num {
  width: 40px;
  height: 40px;
  font-size: 22px;
  text-align: center;
  line-height: 40px;
  position: absolute;
  z-index: 8;
  color: #555;
  font-family: fantasy, "Trebuchet MS";
}
.em_num {
  font-size: 28px;
}
/* 指针 */
.clock-line {
  position: absolute;
  z-index: 20;
}
.hour-line {
  width: 100px;
  height: 4px;
  top: 198px;
  left: 200px;
  background-color: #000;
  border-radius: 2px;
  transform-origin: 0 50%;
  box-shadow: 1px -3px 8px 3px #aaa;
}
.minute-line {
  width: 130px;
  height: 2px;
  top: 199px;
  left: 190px;
  background-color: #000;
  transform-origin: 7.692% 50%;
  box-shadow: 1px -3px 8px 1px #aaa;
}
.second-line {
  width: 170px;
  height: 1px;
  top: 199.5px;
  left: 180px;
  background-color: #f60;
  transform-origin: 11.765% 50%;
  box-shadow: 1px -3px 7px 1px #bbb;
}
/* 原点 */
.origin {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: #000;
  position: absolute;
  top: 190px;
  left: 190px;
  z-index: 14;
}

/* 日期 时间 */
.date-info {
  width: 160px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  position: absolute;
  top: 230px;
  left: 120px;
  z-index: 11;
  color: #555;
  font-weight: bold;
  font-family: "微软雅黑";
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
  background-color: #555;
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
  transform-origin: 0% 50%;
  z-index: 7;
  position: absolute;
  top: 199px;
  left: 200px;
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
      //  }, 800);
    };
    onMounted(() => {
      nextTick(() => {
        // CreateHourLines(dataObj);
        (function () {
          window.onload = initNumXY(200, 160, 40, 40);
          var hour_line = document.getElementById("hour-line");
          var minute_line = document.getElementById("minute-line");
          var second_line = document.getElementById("second-line");
          var date_info = document.getElementById("date-info");
          var week_day = [
            "星期日",
            "星期一",
            "星期二",
            "星期三",
            "星期四",
            "星期五",
            "星期六",
          ];
          var hour_time = document.getElementById("hour-time");
          var minute_time = document.getElementById("minute-time");
          var second_time = document.getElementById("second-time");
          function setTime() {
            var this_day = new Date();
            var hour =
              this_day.getHours() >= 12
                ? this_day.getHours() - 12
                : this_day.getHours();
            var minute = this_day.getMinutes();
            var second = this_day.getSeconds();
            var hour_rotate = hour * 30 - 90 + Math.floor(minute / 12) * 6;
            var year = this_day.getFullYear();
            var month =
              this_day.getMonth() + 1 < 10
                ? "0" + (this_day.getMonth() + 1)
                : this_day.getMonth() + 1;
            var date =
              this_day.getDate() < 10
                ? "0" + this_day.getDate()
                : this_day.getDate();
            var day = this_day.getDay();
            hour_line.style.transform = "rotate(" + hour_rotate + "deg)";
            minute_line.style.transform =
              "rotate(" + (minute * 6 - 90) + "deg)";
            second_line.style.transform =
              "rotate(" + (second * 6 - 90) + "deg)";
            date_info.innerHTML =
              year + "-" + month + "-" + date + " " + week_day[day];
            hour_time.innerHTML =
              this_day.getHours() < 10
                ? "0" + this_day.getHours()
                : this_day.getHours();
            minute_time.innerHTML =
              this_day.getMinutes() < 10
                ? "0" + this_day.getMinutes()
                : this_day.getMinutes();
            second_time.innerHTML =
              this_day.getSeconds() < 10
                ? "0" + this_day.getSeconds()
                : this_day.getSeconds();
          }
          setInterval(setTime, 1000);

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
                  "<div style='width: 40px; height: 40px;font-size: 22px;text-align: center;line-height: 40px;position: absolute;z-index: 8; color: #555;font-family:fantasy,Trebuchet MS;' class='clock-num em_num'>" + i + "</div>";
              } else {
                clock.innerHTML += "<div class='clock-num'>" + i + "</div>";
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
function CreateHourLines(data) {
  /* 绘制钟表的时钟刻度线 */
  var html = "";
  var html1 = "";
  // key1表示x方向上的偏移量，key2表示y方向上的偏移量
  var val, key1, key2, key3, key4;
  for (var i = 0; i < 12; i++) {
    val = i * 30;
    key1 = 88;
    key2 = 0;
    key3 = -14;
    key4 = 6;
    if (val > 180 && val < 360) {
      key1 = 90;
    }
    if (val > 0 && val < 180) {
      key1 = 85;
    }

    if (val >= 90 && val < 270) {
      key2 = 3;
      key3 = -1;
      key4 = -13;
    }
    if (val < 90 || val > 270) {
      key2 = -3;
    }
    if (val >= 0 && val < 90) {
      key3 = -10;
      key4 = -10;
    }
    if (val > 90 && val < 180) {
      key3 = 6;
      key4 = -7;
    }
    if (val == 90) {
      key3 = 1;
      key4 = -14;
    }
    if (val >= 180 && val < 270) {
      key3 = 4;
      key4 = 5;
    }
    if (val == 240) {
      key3 = -7;
      key4 = 6;
    }
    html1 += `<li style="position: absolute;list-style:none; width: 20px;height: 10px; left: 50%;top: 50%;transform-origin: left center;
    transform: rotate(${val}deg) translate(${key1}px,${key2}px)">
    <span style="transform-origin: left center;display:inline-block;
    transform: rotate(-${val}deg) translate(${key3}px,${key4}px);font-size:12px">${val}</span>
    </li>`;
    html +=
      "<li  style='background:#fff; position: absolute;list-style:none; width: 15px;height:2px; left: 50%;top: 50%;transform-origin: left center;transform: rotate(" +
      val +
      "deg) translate(" +
      key1 +
      "px, " +
      key2 +
      "px)'></li>";
  }
  data.lineHtml = html;
  data.numberHtml = html1;
}
</script>
