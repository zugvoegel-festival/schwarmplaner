<template>
  <v-row class="pa-10">
    <v-col>
      <v-btn v-if="!$vuetify.breakpoint.mdAndUp" to="/admin"> Zurück</v-btn>
    </v-col>

    <v-col>Helper </v-col>
  </v-row>
</template>

<script>
export default {
  name: "HelperView",
  metaInfo: { title: "Helper" },
};
</script>

<style></style>
