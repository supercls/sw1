import Vuex from "vuex";
import { createPersistedState, createSharedMutations } from "vuex-electron"
const storage = require('electron-localstorage');

const store = new Vuex.Store({
  state: {
    Token: storage.getItem(`ele-storage-token`) || '123456',
  },
  actions: {
    setToken({ commit, state }, token) {
      commit("SETTOKEN", token);
    },
  },
  mutations: {
    SETTOKEN: (state, token) => {
      state.Token = token;
      storage.setItem("ele-storage-token", token);
    },
  },
	plugins: [createPersistedState(), createSharedMutations()],
});

export default store;
