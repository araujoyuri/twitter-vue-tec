<template>
  <v-card>
    <v-container grid-list-md>
      <v-layout wrap>
        <v-flex xs12>
          <v-text-field label="Usuário" v-model="login" required></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field label="Senha" type="password" v-model="password" required></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
    <v-card-actions>
      <v-btn color="error" flat @click="$emit('close')">Fechar</v-btn>
      <v-btn type="submit" color="primary" flat @click="checkLogin">Enviar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import users from '../../users-list'
import { hashSync } from 'bcryptjs'

export default {
  name: 'LoginForm',
  data () {
    return {
      login: 'araujoyuri',
      password: 'araujoyuri@123'
    }
  },
  methods: {
    checkLogin () {
      const user = users['json'].find(user => this.login === user.login && this.password === user.password)
      if (user) {
        let hashedPass = hashSync(user.password, 8)
        window.localStorage.setItem('vue-twitter-access-token', hashedPass)
        window.localStorage.setItem('vue-twitter-active-user', user.login)
        this.$store.dispatch('setActiveUser', { login: this.login, password: this.password })
        window.location.reload()
      } else {
        window.alert('Usuário não encontrado')
      }
    }
  }
}
</script>

<style scoped>

</style>
