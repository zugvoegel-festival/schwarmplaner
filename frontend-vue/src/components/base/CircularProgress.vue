<template>
  <div class="d-inline-block mx-auto">
    <v-progress-circular
      :value="value"
      class="mb-4"
      color="primary"
      rotate="-90"
      size="88"
      width="4"
    >
      <span class="text-h6 font-weight-bold">
        <span
          class="text--primary"
          v-text="value"
        />
        <span class="accent--text text--lighten-4 font-weight-thin">%</span>
      </span>
    </v-progress-circular>

    <base-subtitle
      :title="title"
      align="center"
      class="font-weight-bold text--primary"
    />
  </div>
</template>

<script>
  export default {
    name: 'BaseCircularProgress',

    inheritAttrs: false,

    props: {
      title: String,
      value: [Number, String],
    },
  }
</script>
