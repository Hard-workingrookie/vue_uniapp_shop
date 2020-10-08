import Vue from 'vue'
import App from './App'
import request from './api.js'
import store from './store'

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$request = request


App.mpType = 'app'

const app = new Vue({
	...App,
	 store
})
app.$mount()



