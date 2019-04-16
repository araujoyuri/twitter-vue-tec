<template>
  <v-container grid-list-xl>
    <v-layout align-center justify-start column fill-height>
      <v-flex v-for="tweet in tweetsFromDB" :key="tweet.id" md12 sm12 lg4>
        <v-card class="px-3 py-2">
          <v-responsive width="600px">
            <v-card-title>
              {{ tweet.author }}
            </v-card-title>
            <v-card-text>
              {{ tweet.text }}
            </v-card-text>
            <small>{{ tweet.timestamp | displayDate }}</small>
          </v-responsive>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import tweets from '../../tweets-list'
import moment from 'moment'

export default {
  computed: {
    tweetsFromDB () {
      return tweets['json']
    }
  },
  filters: {
    displayDate (date) {
      return moment(date).format('DD/MM/YYYY HH:mm')
    }
  }
}
</script>

<style>

</style>
