<template>
  <v-toolbar color="indigo" dark fixed app>
    <v-toolbar-title>Twitter DevEngers</v-toolbar-title>
    <v-toolbar-items>
      <v-btn to="/" flat>Página Inicial</v-btn>
      <v-btn v-if="isAuthenticated" @click="logout" flat>Logout</v-btn>
      <v-btn v-if="isAuthenticated" fab small color="blue accent-2" bottom right absolute @click="add_tweet = true">
        <v-icon>fas fa-plus-circle</v-icon>
      </v-btn>
      <v-dialog v-model="add_tweet" max-width="600px">
        <add-tweet @close="add_tweet = false"/>
      </v-dialog>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-btn v-if="active_user">{{ active_user.login }}</v-btn>
  </v-toolbar>
</template>

<script>
import AddTweet from '../components/AddTweet'

export default {
  name: 'Toolbar',
  data () {
    return {
      active_user: null,
      add_tweet: false
    }
  },
  components: {
    AddTweet
  },
  methods: {
    logout () {
      window.localStorage.removeItem('vue-twitter-access-token')
      window.localStorage.removeItem('vue-twitter-active-user')
      this.$store.dispatch('setActiveUser', null)
      this.active_user = null
      window.location.reload()
    }
  },
  computed: {
    isAuthenticated () {
      return window.localStorage.getItem('vue-twitter-access-token')
    },
    activeUser () {
      return window.localStorage.getItem('vue-twitter-active-user')
    },
    storeWatch () {
      return this.$store
    }
  },
  watch: {
    storeWatch (newVal) {
      if (newVal) {
        this.active_user = this.activeUser
      }
    }
  }
}
</script>

<style scoped>

</style>
