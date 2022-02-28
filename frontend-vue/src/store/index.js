import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from './auth.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
  },
  state: {
    config: {},
    user: {},
    calendar: {},
    cache: {},
  },
  getters: {
    config (state) {
      return state.config
    },
    cache (state) {
      if (
        state.cache === null ||
        (state.cache && // 👈 null and undefined check
          Object.keys(state.cache).length === 0 &&
          Object.getPrototypeOf(state.cache) === Object.prototype)
      ) {
        // store object is empty. check localstorage
        state.cache = JSON.parse(localStorage.getItem('orgalendarCache'))
        if (state.cache === null) {
          state.cache = {}
        }
      }
      return state.cache
    },
    user (state) {
      if (
        state.user === null ||
        (state.user && // 👈 null and undefined check
          Object.keys(state.user).length === 0 &&
          Object.getPrototypeOf(state.user) === Object.prototype)
      ) {
        // store object is empty. check localstorage

        state.user = JSON.parse(localStorage.getItem('orgalendarUser'))
        if (state.user === null) {
          state.user = {}
        }
      }
      return state.user
    },
    calendar (state) {
      if (
        state.calendar === null ||
        (state.calendar && // 👈 null and undefined check
          Object.keys(state.calendar).length === 0 &&
          Object.getPrototypeOf(state.calendar) === Object.prototype)
      ) {
        // store object is empty. check localstorage
        state.calendar = JSON.parse(localStorage.getItem('orgalendarCalendar'))
        if (state.calendar === null) {
          state.calendar = {}
        }
      }
      return state.calendar
    },
  },
  mutations: {
    SET_CONFIG: (state, data) => {
      state.config = data
    },
    SET_USER: (state, data) => {
      localStorage.setItem('orgalendarUser', JSON.stringify(data))
      state.user = data
    },
    SET_CALENDAR: (state, data) => {
      localStorage.setItem('orgalendarCalendar', JSON.stringify(data))
      state.calendar = data
    },
    ADD_TO_CACHE: (state, data) => {
      let cache = JSON.parse(localStorage.getItem('orgalendarCache'))
      if (cache === null) {
        // cache empty . create new
        cache = {}
      }
      cache[data.id] = data
      localStorage.setItem('orgalendarCache', JSON.stringify(cache))
      state.cache = cache
    },
  },
  actions: {
    setConfig: ({ commit, state }, value) => {
      commit('SET_CONFIG', value)
      return state.config
    },
    setUser: ({ commit, state }, value) => {
      commit('SET_USER', value)
      return state.user
    },
    setCalendar: ({ commit, state }, value) => {
      commit('SET_CALENDAR', value)
      commit('ADD_TO_CACHE', value)
      return state.calendar
    },
  },
})
