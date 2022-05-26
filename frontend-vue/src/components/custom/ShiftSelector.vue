<template>
  <div data-app>
    <h1>ShiftSelector</h1>
    <v-container fluid>
      <v-row>
        <v-col cols="6">
          <v-combobox
            v-model="jobSelection"
            :items="jobs"
            label="Wo willst du arbeiten?"
          >
            <template v-slot:selection="{ item }">
              <span class="pr-2">
                {{ item.name }}
              </span>
            </template>
            <template v-slot:item="{ item }"> {{ item.name }} </template>
          </v-combobox>
        </v-col>
        <v-col cols="6">
          <v-combobox
            v-model="dateSelection"
            :items="dates"
            label="Wann willst du arbeiten?"
          >
            <template v-slot:selection="{ item }">
              <span class="pr-2">
                {{ item }}
              </span>
            </template>
            <template v-slot:item="{ item }"> {{ item }} </template>
          </v-combobox>
        </v-col>
      </v-row>
      <v-row>
        {{ shifts }}
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "ShiftSelector",
  inheritAttrs: false,
  props: {
    jobs: { type: Array, required: true },
    shifts: { type: Array, required: true },
    dates: { type: Array, required: true },
  },
  data() {
    return { jobSelection: [], dateSelection: [] };
  },
  watch: {
    jobSelection: function (newVal) {
      this.$log.debug(newVal);
      this.$emit("onJobSelected", newVal.id);
    },
    dateSelection: function (newVal) {
      this.$log.debug(newVal);
      this.$emit("onDateSelected", newVal);
    },
  },
};
</script>
