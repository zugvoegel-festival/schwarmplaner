<template>
  <div>
    <v-card-text>
      <v-form v-model="valid">
        <v-text-field
          :rules="rulesSurname"
          v-model="surname"
          label="Vorname"
        ></v-text-field>
        <v-text-field
          :rules="rulesLastname"
          v-model="lastname"
          label="Nachname"
        ></v-text-field>
        <v-text-field
          :rules="rulesEmail"
          v-model="email"
          label="Email"
        ></v-text-field>
        <v-text-field
          :rules="rulesPhone"
          v-model="phone"
          label="Telefon"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="back" text>zurück</v-btn>
      <v-spacer />
      <v-btn :disabled="!valid" @click="next">Weiter</v-btn>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  name: "RegisterCard",
  metaInfo: { title: "RegisterCard" },
  data: () => ({
    valid: false,
    surname: "",
    lastname: "",
    email: "",
    phone: "",
    rulesSurname: [(value) => !!value || "Notwendig"],
    rulesEmail: [(value) => !!value || "Notwendig"],
    rulesLastname: [(value) => !!value || "Notwendig"],
    rulesPhone: [
      (value) => !!value || "Notwendig",
      (value) => {
        const pattern = /^[0-9]$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    ],
  }),

  methods: {
    next() {
      //success
      //to next card
      this.$emit("setCardType", "shifts");
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
