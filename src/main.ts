import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';

Vue.config.productionTip = false

console.log('vue init');

Vue.use(Antd);

new Vue({
    render: h => h(App),
}).$mount('#app')
