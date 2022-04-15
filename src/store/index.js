import Vuex from "vuex";
import { createPersistedState, createSharedMutations } from "vuex-electron";
const storage = require("electron-localstorage");

const store = new Vuex.Store({
  state: {
    Token: "",
    Robot: "",
  },
  actions: {
    setToken({ commit }, token) {
      commit("SETTOKEN", token);
    },
    removeToken({ commit }) {
      commit("DELTOKEN");
    },
    setRobot({ commit }, robot) {
      commit("SETROBOT", robot);
    },
    removeRobot({ commit }) {
      commit("DELROBOT");
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
    },
    SETROBOT: (state, robot) => {
      state.Robot = robot;
    },
    DELROBOT: (state) => {
      state.Robot = null;
    },
  },
  plugins: [createPersistedState(), createSharedMutations()],
});

export default store;
