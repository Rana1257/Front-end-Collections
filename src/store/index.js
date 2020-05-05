import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    showLoading: false
  },
  getters: {
    returnShowLoading: (state) => {
      return state.showLoading
    }
  },
  mutations: {
    changeShowLoadingAsTrue: (state) => {
      state.showLoading = true
    },
    changeShowLoadingAsFalse: (state) => {
      state.showLoading = false
    }
  }
})

export default store
