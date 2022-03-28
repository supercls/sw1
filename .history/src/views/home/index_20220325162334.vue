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
      <div class="p-top"><span></span></div>
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
   .p-top{
    position: absolute;
    top: 70px;
    left: 269px;
    transform:rotate(90deg);
    span {
      width: 60px;
      height: 3px;
      background: #c8d332;
      display: inline-block;
    }
  }
  .viewTop {
    width: 300px;
    border-bottom: 1px dashed #fff;
    height: 45px;
    overflow: hidden;
    .left {
      transform: translateX(-180px);
      display: flex;
      flex-direction: row;
      transition: transform 1s ease 0s, background-color 2s ease 3s;

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
  .viewLeft {
    margin: 50px;
    width: 50px;
    overflow: hidden;
    height: 330px;
    .left {
      width: 50px;
      transform: translateY(-5820px);
      transition: transform 1s ease 0s, background-color 2s ease 3s;
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
      transform: translateY(-5820px);
      transition: transform 1s ease 0s, background-color 2s ease 3s;
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
<script >
import {
  defineComponent,
  defineAsyncComponent,
  ref,
  reactive,
  toRefs,
} from "vue";

export default defineComponent({
  name: "Home",

  setup() {
    let arr = [];
    for (let i = -10; i < 200; i++) {
      arr.unshift({
        title: i * 10,
      });
    }
    let arr3 = []

    for (let i = -6; i < 7; i++) {
      arr3.push({
        title: i * 10,
      });
    }

    const leftlist = ref(arr);
    const rightlist = ref(arr);
    const Toplist = ref(arr3)
    const leftBox = ref(null);
    const ToptBox = ref(null)
    const rightBox = ref(null);
    let dataObj = reactive({
      leftvalue: 0,
      rightvalue: 0,
    });
    const changeTarge = () => {
      setInterval(() => {
        let num = 100 * Math.random();
        leftBox.value.style.transform = `translateY(${
          (num / 10) * 30 - 5820 + "px"
        })`;
        dataObj.leftvalue = parseInt(num);
        rightBox.value.style.transform = `translateY(${
          (num / 10) * 30 - 5820 + "px"
        })`;
        dataObj.rightvalue = parseInt(num);

        let num1 = 10 * Math.random();
        console.log(num1)
        ToptBox.value.style.transform = `translateY(${
          (num1 / 10) * 50 - 180 + "px"
        })`;
      }, 1500);
    };
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
