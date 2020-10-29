<template>
  <div>
    <a-collapse v-model="activeKey">
      <a-collapse-panel
          v-for="({attributes,html},index) in ai"
          :key="`${index}`"
          :header="attributes.title"
      >
        <div v-html="html"/>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>

import ai from "@/modules/ai";

export default {
  name: "AI",
  data() {
    return {
      activeKey: ['0', '1', '2'], 
      ai,
    }
  }
};
</script>

<style scoped>

</style>

