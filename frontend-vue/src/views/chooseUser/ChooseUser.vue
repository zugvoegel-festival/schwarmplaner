<template>
  <v-container>
    <div class="text-center">
      <v-chip-group
        active-class="primary--text"
        column
        @change="chooseUser"
      >
        <v-chip
          v-for="tag in users"
          :key="tag"
        >
          {{ tag.name }}
        </v-chip>

        <v-chip
          color="red"
          @click="newUser"
        >
          <v-icon left>
            mdi-plus
          </v-icon>

          Neuer Nutzer
        </v-chip>
      </v-chip-group>
      <add-user-dialog
        ref="addUserDialog"
        :taken-names="users"
        :calendar-i-d="calendarId"
        @addUser="addUser"
      />
    </div>
    Nutzer: Nicht dabei? Nutzer erstellen
  </v-container>
</template>

<script>
  import AddUserDialog from '../../components/custom/AddUserDialog.vue'
  import UserService from '../../services/user.service'
  import CalendarService from '../../services/calendar.service'

  export default {
    name: 'Choose',
    components: { AddUserDialog },

    props: {},
    data: () => ({
      selectedUser: '',
      users: [],

      calendarId: 0,
    }),
    created () {
      // add current  schwarmvogel to local storage
      CalendarService.getCalendarBySlug(this.$route.params.slug)
        .then(response => {
          const payload = response.data
          this.$store.dispatch('setCalendar', payload.data)
          this.fetchCalendarUsers()
        })
        .catch(e => {
          this.$log.error(e)
          this.$router.push({
            name: 'Start',
          })
        })
    },
    methods: {
      fetchCalendarUsers () {
        UserService.getCalendarUsers(this.$store.getters.calendar.id)
          .then(response => {
            const payload = response.data
            this.users = []
            payload.data.forEach(element => {
              this.users.push(element)
            })
          })
          .catch(e => {
            this.$log.error(e)
            this.$router.push({
              name: 'Start',
            })
          })
      },
      chooseUser (val) {
        if (val === 0 || !val) return
        const value = Math.min(Math.max(val, 1), this.users.length)
        this.$store.dispatch('setUser', this.users[value - 1])
        this.$router.push({
          name: 'Calendar',
          params: { slug: this.$route.params.slug },
        })
      },
      newUser (val) {
        this.$refs.addUserDialog.open()
        this.selectedUser = -1
      },
      addUser (newUser) {
        this.users.push(newUser)
      },
    },
  }
</script>
