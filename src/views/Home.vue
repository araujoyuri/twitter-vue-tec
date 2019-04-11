<template>
  <section>
    <Timeline v-if="isAuthenticated" />
    <LoginPage v-else />
  </section>
</template>

<script>
import LoginPage from './LoginPage'
import Timeline from './Timeline'

export default {
  components: {
    LoginPage,
    Timeline
  },
  computed: {
    isAuthenticated () {
      return window.localStorage.getItem('vue-twitter-access-token')
    }
  }
}
</script>
