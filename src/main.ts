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
import VeeValidate from 'vee-validate';
import { loginService } from './services/login.service';
// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
      const token = localStorage['x-auth-token'];
      if (token) {
          config.headers.Authorization = 'Bearer ' + token;
      }
      // config.headers['Content-Type'] = 'application/json';
      return config;
  },
  (error) => {
      Promise.reject(error);
  });

Vue.use(VeeValidate, {
  xxxx: 'xxxx',
  fieldsBagName: 'veefields'       // 此处默认为fields
});
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
