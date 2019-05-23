import config from '../app.config'
import Vue from 'vue'

const api = config.API_BASE_URL

export default {
  getUser (userLogin) {
    return Vue.http.get(`${api}/user`, { params: { userLogin } })
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error.body))
  },
  loginUser (login, password) {
    return Vue.http.post(`${api}/user`, { login, password })
      .then(response => Promise.resolve(response.body))
      .catch(error => Promise.reject(error.body))
  },
  getUsers () {
    return Vue.http.get(`${api}/user`)
      .then(response => Promise.resolve(response.body))
      .catch(error => Promise.reject(error.body))
  },
  getTweetsByUser (userLogin) {
    return Vue.http.get(`${api}/tweet/`, { params: { userLogin } })
      .then(response => Promise.resolve(response.body))
      .catch(error => Promise.reject(error.body))
  },
  deleteUser (userId) {
    return Vue.http.delete(`${api}/user/${userId}`)
      .then(response => Promise.resolve(response.body))
      .catch(error => Promise.reject(error.body))
  },
  deleteTweetsFromUser (userLogin) {
    return Vue.http.delete(`${api}/tweet`, { params: { userLogin } })
      .then(response => Promise.resolve(response.body))
      .catch(error => Promise.reject(error.body))
  },
  saveUser (user) {
    return Vue.http.post(`${api}/user`, user)
      .then(response => Promise.resolve(response.body))
      .catch(error => Promise.resolve(error.body))
  }
}
