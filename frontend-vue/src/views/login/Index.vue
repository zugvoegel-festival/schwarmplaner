<template>
  <div>
    <v-card>
      <v-card-title> Willkommen beim Schwarmplaner </v-card-title>
      <v-card-subtitle>
        <v-img width="250" src="favicon2.svg"></v-img>
      </v-card-subtitle>
      <EmailCard
        v-if="cardType == 'email'"
        v-on:setCardType="setCardType"
      ></EmailCard>
      <AdminCard
        v-if="cardType == 'admin'"
        v-on:setCardType="setCardType"
      ></AdminCard>
      <UserCard
        v-if="cardType == 'user'"
        v-on:setCardType="setCardType"
      ></UserCard>
      <RegisterCard
        v-if="cardType == 'register'"
        v-on:setCardType="setCardType"
      ></RegisterCard>
    </v-card>
  </div>
</template>

<script>
import EmailCard from "./EmailCard.vue";
import AdminCard from "./AdminCard.vue";
import UserCard from "./UserCard.vue";
import RegisterCard from "./RegisterCard.vue";

export default {
  name: "LoginView",
  metaInfo: { title: "Login" },
  data: () => ({
    cardType: "register",
  }),
  methods: {
    setCardType(type) {
      this.cardType = type;
    },
  },
  components: { EmailCard, AdminCard, UserCard, RegisterCard },
};
</script>

<style></style>
