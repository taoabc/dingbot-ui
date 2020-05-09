import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import axios from 'axios';
import _ from 'lodash';
import { UserInfo, Employee, Signkey } from './type';

const config = {
  baseURL:
    process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:8001',
  headers: {} as { [key: string]: string | undefined }
};

Vue.use(Vuex);

interface State {
  userInfo: UserInfo;
  employee: Employee[];
  signKey: Signkey[];
}

const defUserInfo: UserInfo = { uid: '', nick: '', group: '', token: '' };

function getStorageUserInfo(): UserInfo {
  const str = localStorage.getItem('user-info');
  if (str) {
    try {
      return JSON.parse(str);
    } catch {
      // storage error
      localStorage.removeItem('user-info');
    }
  }
  return defUserInfo;
}

const state: State = {
  userInfo: getStorageUserInfo(),
  employee: [],
  signKey: []
};

const store = new Vuex.Store({
  state,

  mutations: {
    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo;
      localStorage.setItem('user-info', JSON.stringify(userInfo));
    },

    updateAllEmployee(state, employee) {
      state.employee = employee;
    },

    addEmployee(state, employee) {
      state.employee.push(employee);
    },

    updateEmployee(state, employee: Employee) {
      const employeeCloned = _.cloneDeep(state.employee);
      const i = _.findIndex(employeeCloned, { userName: employee.userName });
      if (i >= 0) {
        employeeCloned[i] = { ...employeeCloned[i], ...employee };
        state.employee = employeeCloned;
      }
    },

    removeEmployee(state, userName) {
      const employeeCloned = _.cloneDeep(state.employee);
      _.remove(employeeCloned, (emp: Employee) => emp.userName === userName);
      state.employee = employeeCloned;
    },

    updateAllSignKey(state, signKey) {
      state.signKey = signKey;
    },

    addSignkey(state, signKey) {
      state.signKey.push(signKey);
    },

    removeSignkey(state, token: string) {
      const cloned = _.cloneDeep(state.signKey);
      _.remove(cloned, (sk: Signkey) => sk.token === token);
      state.signKey = cloned;
    },

    updateSignkey(state, signKey) {
      const cloned = _.cloneDeep(state.signKey);
      const i = _.findIndex(cloned, { token: signKey.token });
      if (i >= 0) {
        cloned[i] = { ...cloned[i], ...signKey };
        state.signKey = cloned;
      }
    }
  },

  actions: {
    async login(context, { uid, password }) {
      const res = await axios.post('/user/login', { uid, password }, config);
      // login success
      if (res.data.code === 'OK') {
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
      if (res.data.code === 'OK') {
        for (const emp of res.data.data) {
          emp.key = emp.userName;
        }
        context.commit('updateAllEmployee', res.data.data);
      }
    },

    async removeEmployee(context, userName: string) {
      const res = await axios.post('/employee/remove', { userName }, config);
      if (res.data.code === 'OK') {
        context.commit('removeEmployee', userName);
      }
    },

    async updateEmployee(context, info) {
      const res = await axios.post('/employee/update', info, config);
      if (res.data.code === 'OK') {
        context.commit('updateEmployee', info);
      }
    },

    async addEmployee(context, emp) {
      const res = await axios.post('/employee/add', emp, config);
      if (res.data.code === 'OK') {
        emp.key = emp.userName;
        context.commit('addEmployee', emp);
      }
    },

    async getAllSignKey(context) {
      const res = await axios.post('/signkey/getAll', null, config);
      if (res.data.code === 'OK') {
        for (const k of res.data.data) {
          k.key = k.token;
        }
        context.commit('updateAllSignKey', res.data.data);
      }
    },

    async removeSignkey(context, token: string) {
      const res = await axios.post('/signkey/remove', { token }, config);
      if (res.data.code === 'OK') {
        context.commit('removeSignkey', token);
      }
    },

    async addSignkey(context, sk) {
      const res = await axios.post('/signkey/add', sk, config);
      if (res.data.code === 'OK') {
        sk.key = sk.token;
        context.commit('addSignkey', sk);
      }
    },

    async updateSignkey(context, sk) {
      const res = await axios.post('/signkey/update', sk, config);
      if (res.data.code === 'OK') {
        context.commit('updateSignkey', sk);
      }
    }
  },

  getters: {
    isLogged(state) {
      return state.userInfo.token.length > 0;
    },

    allEmployee(state) {
      return state.employee;
    },

    allSignkey(state) {
      return state.signKey;
    }
  },

  modules: {}
});

axios.interceptors.response.use(
  function(response) {
    if (response.data.code === 'E_INVALID_TOKEN') {
      store.dispatch('logout');
    }
    return response;
  },
  function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default store;
