<template>
  <v-app>
    <home-app-bar />

    <home-view />

    <home-footer />
  </v-app>
</template>

<script>
  export default {
    name: 'Start',

    components: {
      HomeAppBar: () => import('./components/AppBar'),
      HomeFooter: () => import('./components/Footer'),
      HomeView: () => import('./components/View'),
    },
  }
</script>
