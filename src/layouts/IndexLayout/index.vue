<template>
  <div id="indexlayout">
    <home-header> </home-header>
    <div class="menu">
      <ul>
        <li
          v-for="(item, index) in mList"
          :key="index * 1.1"
          :class="{ isActive: item.active }"
          @click="getMenu(item, index)"
        >
          <i :class="item.icon" class="iconfont"></i>
          <span>{{ item.name }}</span>
        </li>
      </ul>
      <div class="menu-right">
        <i class="iconfont icon-sanjiaoleft" @click="scorllGp(2)"></i>
        <div class="muls">
          <div class="scorlldiv">
            <div
              class="mr-list"
              :class="{ active: child.active }"
              @click="dialogView(child)"
              v-for="(child, childIndex) in childList"
              :key="childIndex * 6.66"
            >
              <span>{{ child.name }}</span>
            </div>
          </div>
        </div>

        <i class="iconfont icon-sanjiaoright" @click="scorllGp(1)"></i>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import homeHeader from "@/components/homeHeader.vue";
import menuList from "@/utils/menu";
import { defineComponent, reactive, computed, ref } from "vue";
import { Electronwindow } from "@/utils/openWindow";
export default defineComponent({
  name: "indexLayout",
  components: {
    homeHeader,
  },
  setup() {
    let scorllX = 0;
    const mList = reactive(menuList);
    const CHOOSEINDEX = ref(0);

    const getMenu = (item, index) => {
      scorllX = 0;
      document.querySelector(".scorlldiv").style.transform = `translateX(0px)`;
      mList.map((j) => {
        j.active = false;
      });
      item.active = true;
      CHOOSEINDEX.value = index;
      childList.value.map((i) => (i.active = false));
      if (item.path) {
        Electronwindow(item.path, item.width, item.height, `#${item.path}`);
      }
    };

    const childList = computed(() => {
      return mList[CHOOSEINDEX.value].children;
    });

    const dialogView = (item) => {
      childList.value.map((i) => (i.active = false));
      item.active = true;
      if (item.path == "") return;
      Electronwindow(item.path, item.width, item.height, `#${item.path}`);
    };
    const scorllGp = (index) => {
      let swidth = document.querySelector(".scorlldiv").offsetWidth;
      let iwdth = document.querySelector(".mr-list").offsetWidth + 15;
      let length = childList.value.length;
      if (index == 2) {
        if (scorllX == 0) {
          return;
        }
        scorllX -= iwdth;
        document.querySelector(
          ".scorlldiv"
        ).style.transform = `translateX(-${scorllX}px)`;
      } else if (index == 1) {
        if (scorllX >= iwdth * length - swidth) {
          return;
        }
        scorllX += iwdth;
        document.querySelector(
          ".scorlldiv"
        ).style.transform = `translateX(-${scorllX}px)`;
      }
    };
    return {
      getMenu,
      scorllGp,
      dialogView,
      CHOOSEINDEX,
      childList,
      mList,
    };
  },
});
</script>
<style lang="less" scoped>
#indexlayout {
  background: @mainbg;
  min-height: 100vh;
  .menu {
    padding: 10px 15px;
    margin-bottom: 5px;
    background: linear-gradient(-86deg, #1f2870, #131832);
    display: flex;
    .menu-right {
      margin-left: 10px;
      display: flex;
      position: relative;
      overflow: hidden;
      width: 100%;
      align-items: center;
      .muls {
        overflow: hidden;
        margin-right: 50px;
      }
      .scorlldiv {
        display: flex;
        transition: transform 0.3s ease 0s;
      }
      .mr-list {
        background: #313761;
        border: 1px solid #5365d0;
        margin-right: 15px;
        height: 36px;
        cursor: pointer;
        line-height: 36px;
        border-radius: 10px;
        width: 120px;
        text-align: center;
        white-space: nowrap;
        padding: 0 20px;
        color: #fff;
        &:hover {
          background: #5365d0;
        }
      }
      .active {
        background: #3764f6;
      }
      i {
        font-size: 28px;
        cursor: pointer;
        margin: 0 10px;
        color: #5a7dee;
      }
      .icon-sanjiaoright {
        position: absolute;
        right: 0px;
      }
    }
    ul {
      display: flex;
      align-items: center;
      .isActive {
        background: radial-gradient(circle, #8b9eff, #3764f6);
      }
      li {
        display: flex;
        border: 1px solid #5a7dee;
        box-shadow: #5a7dee 0px 0px 6px 1px inset;
        width: 70px;
        height: 70px;
        padding: 6px 0;
        background: #1a1f3c;
        margin-right: 15px;
        border-radius: 20px;
        align-items: center;
        flex-direction: column;
        cursor: pointer;
        i {
          font-size: 26px;
          color: #fff;
        }
        span {
          color: #fff;
          font-size: @font10;
        }
      }
      :hover {
        background: #8b9eff;
      }
    }
  }
}
</style>