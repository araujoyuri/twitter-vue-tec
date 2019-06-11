import config from '../app.config'
import Vue from 'vue'

const api = config.API_BASE_URL

export default {
  getTweets () {
    return Vue.http.get(`${api}/tweet`)
      .then(response => Promise.resolve(response.body))
      .catch(error => Promise.reject(error))
  },
  findTweet (tweetId) {
    return Vue.http.get(`${api}/tweet/${tweetId}`)
      .then(response => Promise.resolve(response.body))
      .catch(error => Promise.reject(error))
  },
  updateTweet (tweet) {
    return Vue.http.put(`${api}/tweet/${tweet._id}`, { text: tweet.text })
      .then(response => Promise.resolve(response.body))
      .catch(error => Promise.reject(error))
  },
  saveTweet (tweet) {
    return Vue.http.post(`${api}/tweet`, tweet)
      .then(response => Promise.resolve(response.body))
      .catch(error => Promise.reject(error))
  },
  deleteTweet (tweetId) {
    return Vue.http.delete(`${api}/tweet/${tweetId}`)
      .then(response => Promise.resolve(response.body))
      .catch(error => Promise.reject(error))
  }
}
