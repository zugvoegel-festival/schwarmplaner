// Vuetify Documentation https://vuetifyjs.com

import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      light: {
        primary: '#4FB1D2',
        primaryVariant: '#3D5A6C',
        secondary: '#95CEBD',
        secondaryVariant: '#84BCA6',
        background: '#2A313B',
        surface: '#72A98F',
        success: '#219653',
        warning: '#F2994A',
        error: '#EB5757',
        onPrimary: '#EFEFEF',
        onSecondary: '#EFEFEF',
        onSurface: '#EFEFEF',
        onSuccess: '#EFEFEF',
        onWarning: '#EFEFEF',
        onError: '#EFEFEF',
      },
      dark: {
        primary: '#4FB1D2',
        primaryVariant: '#3D5A6C',
        secondary: '#95CEBD',
        secondaryVariant: '#84BCA6',
        background: '#2A313B',
        surface: '#72A98F',
        success: '#219653',
        warning: '#F2994A',
        error: '#EB5757',
        onPrimary: '#EFEFEF',
        onSecondary: '#EFEFEF',
        onSurface: '#EFEFEF',
        onSuccess: '#EFEFEF',
        onWarning: '#EFEFEF',
        onError: '#EFEFEF',
      },
    },
  },
})
