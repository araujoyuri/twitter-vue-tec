import * as types from '../mutation-types'
import usersApi from '../../api/users'
import { hashSync } from 'bcryptjs'

const state = {
  activeUser: null,
  token: null,
  allUsers: null,
  error: null,
  status: '',
  loading: false
}

const mutations = {
  [types.FETCH_USER_SUCCESS] (state, { result }) {
    state.activeUser = result
    state.token = hashSync(result.password, 8)
    state.status = 'success'
    state.loading = false
  },
  [types.FETCH_USER_FAILED] (state, { error }) {
    state.error = error
    state.status = 'failed'
    state.loading = false
  },
  [types.FETCH_USER_PENDING] (state) {
    state.status = 'loading'
    state.loading = true
  },

  [types.FETCH_USERS_SUCCESS] (state, { result }) {
    state.allUsers = result
    state.status = 'success'
    state.loading = false
  },
  [types.FETCH_USERS_FAILED] (state, { error }) {
    state.error = error
    state.status = 'failed'
    state.loading = false
  },
  [types.FETCH_USERS_PENDING] (state) {
    state.status = 'loading'
    state.loading = true
  },

  [types.DELETE_USER_SUCCESS] (state, { result }) {
    state.allUsers = state.allUsers.filter(user => user.id !== result.id)
    state.status = 'success'
    state.loading = false
  },
  [types.DELETE_USER_FAILED] (state, { error }) {
    state.error = error
    state.status = 'failed'
    state.loading = false
  },
  [types.DELETE_USER_PENDING] (state) {
    state.status = 'loading'
    state.loading = true
  },

  [types.SAVE_USER_SUCCESS] (state, { result }) {
    state.allUsers.push(result)
    state.status = 'success'
    state.loading = false
  },
  [types.SAVE_USER_FAILED] (state, { error }) {
    state.error = error
    state.status = 'failed'
    state.loading = false
  },
  [types.SAVE_USER_PENDING] (state) {
    state.status = 'loading'
    state.loading = true
  },

  [types.LOGOUT_USER_SUCCESS] (state) {
    state.activeUser = null
    state.token = null
    state.status = 'success'
  },
  [types.LOGOUT_USER_FAILED] (state, { error }) {
    state.error = error
    state.status = 'failed'
  }
}

const actions = {
  getUser ({ commit, dispatch }, userLogin) {
    commit(types.FETCH_USER_PENDING)
    return usersApi.getUser(userLogin)
      .then(result => {
        const { error } = result
        if (error) {
          commit(types.FETCH_USER_FAILED, { error })
        } else {
          commit(types.FETCH_USER_SUCCESS, { result })
          return result
        }
      })
      .catch(error => {
        commit(types.FETCH_USER_FAILED, { error })
      })
  },
  getUsers ({ commit, dispatch }) {
    commit(types.FETCH_USERS_PENDING)
    return usersApi.getUsers()
      .then(result => {
        const { error } = result
        if (error) {
          commit(types.FETCH_USERS_FAILED, { error })
        } else {
          commit(types.FETCH_USERS_SUCCESS, { result })
        }
      })
      .catch(error => {
        commit(types.FETCH_USERS_FAILED, { error })
      })
  },
  deleteUser ({ commit, dispatch }, userId) {
    commit(types.DELETE_USER_PENDING)
    return usersApi.deleteUser(userId)
      .then(result => {
        const { error } = result
        if (error) {
          commit(types.DELETE_USER_FAILED, { error })
        } else {
          commit(types.DELETE_USER_SUCCESS, { result })
        }
      })
      .catch(error => {
        commit(types.DELETE_USER_FAILED, { error })
      })
  },
  saveUser ({ commit, dispatch }, user) {
    commit(types.SAVE_USER_PENDING)
    return usersApi.saveUser(user)
      .then(result => {
        const { error } = result
        if (error) {
          commit(types.SAVE_USER_FAILED, { error })
        } else {
          commit(types.SAVE_USER_SUCCESS, { result })
        }
      })
      .catch(error => {
        commit(types.SAVE_USER_FAILED, { error })
      })
  },
  logout ({ commit, dispatch }) {
    try {
      commit(types.LOGOUT_USER_SUCCESS)
    } catch (error) {
      commit(types.LOGOUT_USER_FAILED, { error })
    }
  }
}

export default {
  state,
  mutations,
  actions
}
