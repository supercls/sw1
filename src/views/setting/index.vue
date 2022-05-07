<template>
  <div class="setting">
    <el-header title="控制器参数" minsize></el-header>
    <div class="box">
      <div style="display: flex; justify-content: space-between">
        <div class="tab">
          <div
            class="item"
            v-for="(item, index) in tabs"
            :key="index * 3.33"
            :class="{ active: activeIndex == index }"
            @click="changeTab(item, index)"
          >
            <p>{{ item.name }}</p>
          </div>
        </div>
        <div class="btn">
          <p style="color: #4fab1e; background: #053914" @click="askData">
            <i class="iconfont icon-qingqiu"></i>请求
          </p>
          <p style="color: #ffe610; background: #343106" @click="submit">
            <i class="iconfont icon-duqu_vfb"></i>发送
          </p>
          <p style="color: #ff8421; background: #3e220b; position: relative">
            <input
              style="
                opacity: 0;
                position: absolute;
                top: 0;
                right: 0;
                left: 0;
                bottom: 0;
                cursor: pointer;
                width: 100%;
              "
              @change="(e) => changeFile(e)"
              type="file"
              id="file"
              accept=".xlsx,.xls"
            />
            <i class="iconfont icon-send-s"></i>读取
          </p>
        </div>
      </div>

      <div class="content" v-show="activeIndex == 0">
        <div style="margin-bottom: 5px">
          <p class="p1"><span class="s1"></span>速率环</p>
          <div class="boxCon">
            <div class="list">
              <span class="s3">翻滚速率环p：</span>
              <a-input
                class="s4"
                type="number"
                v-model:value="flydata.rateRollPidKp"
              />
            </div>
            <div class="list">
              <span class="s3">俯仰速率环p：</span>
              <a-input
                class="s4"
                type="number"
                v-model:value="flydata.ratePitchPidKp"
              />
            </div>
            <div class="list">
              <span class="s3">偏航速率环p：</span>
              <a-input
                class="s4"
                type="number"
                v-model:value="flydata.rateYawPidKp"
              />
            </div>
            <div class="list">
              <span class="s3">翻滚速率环i：</span>
              <a-input
                class="s4"
                type="number"
                v-model:value="flydata.rateRollPidKi"
              />
            </div>
            <div class="list">
              <span class="s3">俯仰速率环i：</span>
              <a-input
                class="s4"
                type="number"
                v-model:value="flydata.ratePitchPidKi"
              />
            </div>
            <div class="list">
              <span class="s3">偏航速率环i：</span>
              <a-input
                class="s4"
                type="number"
                v-model:value="flydata.rateYawPidKi"
              />
            </div>
            <div class="list">
              <span class="s3">翻滚速率环d：</span>
              <a-input
                class="s4"
                type="number"
                v-model:value="flydata.rateRollPidKd"
              />
            </div>
            <div class="list">
              <span class="s3">俯仰速率环d：</span>
              <a-input
                class="s4"
                type="number"
                v-model:value="flydata.ratePitchPidKd"
              />
            </div>
            <div class="list">
              <span class="s3">偏航速率环d：</span>
              <a-input
                class="s4"
                type="number"
                v-model:value="flydata.rateYawPidKd"
              />
            </div>
          </div>
        </div>
        <div style="margin-bottom: 5px">
          <p class="p1"><span class="s1"></span>角度</p>
          <div class="boxCon">
            <div class="list">
              <span class="s3">翻滚角度比例p：</span>
              <a-input
                class="s4"
                type="number"
                v-model:value="flydata.angleRollP"
              />
            </div>
            <div class="list">
              <span class="s3">俯仰角度比例p：</span>
              <a-input
                class="s4"
                type="number"
                v-model:value="flydata.anglePitchP"
              />
            </div>
            <div class="list">
              <span class="s3">偏航角度比例p：</span>
              <a-input
                class="s4"
                type="number"
                v-model:value="flydata.angleYawP"
              />
            </div>
            <div class="list">
              <span class="s3">最大倾斜角：</span>
              <a-input
                class="s4"
                type="number"
                v-model:value="flydata.angleMax"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="content" v-show="activeIndex == 1">
        <div style="margin-bottom: 5px">
          <p class="p1"><span class="s1"></span>位置</p>
          <div class="boxCon">
            <div class="list">
              <span class="s3">位置控制环p：</span>
              <a-input
                class="s4"
                type="number"
                v-model:value="flydata.posXyP"
              />
            </div>
            <div class="list">
              <span class="s3">位置控制速度环p：</span>
              <a-input
                class="s4"
                type="number"
                v-model:value="flydata.velXyPidKp"
              />
            </div>
            <div class="list">
              <span class="s3">位置控制速度环i：</span>
              <a-input
                class="s4"
                type="number"
                v-model:value="flydata.velXyPidKi"
              />
            </div>
            <div class="list">
              <span class="s3">位置控制速度环d：</span>
              <a-input
                class="s4"
                type="number"
                v-model:value="flydata.velXyPidKd"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="content" v-show="activeIndex == 2">
        <div style="margin-bottom: 5px">
          <p class="p1"><span class="s1"></span>高度</p>
          <div class="boxCon">
            <div class="list">
              <span class="s3">最大爬升率[cm/s]：</span>
              <a-input
                class="s4"
                type="number"
                @blur="(e) => changeIn(e, 'pilotSpeedUp')"
                v-model:value="flydata.pilotSpeedUp"
              />
            </div>
            <div class="list">
              <span class="s3">最大Z轴加速度[cm/s]：</span>
              <a-input
                class="s4"
                @blur="(e) => changeIn(e, 'pilotAccelZ')"
                type="number"
                v-model:value="flydata.pilotAccelZ"
              />
            </div>
            <div class="list">
              <span class="s3">高度位置环p：</span>
              <a-input
                class="s4"
                type="number"
                @blur="(e) => changeIn(e, 'posZP')"
                v-model:value="flydata.posZP"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, onMounted, reactive, toRefs, toRaw } from "vue";
import elHeader from "@/components/header.vue";
import { getParams, setParams } from "./service";
import { message } from "ant-design-vue";
export default defineComponent({
  name: "setting",
  components: {
    elHeader,
  },
  setup() {
    const tabs = ref([
      {
        name: "姿态控制",
        checked: true,
      },
      {
        name: "位置控制",
        checked: false,
      },
      {
        name: "高度控制",
        checked: false,
      },
    ]);
    let socket1 = null;
    let onOff = false;
    const activeIndex = ref(0);
    let dataObj = reactive({
      flydata: {},
    });
    const changeTab = (item, index) => {
      tabs.value.map((val) => (val.checked = false));
      item.checked = true;
      activeIndex.value = index;
    };
    const askData = () => {
      socket1.close();
      socket1 = null;
      socket();
    };
    const changeFile = () => {

    };
    const socket = () => {
      const uri = "ws://localhost:8090/gcc/instructPackageWS";
      socket1 = new WebSocket(uri);
      socket1.onopen = () => {
        console.log("已连接");
        getParams();
      };
      socket1.onmessage = (e) => {
        try {
          let msg = JSON.parse(e.data);
          let data = JSON.parse(msg.data.data);
          console.log(msg);
          if (data.longPackageHead && data.longPackageHead.msg == 255) {
            dataObj.flydata = data;
          } else if (
            data.shortPackageHead &&
            data.shortPackageHead.msg == 254
          ) {
            onOff = false;
            if (data.ackStatus == 0) {
              message.success("接收成功");
            } else {
              askData();
              message.error("接收失败");
            }
          } else {
            message.error(msg.meta.msg);
          }
        } catch (e) {}
      };
      socket1.onclose = (e) => {
        console.log("已关闭");
      };
    };
    const changeIn = (e, data) => {
      dataObj.flydata[data] = parseInt(dataObj.flydata[data]);
    };
    const submit = () => {
      if (onOff) return;
      onOff = true;
      let obj = { ...toRaw(dataObj.flydata) };
      delete obj.longPackageHead;
      setParams({
        ...obj,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    onMounted(() => {
      socket();
      return
       document.querySelector("#file").addEventListener("change", (e) => {
        let reader = new FileReader();
        reader.readAsBinaryString(e.target.files[0]);
        reader.onload = function () {
          let wb = XLSX.read(this.result, {
            type: 'binary'
          });
          let wsname = wb.SheetNames[0];
          let ws = wb.Sheets[wsname];
          let arr = XLSX.utils.sheet_to_csv(ws).split(',');
          let fiedArr = arr.slice(20,40)
          let valArr = arr.slice(40,60)
          fiedArr.map((item,index) =>{
            dataObj.flydata[item] = parseFloat(valArr[index])
          })
          dataObj.flydata.rateRollPidKp =  parseFloat(valArr[0])   //未知bug,第一个字段不显示数据

        };
      });
      console.log(XLSX);
    });
    return {
      tabs,
      submit,
      askData,
      changeIn,
      changeFile,
      changeTab,
      ...toRefs(dataObj),
      activeIndex,
    };
  },
});
</script>
<style lang="less" scoped>
.setting {
  min-height: 100vh;
  background: #252c49;
  opacity: 0.9;
  .box {
    padding: 10px 20px;
    padding-top: 40px;
    .boxCon {
      display: flex;
      align-content: center;
      flex-flow: row wrap;

      .list {
        display: flex;
        align-items: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 0px 15px 10px 55px;

        .s3 {
          color: #fff;
          font-size: @font14;
          margin-right: 8px;
          width: 140px;
          text-align: left;
        }
        .s4 {
          height: 35px;
          flex-shrink: 0;
          background: #252c49;
          line-height: 35px;
          text-align: center;
          width: 110px;
          color: #7595fb;
          border: 1px solid #7287fd;
          border-radius: 10px;
        }
      }
    }
    .p1 {
      color: #fff;
      display: flex;
      align-items: center;
      font-size: @font14;
      margin-bottom: 10px;
      .s1 {
        display: inline-block;
        width: 5px;
        height: 16px;
        background: #f8fb20;
        margin-right: 10px;
      }
    }
    .btn {
      display: flex;
      align-items: center;
      p {
        width: 78px;
        cursor: pointer;
        display: flex;
        align-content: center;
        margin-right: 15px;
        line-height: 31px;
        height: 31px;
        justify-content: center;
        background: #053914;
        border: 1px solid;
        border-radius: 4px;
        font-size: 14px;
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
        padding: 5px 15px;
        margin: 15px 0px;
        i {
          color: #4fab1e;
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