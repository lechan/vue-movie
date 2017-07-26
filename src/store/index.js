import Vue from 'vue';
import Vuex from 'vuex';
import tab from './modules/tab.js';
import search from './modules/search.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    tab,
    search
  }
})