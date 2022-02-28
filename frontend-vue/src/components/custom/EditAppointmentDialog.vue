<template>
  <v-menu
    :value="openDialog"
    :close-on-content-click="false"
    :close-on-click="false"
    :position-x="x"
    :position-y="y"
    absolute
    offset-x
  >
    <v-card
      min-width="350px"
      max-width="500px"
      flat
    >
      <v-card-title :color="workingData.color">
        <v-text-field
          v-model="workingData.name"
          label="Title"
        />
        <v-spacer />
        <v-btn
          icon
          @click="deleteAppointment"
        >
          <v-icon> mdi-trash-can</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row />
        <v-row>
          <v-radio-group
            v-model="workingData.color"
            label="Farbe"
            row
            column
          >
            <div
              v-for="item in colors"
              :key="item"
            >
              <v-radio
                :change="onChange()"
                :color="item"
                :value="item"
              />
            </div>
          </v-radio-group>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-menu
              ref="startDatePicker"
              v-model="startDateOpen"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="startDate"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="startDate"
                  label="Datum"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="startDate"
                :max="endDate"
                full-width
                @input="$refs.startDatePicker.save(startDate)"
              />
            </v-menu>
          </v-col>
          <v-col cols="6">
            <div v-if="!fullDay">
              <v-menu
                ref="startTimePicker"
                v-model="startTimeOpen"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="startTime"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="startTime"
                    label="Start"
                    prepend-icon="mdi-clock-time-four-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-time-picker
                  v-model="startTime"
                  :max="maxForStarTime"
                  format="24hr"
                  full-width
                  :allowed-minutes="allowedStep"
                  @click:minute="$refs.startTimePicker.save(startTime)"
                />
              </v-menu>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-menu
              ref="endDatePicker"
              v-model="endDateOpen"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="endDate"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="endDate"
                  label="Datum"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="endDate"
                :min="startDate"
                full-width
                @input="$refs.endDatePicker.save(endDate)"
              />
            </v-menu>
          </v-col>
          <v-col cols="6">
            <div v-if="!fullDay">
              <v-menu
                ref="endTimePicker"
                v-model="endTimeOpen"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="endTime"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="endTime"
                    label="Ende"
                    prepend-icon="mdi-clock-time-four-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-time-picker
                  v-model="endTime"
                  :min="minForEndTime"
                  format="24hr"
                  full-width
                  :allowed-minutes="allowedStep"
                  @click:minute="$refs.endTimePicker.save(endTime)"
                />
              </v-menu>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-checkbox
            v-model="fullDay"
            label="ganztägig"
          />
        </v-row>
        <v-row>
          <v-col cols="5">
            <v-combobox
              v-model="workingData.repeatation"
              :items="repeatations"
              :change="onChange()"
              label="Wiederholung"
              dense
            />
          </v-col>
        </v-row>

        <v-row>
          <v-combobox
            v-model="workingData.attachedPersons"
            :items="availPersons"
            label="Personen"
            multiple
            dense
          />
        </v-row>
        <v-row>
          <v-textarea v-model="workingData.description">
            <template #label>
              <div>Beschreibung</div>
            </template>
          </v-textarea>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          @click="closeFail"
        >
          Schließen
        </v-btn>
        <v-spacer />
        <v-btn @click="closeSuccess">
          Ok
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
  import moment from 'moment'

  export default {
    name: 'AppointmentCard',

    props: {
      openDialog: { type: Boolean, default: false },
      x: { type: Number, default: 0 },
      y: { type: Number, default: 0 },
      availPersons: {
        type: Array,
        default: function () {
          return ['']
        },
      },

      eventData: { type: Object },
    },
    data: () => ({
      repeatations: ['Einmalig', 'Täglich', 'Wöchentlich', 'Monatlich'],
      startTimeOpen: false,
      startDateOpen: false,
      endDateOpen: false,
      endTimeOpen: false,
      colors: [
        'blue',
        'indigo',
        'deep-purple',
        'cyan',
        'green',
        'orange',
        'grey darken-1',
      ],
    }),
    computed: {
      maxForStarTime: {
        get () {
          if (this.sameDay()) {
            return this.endTime
          } else {
            return '23:59'
          }
        },
        set (value) {},
      },
      minForEndTime: {
        get () {
          if (this.sameDay()) {
            return this.startTime
          } else {
            return '00:00'
          }
        },
        set (value) {},
      },
      startTime: {
        get () {
          return moment(this.workingData.start).format('HH:mm')
        },
        set (value) {
          this.workingData.start = this.setHHMM(value, this.workingData.start)
        },
      },
      endTime: {
        get () {
          return moment(this.workingData.end).format('HH:mm')
        },
        set (value) {
          this.workingData.end = this.setHHMM(value, this.workingData.end)
        },
      },
      startDate: {
        get () {
          return moment(this.workingData.start).format('YYYY-MM-DD')
        },
        set (value) {
          console.log(value)
          const result = this.setYYYYMMDD(value, this.workingData.start)
          console.log(result, moment(result).format('YYYY-MM-DD').toString())

          this.workingData.start = this.setYYYYMMDD(value, this.workingData.start)
        },
      },
      endDate: {
        get () {
          return moment(this.workingData.end).format('YYYY-MM-DD')
        },
        set (value) {
          const result = this.setYYYYMMDD(value, this.workingData.end)

          this.workingData.end = result
        },
      },
      attachedPersons: {
        get () {
          if (this.workingData.attachedPersons) {
            return this.workingData.attachedPersons
              .split(';')
              .filter(function (x) {
                return x !== ''
              })
          }
          return []
        },
        set (value) {
          this.workingData.attachedPersons = value.join(';')
        },
      },
      fullDay: {
        get () {
          return !this.workingData.timed
        },
        set (value) {
          this.workingData.timed = !value
        },
      },

      workingData: {
        get () {
          return this.eventData
        },
        set (value) {
          this.$emit('update:workingData', value)
        },
      },
    },
    methods: {
      closeFail: function (event) {
        this.$emit('OnCloseFail', this.workingData)
      },
      closeSuccess: function (event) {
        this.$emit('OnCloseSuccess', this.workingData)
      },
      deleteAppointment: function (event) {
        this.$emit('OnDelete', this.workingData.id)
        this.$emit('OnCloseFail', this.workingData)
      },
      onChange: function (item) {
        this.$emit('OnChange', this.workingData)
      },
      setHHMM (newTime, oldTime) {
        const newStart = moment(newTime, 'HH:mm')
        const momentStart = moment(oldTime)

        momentStart.set('minute', newStart.minute())
        momentStart.set('hour', newStart.hour())
        return momentStart.valueOf()
      },
      setYYYYMMDD (newTime, oldTime) {
        const newStart = moment(newTime, 'YYYY-MM-DD')
        const momentStart = moment(oldTime)

        momentStart.set('date', newStart.date())
        momentStart.set('month', newStart.month())
        momentStart.set('year', newStart.year())

        return momentStart.valueOf()
      },
      allowedStep: (m) => m % 5 === 0,
      sameDay () {
        return this.startDate === this.endDate
      },
    },
  }
</script>
