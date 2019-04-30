<template>
  <v-card>
    <v-card-text>
      <v-text-field v-model="tweet" label="Diga nos o que está pensando"></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn flat color="primary" @click="updateTweet">Enviar</v-btn>
      <v-btn flat color="error" @click="$emit('close')">Fechar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  name: 'EditTweet',
  data () {
    return {
      tweet: null
    }
  },
  props: {
    tweetToEdit: Object
  },
  created () {
    console.log('tweet: ', this.tweetToEdit)
  },
  methods: {
    updateTweet () {
        this.tweetToEdit.tweet = this.tweet
      this.$store.dispatch('saveTweet', this.tweetToEdit)
        .then(() => {
          if (this.$store.state.tweets.status === 'success') {
            this.$notify({
              title: 'Tweet cadastrado com sucesso',
              type: 'success',
              group: 'toaster'
            })
            this.$router.push('/')
            this.$emit('close')
            this.tweet = ''
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
