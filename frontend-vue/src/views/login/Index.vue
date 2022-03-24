<template>
  <div>
    <v-card>
      <v-card-title> Willkommen beim Schwarmplaner </v-card-title>
      <v-card-subtitle>
        <v-img width="250" src="favicon2.svg"></v-img>
      </v-card-subtitle>
      <v-card-text>
        <v-text-field
          label="Email"
          :rules="emailRules"
          hide-details="auto"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn :disabled="valid" @click="next">Weiter</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  metaInfo: { title: "Login" },
  data: () => ({
    test: "",
    emailRules: [
      (value) => !!value || "Required.",
      (value) => (value || "").length <= 20 || "Max 20 characters",
      (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    ],
  }),
  computed: {
    valid: function () {
      return this.emailRules[3];
    },
  },

  methods: {
    next() {
      this.test = "asd";
      console.log("sd");
    },
  },
};
</script>

<style></style>
