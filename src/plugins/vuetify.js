import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import '@fortawesome/fontawesome-free/css/all.css'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'fa',
  theme: {
    primary: '#3273dc',
    secondary: '#00d1b2',
    accent: '#673ab7',
    error: '#ff3860',
    warning: '#ffdd57',
    info: '#209cee',
    success: '#8bc34a'
  }
})
