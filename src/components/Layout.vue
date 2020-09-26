<template>
  <a-layout id="components-layout-demo-top-side-2">
    <a-layout-header class="header" style="padding: 0px">
      <div class="logo"/>
      <a-menu
          :selected-keys="[activeRoute]"
          :style="{ lineHeight: '64px' }"
          mode="horizontal"
          theme="dark"
      >
        <a-menu-item key="/win-rate">
          <router-link to="/win-rate">
            阵容胜率排行
          </router-link>
        </a-menu-item>
        <a-menu-item key="/rank">
          <router-link to="/rank">
            排行榜
          </router-link>
        </a-menu-item>
        <a-menu-item key="/recommend">
          <router-link to="/recommend">
            模拟翻牌
          </router-link>
        </a-menu-item>
        <a-menu-item key="/more-tools">
          <router-link to="/more-tools">
            攻略&工具导航
          </router-link>
        </a-menu-item>
        <a-menu-item key="/tutorial">
          <router-link to="/tutorial">
            食用指南
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout style="padding: 0 24px 24px">
      <a-page-header
          :sub-title="subTitle"
          :title="title"
      />
      <!--        <a-page-header-->
      <!--            :title="title"-->
      <!--            :sub-title="subTitle"-->
      <!--            :breadcrumb="{ props: { routes } }"-->
      <!--        />-->

      <a-layout-content
          :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
      >
        <router-view></router-view>

      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import config from "@/config";
import battleTable from "../../data/data.json";
import moment from "moment";

export default {
  name: "Layout",
  watch: {
    $route() {
      this.refreshTitle();
    }
  },
  mounted() {
    if (this.$cookies.get('last_updated') !== config.update) {
      const handleOk = () => {
        this.$cookies.set('last_updated', config.update, moment().add(1000, 'days').toDate())
      }
      const h = this.$createElement;
      this.$info({
        width: '36%',
        maskClosable: true,
        title: 'Update',
        content: h('div', {}, [
          h('h3', config.update),
          h('ul', {}, [
            h('li', '数据更新：更新了' + config.range + '式神排行榜及' + battleTable.data.length + '场斗技数据。')
          ]),
        ]),
        onOk: handleOk,
        onCancel: handleOk,
      });
    }
  },
  methods: {
    refreshTitle() {
      const {title, subTitle} = this.$route.meta;
      if (title !== undefined) {
        this.title = title;
      }
      if (subTitle !== undefined) {
        this.subTitle = subTitle;
      }
      this.activeRoute = this.$route.fullPath;
    },
  },

  data() {
    return {
      collapsed: false,
      title: 'title',
      activeRoute: '',
      subTitle: 'sub-title',
      // routes: [
      //   {
      //     path: 'index',
      //     breadcrumbName: 'First-level Menu',
      //   },
      //   {
      //     path: 'first',
      //     breadcrumbName: 'Second-level Menu',
      //   },
      //   {
      //     path: 'second',
      //     breadcrumbName: 'Third-level Menu',
      //   },
      // ],
    };
  },
}
</script>

<style scoped>

.logo {
  /*width: 120px;*/
  width: 200px;
  height: 64px;
  /*height: 31px;*/
  /*background: rgba(255, 255, 255, 0.2);*/
  /*margin: 16px 28px 16px 0;*/
  float: left;
}
</style>
