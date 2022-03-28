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
  .view{
    margin:50px;
    overflow: hidden;
  }
  .left{
    width: 50px;
    height: 300px;
    transform:translateY(-2790px);
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
    for(let i = -100;i<100;i++){
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
      console.log(leftBox)
      let num = 500

      leftBox.value.style.transform = 'translateY(200px)'
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
