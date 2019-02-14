/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'

import Overview from "../components/Overview"
import Files from "../components/Files"
import Wait from "../components/Wait"

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/store-jhub/overview/:sessionId',
    name: 'overview',
    component: Overview
  },
  {
    path: '/store-jhub/files/:sessionId',
    name: 'files',
    component: Files
  },
  {
    path: '/store-jhub/wait/:sessionId',
    name: 'wait',
    component: Wait
  }
  ]
})
