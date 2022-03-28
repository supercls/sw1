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
          <div class="clock">
            <ul class="min"></ul>
            <ul></ul>
            <ul class="hour" v-html="addHtml"></ul>
            <ul class="numbers"></ul>
            <ul class="pointer"></ul>
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
/* 表盘 */
.clock {
  width: 200px;
  height: 200px;
  margin: 30px auto;
  border-radius: 100px;
  background-color: #fff;
  position: relative;
  .hour{
      li{
     position: absolute;
  width: 20px;
  height: 10px;
  left: 50%;
  top: 50%;
  transform-origin: left center;
  transform: translate(85px, -5px);
  }
  }

}
/* 刻度 */

.line-demo {
  position: absolute;
  width: 20px;
  height: 10px;
  left: 50%;
  top: 50%;
  transform-origin: left center;
  transform: translate(85px, -5px);
}
.circle {
  position: absolute;
  top: 50%;
  left: 50%;
  background: white;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  margin-top: -5px;
  margin-left: -5px;
}
</style>
<script >
import {
  defineComponent,
  defineAsyncComponent,
  ref,
  reactive,
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
      addHtml:'<li></li>'
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
    onMounted(() =>{
     CreateHourLines(dataObj)
    })
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
  // key1表示x方向上的偏移量，key2表示y方向上的偏移量
  var val, key1, key2;
  for (var i = 0; i < 12; i++) {
    val = i * 30;
    key1 = 100;
    key2 = 0;
    if (val > 180 && val < 360) {
      key1 = 100;
    }
    if (val > 0 && val < 180) {
      key1 = 90;
    }

    if (val > 90 && val < 270) {
      key2 = 6;
    }
    if (val < 90 || val > 270) {
      key2 = 0;
    }
    html +=
      "<li  style=' position: absolute; width: 20px;height: 10px; left: 50%;top: 50%;transform-origin: left center;transform: rotate(" +
      val +
      "deg) translate(" +
      key1 +
      "px, " +
      key2 +
      "px)'></li>";
  }
  data.addHtml = html
}
</script>
