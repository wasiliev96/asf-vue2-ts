import Vue from 'vue'
import App from './App.vue'
import './assets/scss/main.scss';
import './assets/img/icons';
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
