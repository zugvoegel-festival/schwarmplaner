<template>
  <v-app>
    <home-view />

    <home-footer />
  </v-app>
</template>

<script>
export default {
  name: "LocationViewLayout",

  components: {
    HomeFooter: () => import("./components/Footer"),
    HomeView: () => import("./components/LocationsView"),
  },
};
</script>
