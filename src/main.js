import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStopCircle, faPlayCircle, faTimesCircle, faTimes, faBars, faUserSecret } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from './App.vue'
import './assets/styles.sass'
import router from './router'
import { Tabs, Input, Button, Switch, Numberinput,Field, Icon, Checkbox, Toast} from 'buefy'
import Buefy from 'buefy'
import {setAction, setModelUrl, setConfigured} from "@/utils/configuration";
import Vuex from 'vuex'

Vue.use(Tabs)
Vue.use(Input)
Vue.use(Button)
Vue.use(Switch)
Vue.use(Numberinput)
Vue.use(Field)
Vue.use(Toast)
Vue.use(Icon)
Vue.use(Checkbox)
Vue.use(Vuex)


Vue.use(Buefy, {
  defaultIconComponent: 'vue-fontawesome',
  defaultIconPack: 'fas',
});
Vue.component('vue-fontawesome', FontAwesomeIcon);

library.add(faStopCircle, faPlayCircle, faTimesCircle, faTimes, faBars, faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

const Store = require('electron-store');
const storeElectron = new Store();

const path = require('path');

if(!storeElectron.get("MODEL_URL")){
  const url = 'file://' + path.resolve('./models');
  setModelUrl(url);
}

if(!storeElectron.get("IS_CONFIGURED")){
  setConfigured(false);
}

export const store = new Vuex.Store({
  state: {
    userpass: null
  },
  mutations: {
    setPass (state,pass) {
      state.userpass = pass
    }
  },
  getters: {
     getUserpass: state => {
       return state.userpass
     }
   }
})
if(!storeElectron.get("ACTION")) {
  setAction("notification")
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
