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
          password: this.password
        }
        this.$store.dispatch('saveUser', user)
          .then(user => {
            if (user) {
              this.$router.push('/')
            } else {
              this.$notify({
                title: 'Erro no cadastro do usuário',
                text: 'Reveja as informações e tente novamente',
                type: 'error',
                group: 'toaster'
              })
            }
          })
      } else {
        this.$notify({
          title: 'Usuário já cadastrado',
          text: 'O usuário informado já está cadastrado no nosso sistema.',
          type: 'error',
          group: 'toaster'
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
