<template>
  <v-menu
    :value="openDialog"
    :close-on-content-click="false"
    :close-on-click="false"
    :position-x="x"
    :position-y="y"
    absolute
    offset-x
  >
    <v-card
      min-width="350px"
      max-width="500px"
      flat
    >
      <v-card-title> Wiederkehrenden Termin bearbeiten </v-card-title>
      <v-card-text>
        <v-radio-group
          v-model="chosenOption"
          mandatory
        >
          <v-radio
            v-for="n in options"
            :key="n"
            :label="`${n}`"
            :value="n"
          />
        </v-radio-group>
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          @click="closeFail"
        >
          Schließen
        </v-btn>
        <v-spacer />
        <v-btn @click="closeSuccess">
          Ok
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
  export default {
    name: 'AppointmentCard',

    props: {
      openDialog: { type: Boolean, default: false },
      x: { type: Number, default: 0 },
      y: { type: Number, default: 0 },
    },
    data: () => ({
      chosenOption: 0,
      options: ['Diesen Termin', 'Alle Termine'],
    }),
    methods: {
      closeFail: function (event) {
        this.$emit('OnCloseFail', this.chosenOption)
      },
      closeSuccess: function (event) {
        this.success = true
        this.$emit('OnCloseSuccess', this.chosenOption)
      },
    },
  }
</script>
