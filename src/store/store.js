import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    active_user: null
  },
  mutations: {
    [types.SET_ACTIVE_USER] (state, { user }) {
      state.active_user = user
    }
  },
  actions: {
    setActiveUser ({ commit, dispatch }, user) {
      commit(types.SET_ACTIVE_USER, { user })
    }
  }
})
