<template>
  <section id="hero">
    <v-sheet
      :min-height="minHeight"
      height="50px"
      color="accent"
    >
      <v-container class="fill-height px-4 py-12">
        <v-responsive
          class="d-flex align-center mx-auto"
          height="100%"
          max-width="700"
          width="100%"
        >
          <base-subheading
            weight="regular"
            title="Organisiere Termine mit deinen Freunden"
          />

          <base-heading
            size="text-h2"
            title="Willkommen beim Orgalendar"
            weight="medium"
          />

          <base-body />

          <div
            :class="$vuetify.breakpoint.smAndDown ? 'flex-column align-start' : 'align-center'"
            class="d-flex flex-wrap"
          >
            <base-btn>Mehr Infos</base-btn>

            <span class="font-weight-bold ml-6 mr-4 my-4">oder</span>

            <base-btn
              :ripple="false"
              class="pa-1"
              height="auto"
              text
              to="/new"
            >
              Erstelle deinen Eigenen
            </base-btn>
          </div>
          <choose-orgalendar class="pt-6" />
        </v-responsive>
      </v-container>
    </v-sheet>
  </section>
</template>

<script>
  import ChooseOrgalendar from '../components/custom/ChooseOrgalendar.vue'
  export default {
    name: 'SectionHero',
    components: { ChooseOrgalendar },
    provide: {
      theme: { isDark: true },
    },

    computed: {
      minHeight () {
        const height = this.$vuetify.breakpoint.mdAndUp ? '70vh' : '80vh'

        return `calc(${height} - ${this.$vuetify.application.top}px)`
      },
    },
  }
</script>
