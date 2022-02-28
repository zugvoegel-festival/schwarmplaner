<template>
  <v-fade-transition mode="out-in">
    <router-view />
  </v-fade-transition>
</template>

<script>
  import ConfigService from './services/config.service'

  export default {
    name: 'App',
    beforeCreate () {
      ConfigService.loadConfig()
    },
  }
</script>
