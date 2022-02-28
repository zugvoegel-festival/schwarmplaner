<template>
  <base-section id="new">
    <v-container>
      <v-card class="pa-6">
        <v-card-title>Erstelle deinen eigenen Orgalendar</v-card-title>
        <v-card-subtitle>
          Teile ihn mit deinen Freunden. Verteile Aufgaben, plane deine nächste Veranstaltung
        </v-card-subtitle>
        <v-card-text>
          <v-form v-model="valid">
            <v-row>
              <v-text-field
                v-model="schwarmvogelName"
                :rules="schwarmvogelNameRules"
                :counter="10"
                label="Gib deinem Orgalendar einen Namen"
                required
              />
            </v-row>
            <add-user
              ref="user"
              @OnValid="onValid"
            />
            <v-form />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            :disabled="!valid"
            @click="createCalendar"
          >
            Erstellen
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </base-section>
</template>

<script>
  import AddUser from '../components/custom/AddUser.vue'
  import CalendarService from '../services/calendar.service'

  export default {
    name: 'New',
    components: { AddUser },
    data () {
      return {
        valid: false,
        schwarmvogelName: '',
        schwarmvogelNameRules: [
          v => !!v || 'Dein Orgalendar braucht einen Namen!',
          v => v.length <= 10 || 'Der Name sollte nicht mehr als 10 Buchstaben haben!',
        ],
      }
    },
    mounted () {
      const self = this
      window.addEventListener('keypress', function (e) {
        if (e.key === 'Enter' && self.valid === true) {
          self.createCalendar()
        }
      })
    },
    methods: {
      onValid (valid, email, name) {
        this.valid = valid
        this.name = name
        this.email = email
      },
      createCalendar () {
        var data = {
          schwarmvogelName: this.schwarmvogelName,
          username: this.name,
          email: this.email,
        }
        CalendarService.create(data)
          .then(response => {
            const payload = response.data.data
            this.$store.dispatch('setCalendar', payload.calendar)
            this.$store.dispatch('setUser', payload.user)

            this.$router.push({
              name: 'Calendar',
              params: { slug: payload.calendar.slug },
            })
          })
          .catch(e => {
            this.$log.error(e)
          })
      },
    },
  }
</script>
