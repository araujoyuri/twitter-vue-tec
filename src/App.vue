<template>
  <v-app id="topbar">
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-title>Twitter DevEngers</v-toolbar-title>
      <v-toolbar-items>
        <v-btn to="/" flat>Página Inicial</v-btn>
        <v-btn to="/login" flat>Login</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <HelloWorld/>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data () {
    return {
      //
    }
  }
}
</script>
