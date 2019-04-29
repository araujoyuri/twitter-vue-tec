import database from './db'
import { hashSync } from 'bcryptjs'

let usersDB = database.users
let tweetsDB = database.tweets
const salt = '$2a$08$kuFA1UkGAPfXM1S.WwUzSe'

const getUsersList = () => {
  return Promise.resolve(usersDB) || Promise.resolve([])
}

const findUser = (login) => {
  return Promise.resolve(usersDB.find(user => user.login === login))
}

const insertUser = (user) => {
  const u = usersDB.find(u => u.login === user.login)
  if (!u) {
    user.password = hashSync(user.password, salt)
    usersDB.push(user)
    return Promise.resolve(user)
  } else {
    throw new Error(`Usuário ${user.login} já está cadastrado`)
  }
}

const loginUser = (login, password) => {
  password = hashSync(password, salt)
  return Promise.resolve(usersDB.find(user => user.login === login && user.password === password))
}

const removeUser = (userId) => {
  const u = usersDB.find(u => u.id === userId)
  if (u) {
    usersDB = usersDB.filter(u => u.id !== userId)
    return Promise.resolve(u)
  } else {
    throw new Error(`Usuário ${userId} não cadastrado`)
  }
}

const getTweetsList = () => {
  return Promise.resolve(tweetsDB) || Promise.resolve([])
}

const getTweetsByUser = (userLogin) => {
  return Promise.resolve(tweetsDB.find(tweet => tweet.author === userLogin))
}

const findTweet = (tweetId) => {
  return Promise.resolve(tweetsDB.find(t => t.id === tweetId))
}

const insertTweet = (tweet) => {
  const t = tweetsDB.find(t => t.id === tweet.id)
  if (!t) {
    tweetsDB.push(tweet)
    return Promise.resolve(tweet)
  } else {
    throw new Error(`Tweet ${tweet.id} já cadastrado`)
  }
}

const removeTweet = (tweetId) => {
  const t = tweetsDB.find(t => t.id === tweetId)
  if (t) {
    tweetsDB = tweetsDB.filter(t => t.id !== tweetId)
    return Promise.resolve(t)
  } else {
    throw new Error(`Tweet ${tweetId} não cadastrado`)
  }
}

const removeTweetsFromUser = (userLogin) => {
  const tweets = tweetsDB.find(tweet => tweet.author === userLogin)
  if (tweets) {
    tweetsDB = tweetsDB.filter(tweet => tweet.author !== userLogin)
    return Promise.resolve(tweets)
  } else {
    throw new Error(`O usuário ${userLogin} não possui tweets cadastrados`)
  }
}

export const Database = {
  getUsersList,
  findUser,
  insertUser,
  loginUser,
  removeUser,
  getTweetsList,
  getTweetsByUser,
  findTweet,
  insertTweet,
  removeTweet,
  removeTweetsFromUser
}
