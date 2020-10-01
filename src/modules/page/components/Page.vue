<template>
  <div>
    <a-collapse v-model="activeKey">
      <a-collapse-panel
          v-for="({attributes,html},index) in tools"
          :key="`${index}`"
          :header="attributes.title"
      >
        <div v-html="html"/>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
import {Component, Prop} from "vue-property-decorator";

@Component
export default class Page extends Vue {

  @Prop(String) activeKey
  @Prop tools

}
</script>

<style scoped>

</style>

