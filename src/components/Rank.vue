<template>
  <div>
    <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        sub-title="This is a subtitle"
        title="Title"
    />
    <a-table :data-source="data" :pagination="{ pageSize:30 }">
      <a-table-column key="index" data-index="index" title="#"/>
      <a-table-column key="point">
        <template v-slot="{point}">
          <p v-if="(typeof point) === 'string'" :style="{color: '#007bff'}">
            {{ point }}
          </p>
          <p v-else-if="(typeof point) === 'number' && point > 0">
            <a-icon :style="{ color: '#28a745' }" type="arrow-up"/>
            {{ point }}
          </p>
          <p v-else-if="(typeof point) === 'number' && point < 0">
            <a-icon :style="{ color: '#dc3545' }" type="arrow-down"/>
            {{ Math.abs(point) }}
          </p>
          <p v-else-if="(typeof point) === 'number' && point == 0">
            <a-icon :rotate=90 :style="{ color:'#6c757d' }" type="pause"/>
            {{ point }}
          </p>
        </template>
      </a-table-column>
      <a-table-column key="id" title="式神">
        <template v-slot="{id}">
          <Hero :id="id"/>
        </template>
      </a-table-column>
      <a-table-column key="win_rate" title="外战胜率">
        <template v-slot="{win_rate}">
          <a-progress :format="percent => `${percent.toFixed(2)} %`" :percent="win_rate"/>
        </template>
      </a-table-column>
      <a-table-column key="use_rate" title="选用率">
        <template v-slot="{use_rate}">
          <a-progress :format="percent => `${percent.toFixed(2)} %`" :percent="use_rate*100"/>
        </template>
      </a-table-column>
      <a-table-column key="count" data-index="count" title="外战次数"/>
    </a-table>
  </div>
</template>

<script type="ts">

import {Vue} from "vue-property-decorator";
import {Divider, Icon, PageHeader, Progress, Table} from "ant-design-vue";
import rankTable from "../data/shishen_rank.json"
import Hero from "./Hero";

Vue.use(PageHeader)
Vue.use(Table)
Vue.use(Icon)
Vue.use(Divider)
Vue.use(Progress)

export default {
  name: "Rank",
  components: {
    Hero
  },
  data() {
    const tables = Object.entries(rankTable).map(([, values]) => {
      const row = {};
      const columns = ['index', 'point', 'id', 'win_rate', 'use_rate', 'count']
      values.forEach((value, index) => {
        Object.assign(row, {[columns[index]]: value});
        if (columns[index] === 'index') {
          Object.assign(row, {'key': value});
        }
      })
      return row
    });

    return {
      data: tables,
    };
  },
};
</script>

<style scoped>

</style>
