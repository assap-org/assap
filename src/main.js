import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStopCircle, faPlayCircle, faTimesCircle, faTimes, faBars, faUserSecret } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import App from './App.vue'
import './assets/styles.sass'
import router from './router'
import { Tabs, Input, Button, Switch, Numberinput,Field, Icon} from 'buefy'
import Buefy from 'buefy'
import {setAction, setModelUrl, setConfigured} from "@/utils/configuration";

Vue.use(Tabs)
Vue.use(Input)
Vue.use(Button)
Vue.use(Switch)
Vue.use(Numberinput)
Vue.use(Field)
Vue.use(Icon)

Vue.use(Buefy, {
  defaultIconComponent: 'vue-fontawesome',
  defaultIconPack: 'fas',
});

library.add(faStopCircle, faPlayCircle, faTimesCircle, faTimes, faBars, faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

const Store = require('electron-store');
const store = new Store();

const path = require('path');

if(!store.get("MODEL_URL")){
  const url = 'file://' + path.resolve('./models');
  setModelUrl(url);
}

if(!store.get("IS_CONFIGURED")){
  setConfigured(false);
}

if(!store.get("DESCRIPTORS")){
  store.set("DESCRIPTORS", JSON.stringify([]));
}

if(!store.get("ACTION")) {
  setAction("notification")
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
