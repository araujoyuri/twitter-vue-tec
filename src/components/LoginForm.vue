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
      const loginObj = {
        login: this.login,
        password: this.password
      }
      this.$store.dispatch('loginUser', loginObj)
        .then(user => {
          if (user) {
            this.$router.push('/')
          } else {
            this.$notify({
              title: 'Usuário não encontrado',
              text: 'Reveja os dados informados e tente novamente.',
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
