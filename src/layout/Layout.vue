<template>
  <a-layout>
    <a-layout-header class="header" style="padding: 0px">
      <div class="logo"/>
      <a-menu
          :selected-keys="[activeRoute]"
          :style="{ lineHeight: '64px' }"
          mode="horizontal"
          theme="dark"
      >
        <a-menu-item v-for="(value,name) in routes" :key="'/'+name">
          <router-link :to="'/' + name">
            {{ value.name }}
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
        <router-view/>
        <UpdateTips/>
      </a-layout-content>
    </a-layout>
    <a-layout-footer :style="{ background: '#fff', padding: '0px'}" class="footer" >
      <div class="logo"/>
      <ul :style="{ display: 'inline' }">
        <span> 更多资讯攻略： </span>
        <li 
            :style="{ display: 'inline-block', margin: '5px', opacity: '0.8', position: 'relative' }"
            class="wechat"
        >
        <span class="text">阴阳痒痒鼠快讯</span>
        <div class="QR-code-bai"></div>
            
        </li>
      </ul>
      <ul :style="{ display: 'inline' }">
        <span> 联系作者 </span>
        <li 
            :style="{ display: 'inline-block', margin: '5px', opacity: '0.8' }"
            v-for="(value,name) in contacts" :key="'/'+name"
        >
            {{ value.name }}
        </li>
      </ul>
    </a-layout-footer>

  </a-layout>
</template>

<script>
import config from "@/config";
import UpdateTips from "@/components/UpdateTips";
import "@/styles/qrcode.scss";


export default {
  name: "Layout",
  components: {UpdateTips},
  watch: {
    $route() {
      this.refreshTitle();
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
      title: '',
      activeRoute: '',
      subTitle: '',
      routes: {...config.routes},
      contacts: {...config.contacts},
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
