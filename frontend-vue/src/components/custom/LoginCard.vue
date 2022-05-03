<template>

<v-card>
      <v-card-title> Willkommen beim Schwarmplaner </v-card-title>
      <v-card-subtitle>
        <v-img width="250" src="favicon2.svg"></v-img>
      </v-card-subtitle>
      <slot />

       <v-card-actions>
      <v-btn text v-if="showBack" @click="back">{{textBack}} </v-btn>
      <v-spacer />
      <v-btn :disabled="disabledNext" @click="next" :loading="loadingNext">{{textNext}} </v-btn>
    </v-card-actions>
    </v-card>


</template>

<script>
  export default {
    name: 'LoginCard',
    inheritAttrs: false,
    props: {
      showBack: {type: Boolean, default: false},
      textBack: {type: String, default: "Zurück"},
      loadingNext: {type: Boolean, default: false},
      disabledNext: {type: Boolean, default: false},
      textNext: {type: String, default: "Weiter"}
    },
  methods: {
    next() {
       this.$emit("next");
    },
       back() {
       this.$emit("back");
    }
  },
  }
</script>
