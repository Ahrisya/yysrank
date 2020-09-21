<template>
  <a-cascader
      :options="options"
      :placeholder="placeholder"
      :show-search="{ filter }"
      size="large"
      @change="onChange"
  >
    <template slot="displayRender" slot-scope="{ labels, selectedOptions }">
      <span v-for="(label, index) in labels" :key="selectedOptions[index].value">
        <span v-if="index === labels.length - 1">
<!--          <Hero :id="selectedOptions[index].value" :size="16" :show-name="false"/>-->
          {{ label }}
        </span>
      </span>
    </template>
  </a-cascader>
</template>

<script type="ts">

import heroTable from "../../data/shishen.json"
import pinyin from "@/utils/pinyin";

const mapper = {
  '2': 'N',
  '3': 'R',
  '4': 'SR',
  '5': 'SSR',
  '6': 'SP',
}

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
  // components: {Hero},
  props: {
    placeholder: String,
  },
  data() {
    const options = Object
        .entries(groupBy(Object.values(heroTable), 'rarity')) // 将式神数据按位阶分组
        .map(([key, values]) => { // 将式神数据处理成下拉选择器所需要的格式
          const result = {value: key, label: mapper[key]}
          const children = values.map(value => {
            const {id, name, icon} = value; // 只读取式神的id，名字和图标
            return {label: name, value: id, icon}
          });
          return {...result, children};
        })
        .filter(value => Object.values(mapper).indexOf(value.label) > 0) // 不显示没有位阶的阴阳师
        .sort((a, b) => b.value - a.value) // 降序排序
    return {
      options,
    };
  },
  methods: {
    onChange(values, selectedOptions) {
      const value = Array.from(values).pop();
      this.$emit("change", value); // 向上抛出事件
    },
    filter(inputValue, path) {
      return path.some(option => {
        return option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1 ||
            pinyin(option.label.toLowerCase()).indexOf(inputValue.toLowerCase()) > -1;
      });
    },
  },
}
</script>

<style scoped>

</style>
