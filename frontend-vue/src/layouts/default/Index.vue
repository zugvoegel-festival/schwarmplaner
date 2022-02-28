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
      HomeAppBar: () => import('./AppBar'),
      HomeFooter: () => import('./Footer'),
      HomeView: () => import('./View'),
    },
  }
</script>
