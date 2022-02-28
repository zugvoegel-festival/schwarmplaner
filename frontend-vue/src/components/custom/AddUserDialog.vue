<template>
  <v-dialog
    v-model="openDialog"
    width="500"
  >
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Nutzer Erstellen
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row
            v-for="dialogIndex in numberAddUserDialog"
            :key="dialogIndex"
          >
            <add-user
              :ref="'addUser' + dialogIndex"
              :taken-names="takenNames"
              @OnValid="onValid"
            />
            <v-divider />
          </v-row>
          <v-row>
            <v-btn
              icon
              @click="numberAddUserDialog++"
            >
              <v-icon> mdi-plus </v-icon>
            </v-btn>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-btn
          text
          @click="closeAddUserDialogFail"
        >
          Abrechen
        </v-btn>
        <v-spacer />
        <v-btn
          :disabled="!valid"
          @click="closeAddUserDialogSuccess"
        >
          Hinzufügen
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import UserService from '../../services/user.service'

  import AddUser from './AddUser.vue'
  export default {
    name: 'AddUserDialog',
    components: { AddUser },
    data () {
      return {
        openDialog: false,
        valid: false,
        numberAddUserDialog: 1,
        calendarId: 0,
        takenNames: [],
      }
    },

    methods: {
      closeAddUserDialogSuccess () {
        this.openDialog = false
        for (let i = 1; i < this.numberAddUserDialog + 1; i++) {
          this.createUser(this.$refs['addUser' + i][0]._data.name, this.$refs['addUser' + i][0]._data.email)
          this.$refs['addUser' + i][0]._data.name = ''
          this.$refs['addUser' + i][0]._data.email = ''
        }
      },
      createUser (name, email) {
        if (!this.valid) return

        const data = {
          calendarId: this.calendarId,
          name: name,
          email: email,
        }
        UserService.createUser(data)
          .then(response => {
            const payload = response.data
            this.$log.debug(payload)
            this.$emit('addUser', payload.data)
          })
          .catch(e => {
            this.$log.error(e)
          })
      },
      closeAddUserDialogFail () {
        this.openDialog = false
      },
      onValid (valid) {
        this.valid = valid
      },
      open (calendarId, takenNames) {
        this.calendarId = calendarId
        this.takenNames = takenNames
        this.openDialog = true
        this.numberAddUserDialog = 1
      },
    },
  }
</script>
