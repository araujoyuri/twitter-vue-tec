import Vue from 'vue'
import Notification from 'vue-notification'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store/store'

Vue.config.productionTip = false

Vue.use(Notification)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
