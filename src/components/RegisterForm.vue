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
        <v-flex xs12>
          <v-text-field :class="{ invalid: !password_valid }" label="Verificar senha" type="password" v-model="check_password" @blur="verifyPassword" required></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
    <v-card-actions>
      <v-btn color="error" flat @click="$emit('close')">Fechar</v-btn>
      <v-btn type="submit" color="primary" @click="registerUser" flat>Enviar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import users from '../../users-list'
import { hashSync } from 'bcryptjs'

export default {
  name: 'RegisterForm',
  data () {
    return {
      login: null,
      password: null,
      check_password: null,
      password_valid: true
    }
  },
  props: {
    login_data: Object
  },
  methods: {
    verifyPassword () {
      if (this.password === this.check_password) {
        this.password_valid = true
        return true
      } else {
        this.password_valid = false
        return false
      }
    },
    registerUser () {
      if (!users['json'].find(user => user.login === this.login)) {
        users['json'].push({ login: this.login, password: this.password })
        const hashedPass = hashSync(this.password, 8)
        window.localStorage.setItem('vue-twitter-access-token', hashedPass)
        window.localStorage.setItem('vue-twitter-active-user', this.login)
        this.$store.dispatch('setActiveUser', { login: this.login, password: this.password })
        window.location.reload()
      }
    }
  }
}
</script>

<style scoped>
  .invalid {
    background-color: #d55d4b;
    border-color: #d51c21 ;
  }
</style>
