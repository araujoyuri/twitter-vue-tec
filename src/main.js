import Vue from 'vue'
import Notification from 'vue-notification'
import Resource from 'vue-resource'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store/store'

Vue.config.productionTip = false

Vue.use(Notification)

Vue.use(Resource)

Vue.http.options.root = '/root'
Vue.http.interceptors.push((request, next) => {
  request.headers.set('Authorization', window.localStorage.getItem('vue-twitter-token'))
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
