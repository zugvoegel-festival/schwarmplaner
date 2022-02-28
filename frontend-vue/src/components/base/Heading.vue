<template>
  <component
    :is="tag"
    :class="classes"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-if="title">
      {{ title }}
    </template>

    <slot v-else />
  </component>
</template>

<script>
  export default {
    name: 'BaseHeading',

    inject: {
      theme: {
        default: () => ({ isDark: false }),
      },
      heading: {
        default: () => ({ align: 'left' }),
      },
    },

    provide () {
      return {
        heading: {
          align: this.align,
        },
      }
    },

    props: {
      align: {
        type: String,
        default () {
          return this.heading.align
        },
      },
      dense: {
        type: Boolean,
        default () {
          return this.isDense
        },
      },
      size: {
        type: String,
        default: 'text-h3',
      },
      space: {
        type: [Number, String],
        default: 4,
      },
      mobileSize: {
        type: String,
        default: 'text-h8',
      },
      mobileBreakpoint: {
        type: [Number, String],
        default: 768,
      },
      tag: {
        type: String,
        default: 'h1',
      },
      title: String,
      weight: {
        type: String,
        default: 'black',
      },
      color: {
        type: String,
        default: 'white',
      },
    },

    computed: {
      classes () {
        const classes = [
          this.fontSize,
          `font-weight-${this.weight}`,
          `mb-${this.space}`,
          `text-${this.align}`,
          `${this.color}--text`,
        ]

        return classes
      },

      fontSize () {
        return this.$vuetify.breakpoint.width >= this.mobileBreakpoint ? this.size : this.mobileSize
      },
    },
  }
</script>
