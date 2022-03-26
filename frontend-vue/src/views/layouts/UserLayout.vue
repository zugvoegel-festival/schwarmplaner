<template>
  <v-app>
    <home-app-bar :useDrawer="false" iconLink="/user" />
    <home-view :useDrawer="false" />
    <home-footer />
  </v-app>
</template>

<script>
export default {
  name: "UserLayout",
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
    HomeView: () => import("./components/BaseView.vue"),
  },
};
</script>
