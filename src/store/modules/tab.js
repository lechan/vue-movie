import * as types from '../mutation-types';

const state = {
  typeCode: ''
}

const actions = {
  changeTab ({ commit }, typeCode) {
    commit(types.TYPECODE_CHANGE,{ typeCode });
  }
}

const getters = {
  getTypeCode: state => state.typeCode
}

const mutations = {
  [types.TYPECODE_CHANGE] (state, { typeCode }){
    state.typeCode = typeCode;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}