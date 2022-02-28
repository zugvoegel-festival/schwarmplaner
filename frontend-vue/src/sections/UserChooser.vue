<template>
  <section id="UserChooser">
    <v-sheet class="px-10 pt-5">
      <v-container>
        <v-row>
          <v-col cols="1">
            Du bist
          </v-col>
          <v-col cols="2">
            <v-select
              v-model="selectedUsername"
              :items="userNames"
              label="Name"
              @change="onPersonChoose"
            >
              <template #append-item>
                <v-list-item>
                  <v-btn
                    icon
                    @click="openDialog"
                  >
                    <v-icon> mdi-plus </v-icon>
                  </v-btn>
                </v-list-item>
              </template>
            </v-select>
          </v-col>
        </v-row>

        <add-user-dialog
          ref="addUserDialogUserBar"
          @addUser="addUser"
        />
      </v-container>
    </v-sheet>
  </section>
</template>

<script>
  import AddUserDialog from '../components/custom/AddUserDialog.vue'
  import UserService from '../services/user.service'
  import CalendarService from '../services/calendar.service'
  export default {
    name: 'UserChooser',

    components: { AddUserDialog },
    data: () => ({
      selectedUsername: '',
      userNames: [],
      users: [],
      valid: false,
    }),
    mounted () {
      const user = this.$store.getters.user
      if (
        user === null ||
        (user && // 👈 null and undefined check
          Object.keys(user).length === 0 &&
          Object.getPrototypeOf(user) === Object.prototype)
      ) {
      } else {
        this.selectedUsername = user.name
      }
      const calendar = this.$store.getters.calendar
      if (
        calendar === null ||
        (calendar && // 👈 null and undefined check
          Object.keys(calendar).length === 0 &&
          Object.getPrototypeOf(calendar) === Object.prototype)
      ) {
        // add current  orgalendar to local storage
        CalendarService.getCalendarBySlug(this.$route.params.slug)
          .then(response => {
            const payload = response.data
            this.$store.dispatch('setCalendar', payload.data)
            this.fetchAllUser()
          })
          .catch(e => {
            this.$log.error(e)
            this.$router.push({
              name: 'Start',
            })
          })
      } else {
        this.fetchAllUser()
      }
    },
    methods: {
      addUser (newUser) {
        this.users.push(newUser)
        this.userNames.push(newUser.name)
      },
      openDialog () {
        this.$refs.addUserDialogUserBar.open(this.$store.getters.calendar.id, this.userNames)
      },
      onPersonChoose (val) {
        const needle = this.users.find(element => element.name === val)
        if (
          needle === null ||
          (needle && // 👈 null and undefined check
            Object.keys(needle).length === 0 &&
            Object.getPrototypeOf(needle) === Object.prototype)
        ) {
        } else {
          this.selectedUsername = needle.name
          this.$store.dispatch('setUser', needle)
        }
      },
      fetchAllUser () {
        const calendar = this.$store.getters.calendar
        UserService.getCalendarUsers(calendar.id)
          .then(response => {
            const payload = response.data
            this.users = []
            payload.data.forEach(element => {
              this.users.push(element)
              this.userNames.push(element.name)
            })
          })
          .catch(e => {
            this.$log.error(e)
            this.$router.push({
              name: 'Start',
            })
          })
      },
    },
  }
</script>
