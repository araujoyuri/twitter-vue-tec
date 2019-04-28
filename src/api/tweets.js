import { Database } from '../utils/querys'

export default {
  getTweets () {
    return Database.getTweetsList()
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error))
  },
  getTweetsByUser (userLogin) {
    return Database.getTweetsByUser(userLogin)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error))
  },
  findTweet (tweetId) {
    return Database.findTweet(tweetId)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error))
  },
  saveTweet (tweet) {
    return Database.insertTweet(tweet)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error))
  },
  deleteTweet (tweetId) {
    return Database.removeTweet(tweetId)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error))
  },
  deleteTweetsFromUser (userLogin) {
    return Database.removeTweetsFromUser(userLogin)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error))
  }
}
