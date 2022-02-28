<template>
  <div class="mb-8">
    <base-title
      :title="title"
      class="pl-2 text-uppercase"
      size="subtitle-2"
      space="2"
    />

    <v-progress-linear
      :value="value"
      background-color="grey lighten-2"
    />
  </div>
</template>

<script>
  export default {
    name: 'BaseProgress',

    props: {
      title: String,
      value: [Number, String],
    },
  }
</script>
