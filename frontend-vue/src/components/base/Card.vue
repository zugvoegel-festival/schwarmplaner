<template>
  <div>
    <v-card
      :height="height"
      :width="width"
      class="mb-4"
      flat
      tile
      v-bind="$attrs"
      v-on="$listeners"
      @click="$emit('click')"
    >
      <slot />
    </v-card>

    <base-title
      v-if="title"
      :title="title"
      class="text-uppercase"
      size="text-subtitle-1"
      space="0"
    />

    <base-subtitle
      v-if="tags"
      :title="tagsCombined"
    />
  </div>
</template>

<script>
  export default {
    name: 'BaseCard',

    inheritAttrs: false,

    props: {
      tags: Array,
      height: [Number, String],
      width: [Number, String],
      subtitle: String,
      title: String,
    },
    computed: {
      tagsCombined () {
        var result = ''
        let index = 0
        this.tags.forEach(element => {
          const text = this.$store.state.categories[element]
          if (text.toLowerCase() !== 'all') {
            const divider = index !== 1 ? ' | ' : ' '
            result += divider + text
          }
          index++
        })
        return result
      },
    },
  }
</script>
