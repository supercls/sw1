<template>
  <div class="indexlayout-main-conent">
    <div class="mock">
        <div class="left">
          <div class="item" v-for="(left,leftindex) in leftlist" :key="leftindex*1.1">
            <span class="s1">{{left.title}}</span>
            <span class="s2">—</span>
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
  padding:50px;
  .left{
    width: 50px;
    height: 300px;
    overflow: hidden;
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
import { defineComponent, defineAsyncComponent,ref,reactive} from "vue";

export default defineComponent({
  name: 'Home',

  setup(){
    let arr = []
    for(let i = 0;i<100;i++){
      arr.push({
        title:i*10
      })
    }
    const leftlist = ref(arr)
    const changeTarge = () =>{

    }
    return{
      leftlist,
      changeTarge
    }
  }
});
</script>
