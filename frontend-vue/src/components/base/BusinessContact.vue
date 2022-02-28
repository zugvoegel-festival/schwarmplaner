<template>
  <v-theme-provider :dark="dark">
    <div>
      <base-info-card
        :title="title"
        color="primary"
      >
        <slot />
      </base-info-card>

      <template v-for="({ icon, text, title: t }, i) in business">
        <base-avatar-card
          :key="i"
          :icon="icon"
          :outlined="false"
          :title="t"
          color="transparent"
          horizontal
          space="0"
        >
          <!-- Do not use v-html for user -->
          <!-- provided values -->
          <div v-html="text" />
        </base-avatar-card>

        <v-divider
          v-if="i + 1 !== business.length"
          :key="`divider-${i}`"
          class="my-2"
        />
      </template>
    </div>
  </v-theme-provider>
</template>

<script>
  export default {
    name: 'BaseBusinessContact',

    props: {
      dark: Boolean,
      title: String,
    },

    data: () => ({
      business: [
        {
          icon: 'mdi-map-marker-outline',
          title: 'Address',
          text: 'LIT labs UG (Haftungsbeschränkt)<br>Siebachstr. 101<br>50733 Köln<br>NRW, Deutschland',
        },
        {
          icon: 'mdi-cellphone',
          title: 'Phone',
          text: '0221 - 204 75 133',
        },
        {
          icon: 'mdi-email',
          title: 'Email',
          text: 'mail@lit-labs.de',
        },
      ],
    }),
  }
</script>
