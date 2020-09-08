<template>
  <a-layout id="components-layout-demo-top-side-2">
    <a-layout-header class="header" style="padding: 0px">
      <div class="logo"/>
      <a-menu
          :default-selected-keys="['2']"
          :style="{ lineHeight: '64px' }"
          mode="horizontal"
          theme="dark"
      >
        <a-menu-item key="1">
          <router-link to="/win-rate">
            阵容胜率排行
          </router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link to="/rank">
            排行榜
          </router-link>
        </a-menu-item>
        <a-menu-item key="3">
          <router-link to="/recommend">
            模拟翻牌
          </router-link>
        </a-menu-item>
        <a-menu-item key="4">
          <router-link to="/more-tools">
            攻略&工具导航
          </router-link>
        </a-menu-item>
        <a-menu-item key="5">
          <router-link to="/tutorial">
            食用指南
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <!--      <a-layout-sider style="background: #fff" width="200">-->
      <!--        <a-menu-->
      <!--            :default-open-keys="['sub1']"-->
      <!--            :default-selected-keys="['1']"-->
      <!--            :style="{ height: '100%', borderRight: 0 }"-->
      <!--            mode="inline"-->
      <!--        >-->
      <!--          <a-sub-menu key="sub1">-->
      <!--            <span slot="title"><a-icon type="user"/>subnav 1</span>-->
      <!--            <a-menu-item key="1">-->
      <!--              option1-->
      <!--            </a-menu-item>-->
      <!--            <a-menu-item key="2">-->
      <!--              option2-->
      <!--            </a-menu-item>-->
      <!--            <a-menu-item key="3">-->
      <!--              option3-->
      <!--            </a-menu-item>-->
      <!--            <a-menu-item key="4">-->
      <!--              option4-->
      <!--            </a-menu-item>-->
      <!--          </a-sub-menu>-->
      <!--          <a-sub-menu key="sub2">-->
      <!--            <span slot="title"><a-icon type="laptop"/>subnav 2</span>-->
      <!--            <a-menu-item key="5">-->
      <!--              option5-->
      <!--            </a-menu-item>-->
      <!--            <a-menu-item key="6">-->
      <!--              option6-->
      <!--            </a-menu-item>-->
      <!--            <a-menu-item key="7">-->
      <!--              option7-->
      <!--            </a-menu-item>-->
      <!--            <a-menu-item key="8">-->
      <!--              option8-->
      <!--            </a-menu-item>-->
      <!--          </a-sub-menu>-->
      <!--          <a-sub-menu key="sub3">-->
      <!--            <span slot="title"><a-icon type="notification"/>subnav 3</span>-->
      <!--            <a-menu-item key="9">-->
      <!--              option9-->
      <!--            </a-menu-item>-->
      <!--            <a-menu-item key="10">-->
      <!--              option10-->
      <!--            </a-menu-item>-->
      <!--            <a-menu-item key="11">-->
      <!--              option11-->
      <!--            </a-menu-item>-->
      <!--            <a-menu-item key="12">-->
      <!--              option12-->
      <!--            </a-menu-item>-->
      <!--          </a-sub-menu>-->
      <!--        </a-menu>-->
      <!--      </a-layout-sider>-->
      <a-layout style="padding: 0 24px 24px">

        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>

        <a-layout-content
            :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
        >
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
export default {
  name: "Layout",
  methods: {
    click: function ({item, key, keyPath}) {
      console.log(item);
      console.log(key);
      console.log(keyPath);
    },
  },
  data() {
    return {
      collapsed: false,
    };
  },
}
</script>

<style scoped>

#components-layout-demo-top-side-2 .logo {
  /*width: 120px;*/
  width: 200px;
  height: 64px;
  /*height: 31px;*/
  /*background: rgba(255, 255, 255, 0.2);*/
  /*margin: 16px 28px 16px 0;*/
  float: left;
}
</style>
