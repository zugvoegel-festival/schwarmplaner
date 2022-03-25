

<template>
  <div>
    <v-card-text>
      <v-text-field v-model="surname" label="Vorname"></v-text-field>
      <v-text-field v-model="lastname" label="Nachname"></v-text-field>
      <v-text-field v-model="email" label="Email"></v-text-field>
      <v-text-field v-model="phone" label="Telefon"></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="back">zurück</v-btn>
      <v-spacer />
      <v-btn @click="next">Registrieren</v-btn>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  name: "RegisterCard",
  metaInfo: { title: "RegisterCard" },
  data: () => ({
    surname: "",
    lastname: "",
    email: "",
    phone: "",
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

