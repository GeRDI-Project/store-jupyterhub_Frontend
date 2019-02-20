/**
 * Copyright 2019 Nelson Tavares de Sousa
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import axios from 'axios'
import usercookie from '../../util/usercookie.js'

const state = {
  step: 0,
  files: [],
  loading: true,
  error: false,
  animes: [],
  progress: [],
  id: '',
  interval: {}
}

const getters = {
  getCurrentStep: state => {
    return state.step
  },
  getFilesList: state => {
    return state.files
  },
  isLoading: state => {
    return state.loading
  },
  hasError: state => {
    return state.error
  },
  getProgressData: state => {
    return state.progress
  }
}

const mutations = {
  creatingVolume (state) {
    state.step = 1
  },
  successfulLoad (state, files) {
    state.step = 2
    files.sort(function(a,b) {
      if (a.type == 'httpd/unix-directory' && b.type != 'httpd/unix-directory') return -1;
      if (a.type != 'httpd/unix-directory' && b.type == 'httpd/unix-directory') return 1;
      return 0;
    })
    state.files = files
    this.commit('setLoading', false)
  },
  setLoading (state, isLoading) {
    if (isLoading) {
      state.animes.forEach(function(e) {
        e.play()
      })
    } else {
      state.animes.forEach(function(e) {
        e.pause()
      })
    }
    state.loading = isLoading
  },
  setError (state, errorOccured) {
    state.error = errorOccured
  },
  addAnimation (state, anime) {
    state.animes.push(anime)
  },
  playAnimations (state) {
    state.animes.forEach(function(e) {
      e.play()
    })
  },
  startUpload (state, dir) {
    state.step = 3
  },
  leftSelect (state) {
    state.step = 4
  },
  leftOverview (state) {
    state.step = 6
  },
  setProgress (state, data) {
    state.progress = data
  },
  setId (state, data) {
    state.id = data
  },
  startInterval (state) {
    let self = this
    state.interval = window.setInterval(function() {
      self.dispatch('updateProgress', state.id)
    }, 1000)
  },
  stopInterval (state) {
    state.step = 5
    window.clearInterval(state.interval)
  }
}

// actions
const actions = {
  load({ commit, state }, payload) {
    let self = this
    self.commit('setLoading', true)
    var id = payload.sessionId
    let url = '/api/v1/store-jhub/files/' + id
    if (payload.dir) url += ('?dir=' + payload.dir)
    axios.get(url)
    .then(function(response) {
      self.commit('successfulLoad', response.data)
    })
    .catch(function(error) {
      if (error.response.status == 403) {
        self.commit('creatingVolume')
        self.dispatch('login', {
          id: id
        })
      } else {
        self.commit('setError', true)
      }
    })
  },
  login ({ commit, state }, payload ) {
    commit('creatingVolume')
    let self = this
    let id = payload.id
    let url = '/api/v1/store-jhub/login/' + payload.id + '?wait=1'
    axios.post(url, null, {
      timeout: 120000
    })
    .then(function(response) {
      self.dispatch('load', {
        sessionId: id
      })
    })
    .catch(function(e) {
      self.$refs.failedLogin.show()
    })
  },
  triggerCopy({ commit, state }, payload ) {
    commit('startUpload')
    commit('setLoading', true)
    commit('setId', payload.sessionId)
    commit('startInterval')
    let url = '/api/v1/store-jhub/copy/' + payload.sessionId
    if(payload.dir) url += ('?dir=' + payload.dir)
    axios.get(url)
    .catch(function(error) {
      console.error(error)
    });
  },
  createDir({ commit, state }, payload ) {
    let self = this
    commit('setLoading', true)
    let url = '/api/v1/store-jhub/createdir/' + payload.sessionId + '/' + payload.dirName
    if(payload.dir) url += ('?dir=' + payload.dir)
    return new Promise(function (resolve, reject) {
      axios.get(url)
      .then(function(response) {
        resolve(response)
        self.dispatch('load', {
          sessionId: payload.sessionId,
          dir: payload.dir
        })
      })
      .catch(function(error) {
        reject(error)
        console.error(error)
      });
    })
  },
  updateProgress({ commit, state }, payload ) {
    let self = this
    axios.get('/api/v1/store-jhub/progress/' + payload)
    .then(function(response) {
      self.commit('setProgress', response.data)
      if (response.data.reduce((a, b) => a && (b.state == 'FINISHED' || b.state == 'ERROR') ,true) == true) {
        self.commit('stopInterval')
        self.commit('setLoading', false)
        //self.stopInterval()
        //self.$refs.finishedStore.show()
      }
    })
    .catch(function(error) {
      self.commit('setLoading', false)
      self.commit('stopInterval')
      //self.errMsg = error.response;
      console.error(error)
      //self.stopInterval()
      //self.$refs.errStore.show()
    });
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
