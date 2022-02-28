<template>
  <div v-if="hasAlreadyOrgalendars">
    Du hast bereits schon Orgalendar. Wähle einen bestehenden oder erstelle einen neuen.
    <v-chip-group
      active-class="primary--text"
      column
      @change="chooseOrgalendar"
    >
      <v-chip
        v-for="tag in existingOrgalendars"
        :key="tag.id"
      >
        {{ tag.name }}
      </v-chip>
    </v-chip-group>
  </div>
</template>

<script>
  export default {
    name: 'ChooseOrgalendar',
    data () {
      return {
        hasAlreadyOrgalendars: false,
        existingOrgalendars: [],
      }
    },
    created () {
      this.existingOrgalendars = this.$store.getters.cache

      if (
        this.existingOrgalendars && // 👈 null and undefined check
        Object.keys(this.existingOrgalendars).length === 0 &&
        Object.getPrototypeOf(this.existingOrgalendars) === Object.prototype
      ) {
        this.hasAlreadyOrgalendars = false
      } else {
        this.hasAlreadyOrgalendars = true
      }
    },
    methods: {
      chooseOrgalendar (item) {
        const chosenOrgalendar = Object.values(this.existingOrgalendars)[item]
        const user = this.$store.getters.user
        if (chosenOrgalendar.id === user.calendarId) {
          // known user -> go directly to orgalendar
          this.$router.push({
            name: 'Calendar',
            params: { slug: chosenOrgalendar.slug },
          })
        } else {
          // unnknow user -> go to choose user page
          this.$router.push({
            name: 'ChooseUser',
            params: { slug: chosenOrgalendar.slug },
          })
          this.$store.dispatch('setUser', {})
        }
        this.$store.dispatch('setCalendar', chosenOrgalendar)
      },
    },
  }
</script>
