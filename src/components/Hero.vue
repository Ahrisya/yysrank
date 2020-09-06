<template>
  <div>
    <a-avatar :size="48" :src="this.$data.icon" shape="square"/>
    {{ this.$data.name }}
  </div>
</template>

<script>

import heroTable from "../data/shishen.json"

export default {
  name: "Hero",
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    const hero = {...heroTable[this.id], id: undefined};
    delete hero.id;
    return hero;
  }
}
</script>

<style scoped>

</style>
