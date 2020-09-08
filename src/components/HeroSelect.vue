<template>
  <a-cascader
      :options="options"
      :show-search="{ filter }"
      placeholder="Please select"
      @change="onChange"
  >
    <template slot="displayRender" slot-scope="{ labels, selectedOptions }">
      <span v-for="(label, index) in labels" :key="selectedOptions[index].value">
        <span v-if="index === labels.length - 1">
          {{ label }}
        </span>
      </span>
    </template>
  </a-cascader>
</template>

<script type="ts">

import heroTable from "@/data/shishen.json"


const groupBy = (array, id) => {
  const groups = {};
  array.forEach(o => {
    const group = o[id];
    groups[group] = groups[group] || [];
    groups[group].push(o);
  });
  return groups;
};

export default {
  name: "HeroSelect",
  data() {
    console.log("DATA");
    const options = Object.entries(groupBy(Object.values(heroTable), 'rarity')).map(([key, values]) => {
      let result = {value: key}
      switch (key) {
        case '2': // N
          result = {...result, label: 'N'}
          break;
        case '3': // R
          result = {...result, label: 'R'}
          break;
        case '4': // SR
          result = {...result, label: 'SR'}
          break;
        case '5': // SSR
          result = {...result, label: 'SSR'}
          break;
        case '6': // SP
          result = {...result, label: 'SP'}
          break;
        default:
          result = {...result, label: '阴阳师'}
          console.log(key);
          break;
      }
      const children = values.map(value => {
        const {id, name, icon} = value;
        return {label: name, value: id, icon}
      });

      result = {...result, children};

      return result;
    })

    return {
      options,
    };
  },
  methods: {
    onChange(value, selectedOptions) {
      console.log(value, selectedOptions);
    },
    filter(inputValue, path) {
      return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
    },
  },
}
</script>

<style scoped>

</style>
