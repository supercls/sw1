<template>
  <div class="indexlayout-main-conent">
    <div class="mock">
      <div class="view">
        <div class="left" ref="leftBox">
          <div class="item" v-for="(left,leftindex) in leftlist" :key="leftindex*1.1">
            <span class="s1">{{left.title}}</span>
            <span class="s2">—</span>
          </div>
        </div>
      </div>
      <div class="p-left">
        <span></span>{{leftvalue}}
      </div>
    </div>
    <button @click="changeTarge">left</button>

  </div>
</template>
<style lang="less" scoped>
.mock{
  background: #436DA7;
  height: 500px;
  width: 600px;
  overflow: hidden;
  position: relative;
  .p-left{
    position: absolute;
    top: 202px;
    left: 100px;
    span{
      width: 60px;
      height: 3px;
      background: #C8D332;
      display: inline-block;
    }
  }
  .view{
    margin:50px;
    overflow: hidden;
    height: 330px;
  }
  .left{
    width: 50px;

    transform:translateY(-1820px);
    transition:transform 1s ease 0s,background-color 2s ease 3s;
    border-right: 1px dashed #fff;
    .item{
      display: flex;
      height: 30px;
      line-height: 30px;
      align-items: center;
      justify-content: space-between;
      color: #fff;
      .s1{

      }
      .s2{

      }
    }
  }
}
</style>
<script >
import { defineComponent, defineAsyncComponent,ref,reactive, toRefs} from "vue";

export default defineComponent({
  name: 'Home',

  setup(){
    let arr = []
    for(let i = -10;i<200;i++){
      arr.unshift({
        title:i*10
      })
    }
    const leftlist = ref(arr)
    const leftBox = ref(null)
    let dataObj = reactive({
      leftvalue:0
    })
    const changeTarge = () =>{
      setInterval(() =>{
        let num = 100*Math.random()
        leftBox.value.style.transform = `translateY(${num/10*30-2820+'px'})`
        dataObj.leftvalue = parseInt(num)
      },1500)

    }
    return{
      leftlist,
      changeTarge,
      leftBox,
      ...toRefs(dataObj)
    }
  }
});
</script>
