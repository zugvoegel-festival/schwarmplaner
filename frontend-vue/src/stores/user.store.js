import { defineStore } from "pinia";

export const userStore = defineStore("user", {
  state: () => {
    return { email: 0 };
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    setEmail(email) {
      this.email = email;
    },
  },
});
