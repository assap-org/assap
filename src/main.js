import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faSpinner, faAlignLeft, faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import "tracking"
import "tracking/build/data/face";

import App from './App.vue'
import './assets/styles.sass'
import router from './router'

library.add(faUserSecret, faSpinner, faAlignLeft, faCog)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
