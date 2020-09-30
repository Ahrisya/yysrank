<template>
  <a-avatar :size="size" :src="this.$data.icon" shape="square"/>
</template>

<script>

import {HeroTable} from "@/data";

export default {
  name: "HeroIcon",
  props: {
    id: {
      type: Number,
      required: true
    },
    size: {
      type: Number,
      default: 48
    }
  },
  data() {
    const heroTable = HeroTable();
    const hero = {...heroTable[this.id], id: undefined};
    delete hero.id;
    return hero;
  }
}
</script>

<style scoped>

</style>
