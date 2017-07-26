import * as types from '../mutation-types';

const state = {
  keyWord: ''
}

const actions = {
  changeInput ({ commit }, keyWord) {
    commit(types.KEYWORD_CHANGE,{ keyWord });
  }
}

const getters = {
  getKeyWord: state => state.keyWord
}

const mutations = {
  [types.KEYWORD_CHANGE] (state, { keyWord }){
    state.keyWord = keyWord;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}