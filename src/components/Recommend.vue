<template>
  <a-page-header
      :breadcrumb="{ props: { routes } }"
      style="border: 1px solid rgb(235, 237, 240)"
      sub-title="Under construction……"
      title="Recommend"
  />
</template>

<script>
import {Collapse, PageHeader} from "ant-design-vue";
import {Vue} from 'vue-property-decorator';

Vue.use(Collapse)
Vue.use(PageHeader)

export default {
  name: "Recommend",
  data() {
    return {
      text: `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`,
      activeKey: ['1'],
      routes: [
        {
          path: 'index',
          breadcrumbName: 'First-level Menu',
        },
        {
          path: 'first',
          breadcrumbName: 'Second-level Menu',
        },
        {
          path: 'second',
          breadcrumbName: 'Third-level Menu',
        },
      ],
    };
  },
  watch: {
    activeKey(key) {
      console.log(key);
    },
  },
}
</script>

<style scoped>

</style>
