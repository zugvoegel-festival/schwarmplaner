<template>
  <LoginCard
    :disabledNext="!valid"
    :showBack="true"
    v-on:next="next"
    v-on:back="back"
    textNext="Registrieren"
    :loadingNext="loading"
  >
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
  </LoginCard>
</template>

<script>
import LoginCard from "@/components/custom/LoginCard.vue";
import userService from "@/services/user.service";
import { types } from "@/helpers/types";
import { roles } from "@/helpers/roles";

export default {
  name: "RegisterCard",
  metaInfo: { title: "RegisterCard" },
  props: {
    cardData: {},
  },
  components: { LoginCard },
  data: () => ({
    loading: false,
    valid: false,
    surname: "",
    lastname: "",
    email: "",
    phone: "",
    rulesSurname: [(value) => !!value || "Notwendig"],
    rulesEmail: [(value) => !!value || "Notwendig"],
    rulesLastname: [(value) => !!value || "Notwendig"],
    rulesPhone: [(value) => !!value || "Notwendig"],
  }),
  mounted() {
    this.email = this.cardData.email;
  },

  methods: {
    next() {
      //success
      //to next card
      let data = this.cardData;
      data.email = this.email;
      data.surname = this.surname;
      data.lastname = this.lastname;
      data.phone = this.phone;
      data.role = roles.guest;
      data.type = types.user;
      this.$emit("onDataChange", data);
      this.loading = true;
      userService
        .createUser(data)
        .then((response) => {
          console.log(response);
          this.loading = false;
          this.$emit("setCardType", "shifts");
        })
        .catch((e) => {
          this.loading = false;
          this.$log.error(e);
        });

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
