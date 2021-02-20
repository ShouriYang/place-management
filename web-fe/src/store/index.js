import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    options: false,
    loginUser:{}
  },
  mutations: {
    updateOptions(state, newVal){
      state.options = newVal
    },
    updateLoginUser(state, newVal){
      state.loginUser = newVal
    }
  },
  actions: {
  },
  modules: {
  }
})
