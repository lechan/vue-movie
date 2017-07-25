import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import App from './App.vue';
import list from './components/list.vue';
import detail from './components/detail.vue';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(ElementUI);

const routes = [{
  path: '/',
  component: list
}, {
  path: '/list',
  component: list
}, {
  path: '/detail',
  component: detail
}];

const router = new VueRouter({
  routes
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
