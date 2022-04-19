<template>
  <div>
    <div class="content">
      <div class="item">
        <div class="line"></div>
        <span>位置</span>
        <div class="line"></div>
      </div>
      <div class="box">
        <i class="iconfont icon-sanjiaoleft"></i>
        <ul>
          <li>
            <p>纬度</p>
            <span>{{Robot.socket1.curLat}}</span>
          </li>
          <li>
            <p>经度</p>
            <span>{{Robot.socket1.curLng}}</span>
          </li>
          <li>
            <p>高度</p>
            <span>{{Robot.socket1.curAlt}}</span>
          </li>
        </ul>
        <i class="iconfont icon-sanjiaoright"></i>
      </div>

      <div class="item">
        <div class="line"></div>
        <span>姿态</span>
        <div class="line"></div>
      </div>
      <div class="box">
        <i class="iconfont icon-sanjiaoleft"></i>
        <ul>
          <li>
            <p>滚转</p>
            <span>{{filterFun(Robot.socket1.roll)}}</span>
          </li>
          <li>
            <p>俯仰</p>
            <span>{{filterFun(Robot.socket1.pitch)}}</span>
          </li>
          <li>
            <p>偏航</p>
            <span>{{filterFun(Robot.socket1.yaw)}}</span>
          </li>
        </ul>
        <i class="iconfont icon-sanjiaoright"></i>
      </div>

      <div class="item">
        <div class="line"></div>
        <span>状态</span>
        <div class="line"></div>
      </div>
      <div class="box">
        <i class="iconfont icon-sanjiaoleft"></i>
        <ul>
          <li>
            <p>高度</p>
            <span>{{Robot.socket1.curAlt}}</span>
          </li>
          <li>
            <p>姿态</p>
            <span>{{Robot.socket1.navStatus}}</span>
          </li>
          <li>
            <p>GPS</p>
            <span>{{GPSFUN(Robot.socket2.gpsState)}}</span>
          </li>
        </ul>
        <i class="iconfont icon-sanjiaoright"></i>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent ,computed ,} from "vue";
import {useStore,} from 'vuex'
export default defineComponent({
  name: "flyobject",
  setup() {
     let stategps = [
      "NO_GPS",
      "NO_FIX",
      "2D_FIX",
      "3D_FIX",
      "DGPS",
      "RTK_FLOAT",
      "RTK_FIXED",
    ];
    const store = useStore()
    const Robot = computed(() =>{
      return store.state.Robot
    })
    const filterFun = (val) =>{
      return  val ? parseFloat(val*180/Math.PI).toFixed(3) :''
    }
    const GPSFUN = (val) =>{
      return stategps[val]
    }
    return {
      Robot,
      filterFun,
      GPSFUN
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
    margin-top: 5px;
    ul {
      display: flex;
      align-items: center;
      justify-content: space-around;

      li {
        height: 53px;
        background: #29304f;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-content: center;
        margin: 0 10px;
        justify-content: center;
        width: 118px;
        border: 1px solid #3769b6;
        //  border-image: linear-gradient(180deg, #3769b6, #b6d5fd) 1 1;
        border-radius: 10px;
        p {
          font-size: 16px;
          color: #fff;
        }
        span {
          font-size: 14px;
          color: #dbe53c;
        }
      }
    }
    i {
      font-size: 20px;
      color: #556297;
    }
  }
}
</style>