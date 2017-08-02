import Vue from 'vue';
import VueRouter from 'vue-router';
import { 
  Button, 
  Card, 
  Row,
  Col,
  Icon,
  Tabs,
  TabPane,
  Input,
  Loading,
  Message
} from 'element-ui';
import App from './App.vue';
import store from './store';
import axios from 'axios';
import list from './components/list.vue';
import detail from './components/detail.vue';

Vue.use(VueRouter);
Vue.use(Button);
Vue.use(Card);
Vue.use(Row)
Vue.use(Col)
Vue.use(Icon);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Input);
Vue.use(Loading);


Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;
Vue.prototype.$axios = axios;

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
  store,
  render: h => h(App)
})
