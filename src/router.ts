import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/task',
      name: 'task',
      component: () => import('./views/task/list-task/ListTask.vue'),
    },
    {
      path: '/task/edit/:id',
      name: 'taskEdit',
      component: () => import('./views/task/input-task/InputTask.vue')
    },
    {
      path: '/insert',
      name: 'insert',
      component: () => import('./views/task/input-task/InputTask.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login/Login.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('./views/account/admin/ListAccount.vue'),
    },
    {
      path: '/user/detail/:userId',
      name: 'userDetail',
      component: () => import('./views/account/user/User.vue'),
    },


  ],
});
