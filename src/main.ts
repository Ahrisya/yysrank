import Vue from 'vue'
import Antd from 'ant-design-vue';
import App from "@/App.vue";
import router from '@/router';
import VueCookies from 'vue-cookies';
import VueRouter from 'vue-router';
import store from '@/store';

Vue.config.productionTip = false

// console.log('vue init');

Vue.use(Antd);
Vue.use(VueRouter);
Vue.use(VueCookies);

new Vue({
    render: h => h(App),
    store,
    router,
}).$mount('#app')
