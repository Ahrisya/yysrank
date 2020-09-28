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
import tools from "@/page/more-tools";

export default {
  name: "MoreTools",
  data() {
    return {
      activeKey: '',
      tools,
    }
  }
};
</script>

<style scoped>

</style>

