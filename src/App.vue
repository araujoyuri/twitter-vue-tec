<template>
  <v-app>
    <Toolbar />
    <v-content>
      <v-container fluid>
        <Home />
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Home from './views/Home'
import Toolbar from './components/Toolbar'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Home,
    Toolbar,
    Footer
  }
}
</script>
