import Vuex from "vuex";
import { createPersistedState, createSharedMutations } from "vuex-electron"
const storage = require('electron-localstorage');

const store = new Vuex.Store({
  state: {
    Token: '',
  },
  actions: {
    setToken({ commit }, token) {
        commit("SETTOKEN", token);
    },
    removeToken({ commit }) {
      commit("DELTOKEN");
    },
  },
  mutations: {
    SETTOKEN: (state, token) => {
      state.Token = token;
      storage.setItem("ele-storage-token", token);
    },
    DELTOKEN: (state) => {
      state.Token = null;
      storage.removeItem("ele-storage-token");
    }
  },
	plugins: [createPersistedState(), createSharedMutations()],
});

export default store;
