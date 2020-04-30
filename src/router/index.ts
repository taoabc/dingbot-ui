import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import UserList from '../components/UserList.vue';
import SignKeyList from '../components/SignKeyList.vue';
import Setting from '../components/Setting.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'user',
        component: UserList
      },
      {
        path: 'signkey',
        component: SignKeyList
      },
      {
        path: 'setting',
        component: Setting
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }
];

const router = new VueRouter({
  routes
});

export default router;
