<template>
  <div>
    <a-page-header
        :breadcrumb="{ props: { routes } }"
        style="border: 1px solid rgb(235, 237, 240)"
        sub-title="发现bug或者有好的建议欢迎联系~"
        title="Tutorial"
    />
    <a-collapse v-model="activeKey">
      <a-collapse-panel key="1" header="使用方法">
        <ul>
          <li>
            视频演示：<a href="https://www.bilibili.com/video/BV1yv411y774/"> 食用指南（已过期）</a>
          </li>
          <li>
            <strong>因网易大神的记录中没有ban位数据，所以这里的ban位只是过滤掉含ban位的阵容，不代表真实的bp情况。</strong>
          </li>
          <li>
            选择式神，己方式神至少要有一个，ban和对方式神可以为空
          </li>
          <li>
            点击式神右侧的减号可以删除式神
          </li>
          <li>
            点击查询胜率，稍等几秒会显示结果弹窗，可以通过点击表头的箭头进行排序。PS：一般1s以内就可以出结果，等待时间过长的话可能是资源加载失败，建议刷新网页。
          </li>
          <li>
            每次计算的结果都会保留下来，可以通过点击查询历史的“更多”显示。
          </li>
          <li>
            手机屏的话可能会因为过小导致表格显示不全，建议手机看的话浏览器开启桌面版模式（e.g. 手机Chrome的话：设置->桌面版网站，打上勾就可以了）。
          </li>
        </ul>
      </a-collapse-panel>
      <a-collapse-panel key="2" header="TODO">
        <ul>
          <li>
            设置常用式神以及保存历史记录。
          </li>
          <li>
            翻牌模拟，预计8月底完成。
          </li>
          <li>
            移动端的适配
          </li>
        </ul>
      </a-collapse-panel>
      <a-collapse-panel key="3" header="Contact">
        <ul>
          <li>
            个人主页：<a href="https://ahrisy.com">Ahrisy&nbsp;の&nbsp;小窝</a>, 欢迎来转转呀~
          </li>
          <li>
            Github：<a href="#">本项目的Github仓库</a>
          </li>
          <li>
            NGA帖子：<a
              href="https://nga.178.com/read.php?tid=23026578">https://nga.178.com/read.php?tid=23026578</a>
          </li>
          <li>
            bilibili私信：<a href="https://space.bilibili.com/4847326">Ahrisy的个人空间</a>
          </li>
          <li>
            阴阳师：鸣麓逐浪区，昵称：Ahrisy，id：1689046
          </li>
          <li>
            QQ: 1282519861 (发QQ邮箱也可，但可能回复会比较慢)
          </li>
        </ul>
      </a-collapse-panel>
      <a-collapse-panel key="4" header="Updates">
        <ul>
          <li>
            08/21/2020：增加攻略和工具导航页，优化了式神显示顺序，修复了当己方阵容包含于对方阵容时无查询结果的问题。
          </li>
          <li>
            08/19/2020：迁移到Vercel进行国内访问加速
          </li>
          <li>
            08/18/2020：优化了交互和UI，增加ban位
          </li>
        </ul>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>

import {Collapse, PageHeader} from "ant-design-vue";
import {Vue} from 'vue-property-decorator';

Vue.use(Collapse)
Vue.use(PageHeader)

export default {
  name: "Tutorial",
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
};
</script>

<style scoped>

</style>

