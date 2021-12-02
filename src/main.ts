import Vue from 'vue'
import App from './App.vue'
import './assets/scss/main.scss'
import './assets/img/icons'
import store from "@/store";
import Toasted from 'vue-toasted';

Vue.config.productionTip = false
// Vue.prototype.$bus = new Vue()
Vue.use(Toasted);
new Vue({
    store,
    render: h => h(App),
}).$mount('#app')
