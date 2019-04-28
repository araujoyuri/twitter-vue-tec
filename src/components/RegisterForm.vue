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
import { hashSync } from 'bcryptjs'
import * as uuid from 'uuid'

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
  created () {
    this.$store.dispatch('getUsers')
  },
  computed: {
    resgisteredUsers () {
      return this.$store.state.users.allUsers
    }
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
      const user = this.resgisteredUsers.find(user => user.login === this.login)
      if (!user) {
        let user = {
          id: uuid.v4(),
          login: this.login,
          password: hashSync(this.password, 8)
        }
        this.$store.dispatch('saveUser', user)
          .then(() => {
            if (this.$store.state.users.status === 'success') {
              window.location.reload()
            } else {
              window.alert('Erro no cadastro do usuário. Tente novamente.')
            }
          })
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
