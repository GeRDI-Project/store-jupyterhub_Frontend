import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import Overview from './components/Overview'
import DownloadItem from './components/DownloadItem'
import Files from './components/Files'
import File from './components/File'
import FileList from './components/FileList'
import Wait from './components/Wait'
import DirPopover from './components/DirPopover'
//import router from './router'
import sharedUI from 'shared-ui'
import { store } from './store/store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faFolder, faFile, faExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFolder)
library.add(faFile)
library.add(faExclamation)

Vue.component('font-awesome-icon', FontAwesomeIcon)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(sharedUI)
Vue.use(BootstrapVue)

Vue.component('app', App)
Vue.component('overview', Overview)
Vue.component('download-item', DownloadItem)
Vue.component('files', Files)
Vue.component('file', File)
Vue.component('file-list', FileList)
Vue.component('wait', Wait)
Vue.component('dir-popover', DirPopover)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  router,
  template: '<App/>',
  components: {
    App,
    Overview
  }
})
