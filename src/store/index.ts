import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {
      uid: null,
      nick: null,
      group: null
    }
  },
  mutations: {
    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    }
  },
  actions: {},
  modules: {}
});
