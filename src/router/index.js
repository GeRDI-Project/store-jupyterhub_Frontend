/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'

import Files from "../components/Files"
import Error from "../components/Error"

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/store/jhub-store/files/:sessionId',
      name: 'files',
      component: Files
    },
    {
      path: '/store/jhub-store/error/:sessionId/:code',
      name: 'error',
      component: Error
    }
  ]
})
