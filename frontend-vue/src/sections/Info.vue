<template>
  <v-theme-provider dark>
    <base-section id="info-alt">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="3"
          >
            <base-info />
          </v-col>

          <v-col
            cols="12"
            md="3"
          >
            <base-info-card title="Contact" />

            <base-business-contact />
          </v-col>

          <v-col
            cols="12"
            md="3"
          >
            <info-features />
          </v-col>

          <v-col
            cols="12"
            md="3"
          />
        </v-row>
      </v-container>
    </base-section>
  </v-theme-provider>
</template>

<script>
  export default {
    name: 'SectionBusinessInfo',

    components: {
      InfoFeatures: () => import('@/components/custom/InfoFeatures'),
    },
  }
</script>

<style lang="sass">
#info-alt a
  text-decoration: none
</style>
