import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

const config = {
  baseURL: 'http://localhost:8001',
  headers: {} as { [key: string]: string | undefined }
};

Vue.use(Vuex);

interface UserInfo {
  uid: string;
  nick: string;
  group: string;
  token: string;
}

interface Employee {
  key: string;
  realName: string;
  authorEmail: string;
  authorName: string;
  userEmail: string;
  userName: string;
  phone: string;
}

interface State {
  userInfo: UserInfo;
  employee: Employee[];
}

const defUserInfo: UserInfo = { uid: '', nick: '', group: '', token: '' };

const state: State = {
  userInfo: defUserInfo,
  employee: []
};

export default new Vuex.Store({
  state,

  mutations: {
    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },

    updateEmployee(state, employee) {
      state.employee = employee;
    }
  },

  actions: {
    async login(context, { uid, password }) {
      const res = await axios.post('/user/login', { uid, password }, config);
      if (res.data?.code === 0) {
        config.headers['X-token'] = res.data.data.token;
        context.commit('updateUserInfo', {
          ...defUserInfo,
          ...res.data.data
        });
      } else {
        context.dispatch('logout');
      }
    },

    async logout(context) {
      config.headers['X-token'] = undefined;
      context.commit('updateUserInfo', defUserInfo);
    },

    async getAllEmployee(context) {
      const res = await axios.post('/employee/getAll', null, config);
      if (res.data?.code === 0) {
        const employee = [];
        for (const emp of res.data.data) {
          emp.key = emp.username;
        }
        context.commit('updateEmployee', res.data.data);
      }
    }
  },

  getters: {
    isLogged(state) {
      return state.userInfo.token.length > 0;
    },

    allEmployee(state) {
      return state.employee;
    }
  },

  modules: {}
});
