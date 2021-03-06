import * as types from '../mutation-types'
import tweetsApi from '../../api/tweets'
import usersApi from '../../api/users'

const state = {
  allTweets: null,
  userTweets: null,
  selectedTweet: null,
  error: null,
  status: '',
  loading: false
}

const mutations = {
  [types.FETCH_TWEETS_SUCCESS] (state, { result }) {
    state.allTweets = result.docs
    state.status = 'success'
    state.loading = false
  },
  [types.FETCH_TWEETS_FAILED] (state, { error }) {
    state.error = error
    state.status = 'failed'
    state.loading = false
  },
  [types.FETCH_TWEETS_PENDING] (state) {
    state.status = 'loading'
    state.loading = true
  },

  [types.FETCH_TWEETS_BY_USER_SUCCESS] (state, { result }) {
    state.userTweets = result
    state.status = 'success'
    state.loading = false
  },
  [types.FETCH_TWEETS_BY_USER_FAILED] (state, { error }) {
    state.error = error
    state.status = 'failed'
    state.loading = false
  },
  [types.FETCH_TWEETS_BY_USER_PENDING] (state) {
    state.status = 'loading'
    state.loading = true
  },

  [types.FIND_TWEET_SUCCESS] (state, { result }) {
    state.selectedTweet = result
    state.status = 'success'
    state.loading = false
  },
  [types.FIND_TWEET_FAILED] (state, { error }) {
    state.error = error
    state.status = 'failed'
    state.loading = false
  },
  [types.FIND_TWEET_PENDING] (state) {
    state.status = 'loading'
    state.loading = true
  },

  UPDATE_TWEET_SUCCESS (state, { result }) {
    state.allTweets = state.allTweets.map(tweet => {
      if (tweet._id === result._id) {
        tweet = result
      }
      return tweet
    })
  },

  [types.SAVE_TWEET_SUCCESS] (state, { result }) {
    state.allTweets.push(result[0])
    state.status = 'success'
    state.loading = false
  },
  [types.SAVE_TWEET_FAILED] (state, { error }) {
    state.error = error
    state.status = 'failed'
    state.loading = false
  },
  [types.SAVE_TWEET_PENDING] (state) {
    state.status = 'loading'
    state.loading = true
  },

  [types.DELETE_TWEET_SUCCESS] (state, { tweetId }) {
    state.allTweets = state.allTweets.filter(tweet => tweet._id !== tweetId)
    state.status = 'success'
    state.loading = false
  },
  [types.DELETE_TWEET_FAILED] (state, { error }) {
    state.error = error
    state.status = 'failed'
    state.loading = false
  },
  [types.DELETE_TWEET_PENDING] (state) {
    state.status = 'loading'
    state.loading = true
  },

  [types.DELETE_TWEETS_FROM_USER_SUCCESS] (state, { result }) {
    result.forEach(tweetDeleted => {
      state.allTweets = state.allTweets.filter(tweet => tweet.id !== tweetDeleted.id)
    })
    state.status = 'success'
    state.loading = false
  },
  [types.DELETE_TWEETS_FROM_USER_FAILED] (state, { error }) {
    state.error = error
    state.status = 'failed'
    state.loading = false
  },
  [types.DELETE_TWEETS_FROM_USER_PENDING] (state) {
    state.status = 'loading'
    state.loading = true
  }
}

const actions = {
  getTweets ({ commit, dispatch }) {
    commit(types.FETCH_TWEETS_PENDING)
    return tweetsApi.getTweets()
      .then(result => {
        const { error } = result
        if (error) {
          commit(types.FETCH_TWEETS_FAILED, { error })
        } else {
          commit(types.FETCH_TWEETS_SUCCESS, { result })
        }
      })
      .catch(error => {
        commit(types.FETCH_TWEETS_FAILED, { error })
      })
  },
  getTweetsByUser ({ commit, dispatch }, userLogin) {
    commit(types.FETCH_TWEETS_BY_USER_PENDING)
    return usersApi.getTweetsByUser(userLogin)
      .then(result => {
        const { error } = result
        if (error) {
          commit(types.FETCH_TWEETS_BY_USER_FAILED, { error })
        } else {
          commit(types.FETCH_TWEETS_BY_USER_SUCCESS, { result })
        }
      })
      .catch(error => {
        commit(types.FETCH_TWEETS_BY_USER_FAILED, { error })
      })
  },
  updateTweet ({ commit, dispatch }, tweet) {
    tweetsApi.updateTweet(tweet)
      .then(result => {
        commit('UPDATE_TWEET_SUCCESS', { result })
      })
  },
  findTweet ({ commit, dispatch }, tweetId) {
    commit(types.FIND_TWEET_PENDING)
    return tweetsApi.findTweet(tweetId)
      .then(result => {
        const { error } = result
        if (error) {
          commit(types.FIND_TWEET_FAILED, { error })
        } else {
          commit(types.FIND_TWEET_SUCCESS, { result })
        }
      })
      .catch(error => {
        commit(types.FIND_TWEET_FAILED, { error })
      })
  },
  saveTweet ({ commit, dispatch }, tweet) {
    commit(types.SAVE_TWEET_PENDING)
    return tweetsApi.saveTweet(tweet)
      .then(result => {
        const { error } = result
        if (error) {
          commit(types.SAVE_TWEET_FAILED, { error })
        } else {
          commit(types.SAVE_TWEET_SUCCESS, { result })
        }
      })
      .catch(error => {
        commit(types.SAVE_TWEET_FAILED, { error })
      })
  },
  deleteTweet ({ commit, dispatch }, tweetId) {
    commit(types.DELETE_TWEET_PENDING)
    return tweetsApi.deleteTweet(tweetId)
      .then(result => {
        const { error } = result
        if (error) {
          commit(types.DELETE_TWEET_FAILED, { error })
        } else {
          commit(types.DELETE_TWEET_SUCCESS, { tweetId })
        }
      })
      .catch(error => {
        commit(types.DELETE_TWEET_FAILED, { error })
      })
  },
  deleteTweetsFromUser ({ commit, dispatch }, userLogin) {
    commit(types.DELETE_TWEETS_FROM_USER_PENDING)
    return usersApi.deleteTweetsFromUser(userLogin)
      .then(result => {
        const { error } = result
        if (error) {
          commit(types.DELETE_TWEETS_FROM_USER_FAILED, { error })
        } else {
          commit(types.DELETE_TWEETS_FROM_USER_SUCCESS, { result })
        }
      })
      .catch(error => {
        commit(types.DELETE_TWEETS_FROM_USER_FAILED, { error })
      })
  }
}

export default {
  actions,
  state,
  mutations
}
