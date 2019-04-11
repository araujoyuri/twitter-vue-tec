<template>
  <v-container grid-list-md text-xs-center fill-height>
    <v-layout row wrap>
      <v-flex xs6 fill-height>
        <v-card dark color="primary">
          <v-card-text>
            <span>
              <v-icon>hashtag</v-icon>Siga o que lhe interessa
            </span>
          </v-card-text>
          <v-card-text>
            <span>
              <v-icon>comments</v-icon>Saiba o que estão falando
            </span>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs6 fill-height>
        <v-card light color="grey lighten-5">
          <div class="text-xs-center">
            <v-btn round color="primary" @click="register_modal = true" dark>Registrar</v-btn>
            <v-dialog v-model="register_modal" max-width="600px">
              <register-form @close="register_modal = false" />
            </v-dialog>
          </div>
          <div class="text-xs-center">
            <v-btn color="primary" @click="login_modal = true" dark round>Login</v-btn>
            <v-dialog v-model="login_modal" max-width="600px">
              <login-form @close="login_modal = false" />
            </v-dialog>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

export default {
  name: 'LoginPage',
  data () {
    return {
      login_modal: false,
      register_modal: false
    }
  },
  components: {
    RegisterForm,
    LoginForm
  }
}
</script>

<style scoped>

</style>
