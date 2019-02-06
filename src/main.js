import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import Overview from './components/Overview'
import DownloadItem from './components/DownloadItem'
import Files from './components/Files'
import File from './components/File'
//import router from './router'
import sharedUI from 'shared-ui'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faFolder, faFile, faSpinner, faFolderPlus, faFileUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFolder)
library.add(faFile)
library.add(faSpinner)
library.add(faFolderPlus)
library.add(faFileUpload)

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
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App,
    Overview
  }
})
