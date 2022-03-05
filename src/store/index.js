import { createStore } from 'vuex'

import tasks from './tasks'
import auth from './auth'
import info from './info'

export default createStore({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  getters: {
    error: s => s.error
  },
  actions: {
  
  },
  modules: {
    tasks,
    auth,
    info
  },
})
