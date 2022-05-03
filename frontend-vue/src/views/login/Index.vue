<template>
  <div>
    <EmailCard
      :cardData="cardData"
      v-if="cardType == 'email'"
      v-on:setCardType="setCardType"
      v-on:onDataChange="onDataChange"
    ></EmailCard>
    <PasswordCard
      :cardData="cardData"
      v-if="cardType == 'password'"
      v-on:setCardType="setCardType"
    ></PasswordCard>
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
  </div>
</template>

<script>
import EmailCard from "./AaEmailCard.vue";
import PasswordCard from "./BbPasswordCard.vue";
import RegisterCard from "./BcRegisterCard.vue";
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
    PasswordCard,
    RegisterCard,
    SelectShiftsCard,
  },
};
</script>

<style></style>
