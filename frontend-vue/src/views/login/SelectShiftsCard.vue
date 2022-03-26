<template>
  <div>
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
        <v-app>
          <v-slider
            :label="sliderLabel"
            v-model="sliderShiftHours"
            step="2"
            min="2"
            max="10"
            ticks="always"
            tick-size="2"
          ></v-slider>
        </v-app>
      </v-row>
      <v-row align="center" justify="start">{{ sliderHint }}</v-row>
    </v-card-text>

    <v-card-actions>
      <v-btn @click="back" text>zurück</v-btn>
      <v-spacer />
      <v-btn @click="next" :disabled="!selected.length" :loading="loading"
        >Registrieren</v-btn
      >
    </v-card-actions>
  </div>
</template>

<script>
export default {
  name: "SelectShiftsCard",
  metaInfo: { title: "SelectShiftsCard" },
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

      setTimeout(() => {
        this.search = "";
        this.selected = [];
        this.loading = false;
      }, 2000);

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
