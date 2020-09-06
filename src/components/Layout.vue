<template>
  <div>
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="阵容胜率排行">
        <WinRate/>
      </a-tab-pane>
      <a-tab-pane key="2" tab="排行榜">
        <Rank/>
      </a-tab-pane>
      <a-tab-pane key="3" tab="模拟翻牌">
        <Recommend/>
      </a-tab-pane>
      <a-tab-pane key="4" tab="攻略&工具导航">
        <MoreTools/>
      </a-tab-pane>
      <a-tab-pane key="5" tab="食用指南">
        <Tutorial/>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import 'ant-design-vue/dist/antd.css'; // or 'ant-design-vue/dist/antd.less'
import {Component, Vue} from "vue-property-decorator";
import {Tabs} from "ant-design-vue";
import MoreTools from "@/components/MoreTools.vue";
import Tutorial from "@/components/Tutorial.vue";
import Recommend from "@/components/Recommend.vue";
import Rank from "@/components/Rank.vue";
import WinRate from "@/components/WinRate.vue";

Vue.use(Tabs)

@Component({
  components: {
    WinRate,
    Rank,
    Tabs,
    Recommend,
    MoreTools,
    Tutorial,
  },
})
export default class Layout extends Vue {

}
</script>

<style scoped>

</style>
