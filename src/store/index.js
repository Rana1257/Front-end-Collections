import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLoading: false
  },
  getters: {
    showIsLoading (state) {
      return state.isLoading
    }
  },
  mutations: {
    updateIsLoading (state, flag) {
      state.isLoading = flag
    }
  },
  actions: {
    onLoading (context, flag) {
      context.commit('updateIsLoading', flag)
    }
  }
})

export default store
