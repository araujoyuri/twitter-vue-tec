import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#3f51b5',
    secondary: '#00bcd4',
    accent: '#673ab7',
    error: '#f44336',
    warning: '#ffc107',
    info: '#2196f3',
    success: '#8bc34a'
  }
})
