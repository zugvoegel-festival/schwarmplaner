<template>
  <v-app>
    <home-app-bar v-on:showDrawer="showDrawer" />
    <home-view :drawer="drawer" />
    <home-footer />
  </v-app>
</template>

<script>
export default {
  name: "StartView",
  data: () => ({
    drawer: false,
    drawerPermanent: true,
  }),
  methods: {
    showDrawer(val) {
      this.drawer = val;
    },
  },
  components: {
    HomeAppBar: () => import("./components/AppBar.vue"),
    HomeFooter: () => import("./components/Footer.vue"),
    HomeView: () => import("./components/View.vue"),
  },
};
</script>
