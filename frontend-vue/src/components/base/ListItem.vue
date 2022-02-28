<template>
  <div class="d-flex align-center">
    <v-icon
      v-if="icon"
      :color="color"
      class="mr-3"
      size="28"
      v-text="icon"
    >
      {{ icon }}
    </v-icon>

    <div
      v-if="text"
      class="text-subtitle-1"
      v-text="text"
    />
  </div>
</template>

<script>
  export default {
    name: 'BaseListItem',

    props: {
      color: {
        type: String,
        default: 'primary',
      },
      icon: {
        type: String,
        default: 'mdi-check-circle-outline',
      },
      text: String,
    },
  }
</script>
