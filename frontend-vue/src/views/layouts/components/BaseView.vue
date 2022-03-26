<template>
  <v-main>
    <v-navigation-drawer
      v-if="useDrawer"
      absolute
      right
      v-model="showDrawer"
      :permanent="$vuetify.breakpoint.mdAndUp"
    >
      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item to="/admin">
            <v-list-item-title>Übersicht</v-list-item-title>
          </v-list-item>

          <v-list-item to="/shifts">
            <v-list-item-title>Schichten</v-list-item-title>
          </v-list-item>

          <v-list-item to="/helper">
            <v-list-item-title>Helfer</v-list-item-title>
          </v-list-item>

          <v-list-item to="/settings">
            <v-list-item-title>Einstellungen</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block> Logout </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-fade-transition mode="out-in">
      <router-view />
    </v-fade-transition>
  </v-main>
</template>

<script>
export default {
  name: "BaseView",
  props: {
    useDrawer: {
      type: Boolean,
      default: true,
    },
    drawer: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    showDrawer: false,
  }),

  watch: {
    drawer: function (val) {
      this.showDrawer = val;
    },
  },
};
</script>
