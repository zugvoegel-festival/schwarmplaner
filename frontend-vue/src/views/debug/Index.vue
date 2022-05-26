<template>
  <div>
    Debug View
    <ShiftSelector
      :jobs="localJobs"
      :shifts="localShifts"
      :dates="localDates"
      v-on:onJobSelected="onJobSelected"
    ></ShiftSelector>
  </div>
</template>

<script>
import ShiftService from "@/services/shifts.service";
import JobService from "@/services/jobs.service";
import ShiftSelector from "@/components/custom/ShiftSelector.vue";
export default {
  name: "DebugView",
  metaInfo: { title: "Debug" },
  components: { ShiftSelector },
  data: () => ({
    localShifts: [],
    localJobs: [],
    localDates: [],
  }),
  mounted() {
    this.fetchJobs();
    this.fetchDates();
  },
  methods: {
    onJobSelected(jobId) {
      this.fetchShifts(jobId, "normal");
    },

    fetchJobs() {
      JobService.getJobs()
        .then((response) => {
          this.$log.debug(response);
          this.localJobs = response.data.data;
          this.fetchShifts(1, "normal");
        })
        .catch((e) => {
          this.$log.error(e);
        });
    },
    fetchShifts(jobId, role) {
      ShiftService.getShiftsByJobAndRole(jobId, role)
        .then((response) => {
          this.$log.debug(response);
          this.localShifts = response.data.data;
        })
        .catch((e) => {
          this.$log.error(e);
        });
    },
    fetchDates() {
      ShiftService.getDates()
        .then((response) => {
          this.$log.debug(response);
          this.localDates = response.data.data;
        })
        .catch((e) => {
          this.$log.error(e);
        });
    },
  },
};
</script>

<style></style>
