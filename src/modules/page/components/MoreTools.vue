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
import tools from "@/modules/more-tools";

export default {
  name: "MoreTools",
  data() {
    return {
      activeKey: '0',
      tools,
    }
  }
};
</script>

<style scoped>

</style>

