import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);
import ElementUI from 'element-ui';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
