<template>
  <v-form v-model="valid">
    <v-row>
      <v-text-field
        v-model="name"
        :rules="nameRules"
        :counter="10"
        label="Name"
        required
        @input="validUserName"
      />
    </v-row>
    <v-row>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      />
    </v-row>
  </v-form>
</template>

<script>
  export default {
    name: 'AddUser',
    props: {
      takenNames: {
        type: Array,
        default: function () {
          return ['']
        },
      },
    },
    data () {
      return {
        valid: false,
        name: '',
        nameAvailable: true,
        nameRules: [
          v => !!v || 'Du brauchst einen Namen!',
          v => v.length <= 10 || 'Dein Name sollte nicht mehr als 10 Buchstaben haben!',
          v => this.nameAvailable || 'Dieser Name ist bereits vergeben! Wähle doch bitte einen anderen.',
        ],
        email: '',
        emailRules: [v => !!v || 'E-mail is required', v => /.+@.+/.test(v) || 'E-mail must be valid'],
      }
    },
    watch: {
      valid: function (val) {
        this.$emit('OnValid', val, this.email, this.name)
      },
    },
    methods: {
      validUserName (name) {
        const foundName = this.takenNames.filter(function (entry) {
          return entry === name
        })
        this.nameAvailable = foundName.length === 0
      },
    },
  }
</script>
