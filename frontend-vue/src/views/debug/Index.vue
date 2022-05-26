<template>
  <div>
    Debug View
    <UserTable :tableData="localData"></UserTable>
  </div>
</template>

<script>
import UserTable from "@/components/custom/UserTable.vue";
import userService from "@/services/user.service";
export default {
  components: { UserTable },
  data: () => ({
    localData: {},
  }),
  mounted() {
    userService
      .getUsers()
      .then((response) => {
        this.$log.debug(response);
        this.localData = response;
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
