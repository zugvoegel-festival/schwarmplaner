<template>
  <div>
    <v-card>
      <v-card-title> Willkommen beim Schwarmplaner </v-card-title>
      <v-card-subtitle>
        <v-img width="250" src="favicon2.svg"></v-img>
      </v-card-subtitle>
      <EmailCard
        :cardData="cardData"
        v-if="cardType == 'email'"
        v-on:setCardType="setCardType"
        v-on:onDataChange="onDataChange"
      ></EmailCard>
      <AdminCard
        :cardData="cardData"
        v-if="cardType == 'admin'"
        v-on:setCardType="setCardType"
      ></AdminCard>
      <UserCard
        :cardData="cardData"
        v-if="cardType == 'user'"
        v-on:setCardType="setCardType"
        v-on:onDataChange="onDataChange"
      ></UserCard>
      <RegisterCard
        :cardData="cardData"
        v-if="cardType == 'register'"
        v-on:setCardType="setCardType"
        v-on:onDataChange="onDataChange"
      ></RegisterCard>
      <SelectShiftsCard
        :cardData="cardData"
        v-if="cardType == 'shifts'"
        v-on:setCardType="setCardType"
        v-on:onDataChange="onDataChange"
      ></SelectShiftsCard>
    </v-card>
  </div>
</template>

<script>
import EmailCard from "./AaEmailCard.vue";
import AdminCard from "./BbAdminCard.vue";
import UserCard from "./BbUserCard.vue";
import RegisterCard from "./BbRegisterCard.vue";
import SelectShiftsCard from "./CcSelectShiftsCard.vue";

export default {
  name: "LoginView",
  metaInfo: { title: "Login" },
  data: () => ({
    cardType: "email",
    cardData: { email: "", surname: "", lastname: "", phone: "" },
  }),
  methods: {
    setCardType(type) {
      this.cardType = type;
    },
    onDataChange(newData) {
      console.log("onChange", newData);
      this.cardData = newData;
    },
  },
  components: {
    EmailCard,
    AdminCard,
    UserCard,
    RegisterCard,
    SelectShiftsCard,
  },
};
</script>

<style></style>
