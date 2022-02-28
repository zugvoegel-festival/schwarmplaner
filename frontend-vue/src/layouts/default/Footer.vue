<template>
  <v-footer
    id="home-footer"
    color="black"
    dark
    min-height="72"
    absolute
  >
    <v-container>
      <v-row>
        <v-col
          class="text-center text-md-right"
          cols="8"
          md="6"
        >
          Copyright &copy; 2021 LIT labs UG (Haftungsbeschränkt)
        </v-col>
        <v-col
          class="text-center text-md-right"
          cols="4"
          md="6"
        />
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
  export default {
    name: 'HomeFooter',

    data: () => ({
      social: [],
    }),
  }
</script>

<style lang="sass">
#home-footer a
  text-decoration: none
</style>
