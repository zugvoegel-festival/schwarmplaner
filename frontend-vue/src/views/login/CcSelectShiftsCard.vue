<template>
  <v-app>
    <LoginCard
      :showBack="false"
      :disabledNext="!selected.length"
      v-on:next="next"
      :loadingNext="loading"
      :textNext="Registrieren"
    >
      <v-card-text>
        <v-row align="center" justify="start"> Wo möchtest du Helfen? </v-row>
        <v-row align="center" justify="start">
          <v-col
            v-for="(selection, i) in selections"
            :key="selection.text"
            class="shrink"
          >
            <v-chip
              :disabled="loading"
              close
              @click:close="selected.splice(i, 1)"
            >
              <v-icon left v-text="selection.icon"></v-icon>
              {{ selection.text }}
            </v-chip>
          </v-col>
        </v-row>
        <v-row>
          <v-list>
            <template v-for="item in categories">
              <v-list-item
                v-if="!selected.includes(item)"
                :key="item.text"
                :disabled="loading"
                @click="selected.push(item)"
              >
                <v-list-item-avatar>
                  <v-icon :disabled="loading" v-text="item.icon"></v-icon>
                </v-list-item-avatar>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item>
            </template>
          </v-list>
        </v-row>
        <v-row align="center" justify="start"
          >Wie lange möchtest du Helfen?
        </v-row>
        <v-row align="center" justify="start"
          >2 Stunden für Freedrinks , 8 Stunden für ein kostenloses Ticket
        </v-row>

        <v-row>
          <v-slider
            :label="sliderLabel"
            v-model="sliderShiftHours"
            step="2"
            min="2"
            max="10"
            ticks="always"
            tick-size="2"
          ></v-slider>
        </v-row>
        <v-row align="center" justify="start">{{ sliderHint }}</v-row>
      </v-card-text>
    </LoginCard>
  </v-app>
</template>

<script>
import LoginCard from "@/components/custom/LoginCard.vue";

import userService from "@/services/user.service";

export default {
  name: "SelectShiftsCard",
  metaInfo: { title: "SelectShiftsCard" },
  props: {
    cardData: {},
  },
  components: { LoginCard },
  data: () => ({
    sliderShiftHours: 2,
    sliderHints: ["Wow, du bist super!", "famos", "weiter so!!!", "<3"],
    sliderHint: "",
    shiftTypes: [
      {
        text: "Bar",
        icon: "mdi-nature",
      },
      {
        text: "Einlass",
        icon: "mdi-glass-wine",
      },
      {
        text: "Müll",
        icon: "mdi-calendar-range",
      },
      {
        text: "Crew-Küche",
        icon: "mdi-map-marker",
      },
    ],
    loading: false,
    search: "",
    selected: [],
  }),
  computed: {
    sliderLabel() {
      return this.sliderShiftHours + " Stunden";
    },
    allSelected() {
      return this.selected.length === this.shiftTypes.length;
    },
    categories() {
      const search = this.search.toLowerCase();

      if (!search) return this.shiftTypes;

      return this.shiftTypes.filter((item) => {
        const text = item.text.toLowerCase();

        return text.indexOf(search) > -1;
      });
    },
    selections() {
      const selections = [];

      for (const selection of this.selected) {
        selections.push(selection);
      }

      return selections;
    },
  },

  watch: {
    sliderShiftHours() {
      this.sliderHint = this.randomSliderhint();
    },
    selected() {
      this.search = "";
    },
  },

  methods: {
    randomSliderhint() {
      return this.sliderHints[
        Math.floor(Math.random() * (this.sliderHints.length - 1))
      ];
    },

    next() {
      //success
      //to Dashboard
      this.loading = true;
      let data = this.cardData;

      userService
        .createUser(data)
        .then((response) => {
          console.log(response);
          this.loading = false;
        })
        .catch((e) => {
          this.loading = false;
          this.$log.error(e);
        });

      this.$router.push("user");

      //fail
      // showerror message and do nothing
    },
    back() {
      this.$emit("setCardType", "register");
    },
  },
};
</script>

<style></style>
