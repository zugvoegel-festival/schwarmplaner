<template>
  <div>
    <h1>Page not found</h1>
    <p>the following routes are available</p>

    <div v-for="item in items" v-bind:key="item.name">
      <router-link :to="item.path">
        {{ item.name }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageNotFound",
  metaInfo: { title: "PageNotFound" },
  created() {
    this.$router.options.routes.forEach((route) => {
      this.items.push({
        name: route.name,
        path: route.path,
      });
    });
  },
  data() {
    return { items: [] };
  },
};
</script>

<style></style>
