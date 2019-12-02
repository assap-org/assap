import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faSpinner, faAlignLeft, faCog, faStopCircle, faPlayCircle, faTimesCircle, faSlidersH, faTimes } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import App from './App.vue'
import './assets/styles.sass'
import router from './router'
import {setAction, setModelUrl} from "@/utils/configuration";

library.add(faUserSecret, faSpinner, faAlignLeft, faCog, faStopCircle, faPlayCircle, faTimesCircle, faSlidersH, faTimes)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

const Store = require('electron-store');
const store = new Store();

const path = require('path');

if(!store.get("MODEL_URL")){
  const url = 'file://' + path.resolve('./models');
  setModelUrl(url);
}

if(!store.get("ACTION")) {
  setAction("notification")
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
