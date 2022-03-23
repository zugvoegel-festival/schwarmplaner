import Vue from 'vue'
import axios from 'axios'
import * as vueConfig from '../../vue.config'

import store from '../store/index'
class ConfigService {
  async loadConfig () {
    return axios
      .get(`${vueConfig.publicPath}static/config.json`)
      .then(response => {
        store.dispatch('setConfig', response.data)
        Vue.$log.debug(response.data)
      })
      .catch(e => {
        Vue.$log.error(e)
      })
  }

  set (key, value) {
    store.state.config[key] = value
  }

  get (key) {
    return window.App.$store.getters.config[key]
  }

  getApiUrl () {
    if (this.get('apiUrl')) {
      return this.get('apiUrl')
    }
    console.log('NO API URL IN CONFIG')

    return 'http://'
  }
}

export default new ConfigService()
