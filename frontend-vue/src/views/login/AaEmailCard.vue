<template>
  <div>
    <v-card-text>
      <v-form v-model="validMail">
        <v-text-field
          v-model="email"
          label="Email"
          :rules="emailRules"
          hide-details="auto"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn :disabled="!validMail" @click="next" :loading="loading">Weiter </v-btn>
    </v-card-actions>
  </div>
</template>

<script>

import userService from "@/services/user.service";

export default {
  name: "EmailCard",
  metaInfo: { title: "EmailCard" },
  props: { cardData: { email: "" } },

  data: () => ({
    email: "",
    loading: false,
    validMail: false,
    emailRules: [
      (value) => !!value || "Notwendig",
      (value) => (value || "").length <= 20 || "Max 20 Zeichen",
      (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Ungültige E-mail";
      },
    ],
  }),
  mounted() {
    this.email = this.cardData.email;
  },
  methods: {
    next() {
      // check if known user
      let data = this.cardData;
      data.email = this.email;
      this.loading = true;
      this.$emit("onDataChange", data);
      userService.emailExist(this.email)
        .then((response) => {
          let data = response.data.data;
          this.loading = false;
          if (data.user.found) {
            // if admin -> show adminCard
            if (data.user.role == "admin")
              this.$emit("setCardType", "admin");
            // if user -> show UserCard
            if (data.user.role == "user")
              this.$emit("setCardType", "user");
          } else {
            // if unregistered -> show RegisterCard
            this.$emit("setCardType", "register");
          }
        })
        .catch((e) => {
          this.loading = false;
          this.$log.error(e);
        });
    },
  },
};
</script>

<style></style>
