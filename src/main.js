import Vue from 'vue'
import App from './App'

import httpApi from './common/js/httpApi.js'
import httpRequest from './common/js/httpRequest.js'
import utils from './common/js/utils.js'
import mescrollBody from '@/components/mescroll-uni/mescroll-body.vue'
import uView from 'uview-ui'
import store from './store'

Vue.prototype.$api = httpApi
Vue.prototype.$http = httpRequest
Vue.prototype.$utils = utils
Vue.prototype.$store = store
Vue.component('MescrollBody', mescrollBody)
Vue.use(uView)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
