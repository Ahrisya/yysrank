import Vue from 'vue'
import Antd from 'ant-design-vue';
import App from "@/App.vue";
import router from "@/router";

Vue.config.productionTip = false

console.log('vue init');

Vue.use(Antd);

new Vue({
    render: h => h(App),
    router,
}).$mount('#app')
