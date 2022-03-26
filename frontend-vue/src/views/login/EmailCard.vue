<template>
  <div>
    <v-card-text>
      <v-form v-model="validMail">
        <v-text-field
          v-model="mail"
          label="Email"
          :rules="emailRules"
          hide-details="auto"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn :disabled="!validMail" @click="next">Weiter</v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import authService from "@/services/auth.service";
export default {
  name: "EmailCard",
  metaInfo: { title: "EmailCard" },
  data: () => ({
    mail: "",
    validMail: false,
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

  methods: {
    next() {
      // check if known user

      authService
        .emailExist(this.mail)
        .then((response) => {
          console.log(response);
          if (response.data.user.found) {
            // if admin -> show adminCard
            if (response.data.user.role == "admin")
              this.$emit("setCardType", "admin");

            // if user -> show UserCard
            if (response.data.user.role == "user")
              this.$emit("setCardType", "user");
          } else {
            // if unregistered -> show RegisterCard
            this.$emit("setCardType", "register");
          }
        })
        .catch((e) => {
          this.$log.error(e);
        });
    },
  },
};
</script>

<style></style>
