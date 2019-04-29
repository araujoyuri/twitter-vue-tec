import { Database } from '../utils/querys'

export default {
  getUser (userLogin) {
    return Database.findUser(userLogin)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error))
  },
  loginUser (login, password) {
    return Database.loginUser(login, password)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error))
  },
  getUsers () {
    return Database.getUsersList()
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error))
  },
  deleteUser (userId) {
    return Database.removeUser(userId)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error))
  },
  saveUser (user) {
    return Database.insertUser(user)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.resolve(error))
  }
}
