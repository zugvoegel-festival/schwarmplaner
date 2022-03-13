<template>
  <div>
    <v-app-bar
      id="home-app-bar"
      app
      elevation="1"
      elevate-on-scroll
      height="80"
      color="secondary"
    >
      <base-img
        :src="require(`@/assets/zvlog.svg`)"
        class="mr-3 hidden-xs-only filter-accent2"
        contain
        max-width="46"
        width="100%"
        @click="toStart"
      />
      <base-heading title="SCHWARMPLANER" />
      <v-spacer />
    </v-app-bar>
  </div>
</template>

<script>
  export default {
    name: 'HomeAppBar',
    data: () => ({
      drawer: null,
      switch1: false,
    }),
    computed: {
      loggedIn () {
        return this.$store.state.auth.status.loggedIn
      },
      isNotHome () {
        return this.$route.name !== 'Start'
      },
      showLogoutBtn () {
        return this.loggedIn && this.isNotHome
      },
    },
    methods: {
      toStart () {
        const path = '/'
        if (this.$route.path !== path) this.$router.push(path)
      },

      logout () {
        this.$store.dispatch('auth/logout')
        this.$router.go()
      },
    },
  }
</script>

<style scoped>
.filter-accent2 {
  filter: invert(10%) sepia(98%) saturate(7351%) hue-rotate(294deg) brightness(71%) contrast(106%);
}
</style>
