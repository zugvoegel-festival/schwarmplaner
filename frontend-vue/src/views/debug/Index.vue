<template>
  <div>
    Debug View
    <UserTable></UserTable>
  </div>
</template>

<script>
import UserTable from "@/components/custom/UserTable.vue";
import userService from "@/services/user.service";
export default {
  components: { UserTable },
  mounted() {
    userService
      .getUsers()
      .then((response) => {
        this.$log.debug(response);
      })
      .catch((e) => {
        this.$log.error(e);
      });
  },
  name: "DebugView",
  metaInfo: { title: "Debug" },
};
</script>

<style></style>
