// Vuetify Documentation https://vuetifyjs.com

import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      light: {
        font: '#000000',
        primary: '#009688',
        secondary: '#e91e63',
        background: '#e4e4e4',
        accent: '#8bc34a',
        accent2: '#880096',
        error: '#f44336',
        warning: '#ff9800',
        info: '#3f51b5',
        success: '#4caf50',
      },
      dark: {
        font: '#000000',
        primary: '#009688',
        secondary: '#e91e63',
        background: '#e4e4e4',
        accent: '#0e9600',
        accent2: '#880096',
        error: '#f44336',
        warning: '#ff9800',
        info: '#3f51b5',
        success: '#4caf50',
      },
    },
  },
})
