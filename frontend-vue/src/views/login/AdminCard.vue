<template>
  <div>
    <v-card-text>
      <v-text-field
        v-model="password"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="Passwort"
        counter
        @click:append="show1 = !show1"
      ></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="back">zurück</v-btn>
      <v-spacer />
      <v-btn @click="next">Login</v-btn>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  name: "AdminCard",
  metaInfo: { title: "AdminCard" },
  data: () => ({
    show1: false,
    password: "",
    rules: {
      required: (value) => !!value || "Notwendig",
      correct: () => `The email and password you entered don't match`,
    },
  }),

  methods: {
    next() {
      //success
      //to Dashboard
      this.$router.push("admin");
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
