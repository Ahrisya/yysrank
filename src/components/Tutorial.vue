<template>
  <div>
    <a-collapse v-model="activeKey">
      <a-collapse-panel
          v-for="({attributes,html},index) in tutorials"
          :key="`${index}`"
          :header="attributes.title"
      >
        <div v-html="html"/>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>

import tutorials from "@/page/tutorials";

export default {
  name: "Tutorial",
  data() {
    return {
      activeKey: '',
      tutorials,
    }
  }
};
</script>

<style scoped>

</style>

