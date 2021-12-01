import Vue from 'vue'
import App from './App.vue'
import './assets/scss/main.scss'
import './assets/img/icons'
import store from "@/store";

Vue.config.productionTip = false
// Vue.prototype.$bus = new Vue()
new Vue({
    store,
    render: h => h(App),
}).$mount('#app')
