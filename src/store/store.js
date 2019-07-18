/**
 * Copyright 2019 Nelson Tavares de Sousa, Alvaro Aguilera
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
// just a example state management with vuex

import Vue from 'vue'
import Vuex from 'vuex'

import storeModule from './modules/store'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    collections: storeModule
  }
})
