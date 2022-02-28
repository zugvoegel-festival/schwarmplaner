<template>
  <base-section
    id="features"
    class="secondary"
  >
    <v-responsive
      class="mx-auto"
      max-width="1350"
    >
      <v-container fluid>
        <v-row>
          <v-col
            v-for="(card, i) in cards"
            :key="card.title"
            cols="12"
            sm="12"
            md="12"
            class="py-10"
          >
            <base-feature-card
              v-if="!$vuetify.breakpoint.smAndDown"
              align="center"
              dark
              :icon-size="250"
              :flip="i % 2 === 0 ? true : false"
              v-bind="card"
            />
            <base-info-card
              v-if="$vuetify.breakpoint.smAndDown"
              align="center"
              dark
              :icon-size="250"
              v-bind="card"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-responsive>
  </base-section>
</template>

<script>
  export default {
    name: 'SectionFeatures',

    data: () => ({
      cards: [
        {
          title: 'Kein Papierkram mehr!',
          text: 'Alles digital, immer verfügbar.',
          icon: 'mdi-tree',
          iconColor: 'green',
        },
        {
          icon: 'mdi-share-variant-outline',
          title: 'Teilbare Links',
          text: 'Erspare dir Arbeit und teile Links mit deinen Freunden.',
          iconColor: 'primary',
        },
        {
          icon: 'mdi-currency-eur-off',
          title: 'Umsonst',
          text: 'Verwalte deinen Kalendar mit bis zu 10 Personen vollständig umsonst.',
          iconColor: 'yellow lighten-3',
        },
        {
          icon: 'mdi-earth',
          title: 'Von überall zugreifen!',
          text: 'Funktioniert auf allen Plattformen, auf der gesamten Welt.',
          iconColor: 'blue',
        },
      ],
    }),
  }
</script>
