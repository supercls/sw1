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
    <!-- <a-row :gutter="24">
      <a-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
        <ArticleChartCard />
      </a-col>
      <a-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
        <WorksChartCard />
      </a-col>
      <a-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
        <TopicsChartCard />
      </a-col>
      <a-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
        <LinksChartCard />
      </a-col>
    </a-row>

    <a-row :gutter="24">
      <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <HotSearchCard />
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <HotTagsCard />
      </a-col>
    </a-row>
    <a-row :gutter="24">
      <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <ArticleHitCard />
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <WorksHitCard />
      </a-col>
    </a-row> -->

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

import PageLoading from './components/PageLoading/index.vue';
const ArticleChartCard = defineAsyncComponent({
  loader: () => import('./components/ArticleChartCard/index.vue'),
  loadingComponent: PageLoading
});
const WorksChartCard = defineAsyncComponent({
  loader:  () => import('./components/WorksChartCard/index.vue'),
  loadingComponent: PageLoading
});
const TopicsChartCard = defineAsyncComponent({
  loader:  () => import('./components/TopicsChartCard/index.vue'),
  loadingComponent: PageLoading
});
const LinksChartCard = defineAsyncComponent({
  loader:  () => import('./components/LinksChartCard/index.vue'),
  loadingComponent: PageLoading
});
const HotSearchCard = defineAsyncComponent({
  loader:  () => import('./components/HotSearchCard/index.vue'),
  loadingComponent: PageLoading
});
const HotTagsCard = defineAsyncComponent({
  loader:  () => import('./components/HotTagsCard/index.vue'),
  loadingComponent: PageLoading
});
const ArticleHitCard = defineAsyncComponent({
  loader:  () => import('./components/ArticleHitCard/index.vue'),
  loadingComponent: PageLoading
});
const WorksHitCard = defineAsyncComponent({
  loader:  () => import('./components/WorksHitCard/index.vue'),
  loadingComponent: PageLoading
});

export default defineComponent({
  name: 'Home',
  components: {
    ArticleChartCard,
    WorksChartCard,
    TopicsChartCard,
    LinksChartCard,
    HotSearchCard,
    HotTagsCard,
    ArticleHitCard,
    WorksHitCard
  },
  setup(){
    let arr = []
    for(let i = 0;i<100;i++){
      arr.push({
        title:i
      })
    }
    const leftlist = ref(arr)
    return{
      leftlist
    }
  }
});
</script>
