<template>
  <v-card>
    <v-card-text>
      <v-text-field v-model="tweet" label="Diga nos o que está pensando"></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn flat color="primary" @click="createTweet">Enviar</v-btn>
      <v-btn flat color="error" @click="$emit('close')">Fechar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import tweets from '../../tweets-list'
import moment from 'moment'
import uuid from 'uuid'

export default {
  name: 'AddTweet',
  data () {
    return {
      tweet: null
    }
  },
  created () {
    console.log('active user: ', window.localStorage.getItem('vue-twitter-active-user'))
  },
  methods: {
    createTweet () {
      let tweetObj = {
        id: uuid.v4(),
        author: window.localStorage.getItem('vue-twitter-active-user'),
        tweet: this.tweet,
        timestamp: moment().format('DD/MM/YYYY HH:ss')
      }
      tweets['json'].push(tweetObj)
      console.log('tweets: ', tweets)
      window.location.reload()
    }
  }
}
</script>

<style scoped>

</style>
