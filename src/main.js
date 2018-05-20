import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import Element from 'element-ui'
import axios from 'axios'
import moment from 'moment'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog'// error log
// import './permission' // permission control
// import './mock' // simulation data

import * as filters from './filters' // global filters

Vue.use(Element, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App },
  created() {
    const url = process.env.API_ROOT
    axios.interceptors.request.use(config => {
      if (config.url.indexOf(url) === -1) {
        config.url = url + config.url
      }
      if (config.url.indexOf('login') === -1) {
        const token = localStorage.getItem('BDToken') || ''
        console.log(config.params)
        config.params = {
          'access_token': token
        }
        console.log(config.params)
      }
      return config
    }, error => {
      return Promise.reject(error)
    })

    axios.interceptors.response.use(res => {
      console.log(res)
      return res
    }, error => {
      var response = error.response
      if (response && response.status === 401) {
        console.log(this, this.$router)
        this.$router.push({
          path: '/login'
        })
      }
      return Promise.reject(error)
    })

    Vue.filter('formatDateTime', function(value) {
      if (value) {
        if (typeof value === 'string') {
        //   return moment(String(value)).format('YYYY-MM-DD hh:mm')
        // } else if (typeof value === 'number') {
          return moment.unix(parseInt(value) / 1000).format('YYYY-MM-DD HH:mm')
        }
      }
    })
  }
})
