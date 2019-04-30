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
import uuid from 'uuid'

export default {
  name: 'AddTweet',
  data () {
    return {
      tweet: null
    }
  },
  computed: {
    activeUser () {
      return this.$store.state.users.activeUser
    }
  },
  methods: {
    createTweet () {
      const tweet = {
        id: uuid.v4(),
        author: this.activeUser,
        text: this.tweet,
        timestamp: new Date()
      }
      this.$store.dispatch('saveTweet', tweet)
        .then(() => {
          if (this.$store.state.tweets.status === 'success') {
            this.$notify({
              title: 'Tweet cadastrado com sucesso',
              type: 'success',
              group: 'toaster'
            })
            this.$router.push('/')
            this.$emit('close')
          } else {
            this.$notify({
              title: 'Erro na inserção do tweet',
              text: 'Cheque sua conexão e tente novamente.',
              type: 'error',
              group: 'toaster'
            })
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
