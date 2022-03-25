
<template>
  <div>
    <v-card-text>
      <v-text-field v-model="surname" label="Vorname"></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="back">zurück</v-btn>
      <v-spacer />
      <v-btn @click="next">Weiter</v-btn>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  name: "UserCard",
  metaInfo: { title: "UserCard" },
  data: () => ({
    surname: "",
    rules: {
      required: (value) => !!value || "Notwendig",
    },
  }),

  methods: {
    next() {
      //success
      //to Dashboard
      this.$router.push("userDashboard");
      //fail
      // show error message and do nothing
    },
    back() {
      this.$emit("setCardType", "email");
    },
  },
};
</script>

<style></style>

