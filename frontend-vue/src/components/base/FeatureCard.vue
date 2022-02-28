<template>
  <v-theme-provider :dark="dark">
    <v-container class="pa-0">
      <v-row
        v-if="flip"
        :justify="justify"
        no-gutters
      >
        <v-col
          v-if="icon"
          :class="`text-${align}`"
          cols="6"
          class="mb-4"
        >
          <base-icon
            :size="iconSize"
            :color="iconColor"
          >
            {{ icon }}
          </base-icon>
        </v-col>

        <v-col
          v-if="title || subtitle"
          cols="6"
          class="my-6"
        >
          <base-subtitle
            v-if="subtitle"
            :title="subtitle"
            space="1"
          />

          <base-title
            size="text-h3"
            :title="title"
            class="text-uppercase"
            space="1"
          />

          <base-body
            v-if="text || $slots.default"
            :text="text"
            space="6"
            size="text-h4"
          >
            <slot />
          </base-body>
        </v-col>
      </v-row>
      <v-row
        v-if="!flip"
        :justify="justify"
        no-gutters
      >
        <v-col
          v-if="title || subtitle"
          cols="6"
        >
          <base-subtitle
            v-if="subtitle"
            :title="subtitle"
            space="1"
          />

          <base-title
            size="text-h3"
            :title="title"
            class="text-uppercase"
            space="1"
          />

          <base-body
            v-if="text || $slots.default"
            :text="text"
            size="text-h4"
            space="6"
          >
            <slot />
          </base-body>
        </v-col>
        <v-col
          v-if="icon"
          :class="`text-${align}`"
          cols="6"
          class="mb-4"
        >
          <base-icon
            :size="iconSize"
            :color="iconColor"
          >
            {{ icon }}
          </base-icon>
        </v-col>
      </v-row>
    </v-container>
  </v-theme-provider>
</template>

<script>
// Mixins
  import Heading from '@/mixins/heading'

  export default {
    name: 'BaseFeatureCard',

    mixins: [Heading],

    props: {
      flip: {
        type: Boolean,
        default: false,
      },
      dark: Boolean,

      color: {
        type: String,
        default: 'primary',
      },
      iconSize: Number,
      iconColor: {
        type: String,
        default: 'primary',
      },
      icon: String,

      subtitle: String,
      text: String,
      title: String,
    },
  }
</script>
