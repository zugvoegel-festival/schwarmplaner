<template>
  <section id="hero">
    <v-sheet class="px-10">
      <v-container>
        <v-row class="fill-height">
          <v-col>
            <v-sheet height="64">
              <v-toolbar flat>
                <v-btn
                  outlined
                  class="mr-4"
                  @click="setToday"
                >
                  Today
                </v-btn>
                <v-btn
                  fab
                  text
                  small
                  @click="prev"
                >
                  <v-icon small>
                    mdi-chevron-left
                  </v-icon>
                </v-btn>
                <v-btn
                  fab
                  text
                  small
                  @click="next"
                >
                  <v-icon small>
                    mdi-chevron-right
                  </v-icon>
                </v-btn>
                <v-toolbar-title v-if="$refs.calendar">
                  {{ $refs.calendar.title }}
                </v-toolbar-title>
                <v-spacer />
                <v-menu
                  bottom
                  right
                >
                  <template #activator="{ on, attrs }">
                    <v-btn
                      outlined
                      v-bind="attrs"
                      v-on="on"
                    >
                      <span>{{ typeToLabel[type] }}</span>
                      <v-icon right>
                        mdi-menu-down
                      </v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item @click="type = 'day'">
                      <v-list-item-title>Day</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="type = 'week'">
                      <v-list-item-title>Week</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="type = 'month'">
                      <v-list-item-title>Month</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="type = '4day'">
                      <v-list-item-title>4 days</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-toolbar>
            </v-sheet>
            <v-sheet height="600">
              <v-calendar
                ref="calendar"
                v-model="calendarDate"
                :events="appointments"
                :event-color="getAppointmentDay"
                :event-ripple="true"
                :type="type"
                :interval-format="intervalFormat"
                @change="getAppointmentsInRange"
                @click:more="jumpToDayView"
                @click:date="jumpToDayView"
                @mouseenter:event="isAppointmentHovered = true"
                @mouseleave:event="isAppointmentHovered = false"
                @mousedown:event="onAppointmentMouseDown"
                @mouseup:event="onAppointmentMouseUp"
                @mousedown:time="onTimeMouseDown"
                @mousemove:time="onTimeMouseMove"
                @mouseup:time="onTimeMouseUp"
                @mouseleave.native="onMouseLeave"
              >
                <template #event="{ event, timed, eventSummary }">
                  <div
                    class="v-event-draggable"
                    v-html="eventSummary()"
                  />
                  <div
                    v-if="timed"
                    class="v-event-drag-bottom"
                    @mousedown.stop="onAppointmentBottomMouseDown(event)"
                  />
                </template>
              </v-calendar>

              <edit-appointment-dialog
                :x="appointmentX"
                :y="appointmentY"
                :open-dialog="isEditAppointmentDialogOpen"
                :event-data="selectedAppointment"
                :avail-persons="users"
                @OnDelete="onEditAppointmentDelete"
                @OnCloseSuccess="onEditAppointmentCloseSuccess"
                @OnCloseFail="onEditAppointmentCloseFail"
              />
              <modified-appointment-dialog
                :open-dialog="isModifiedAppointmentDialogOpen"
                :x="appointmentX"
                :y="appointmentY"
                @OnCloseSuccess="onModifiedAppointmentDialogCloseSuccess"
                @OnCloseFail="onModifiedAppointmentDialogCloseFail"
              />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </section>
</template>

<script>
  import CalendarService from '../services/calendar.service'
  import UserService from '../services/user.service'
  import AppointmentService from '../services/appointment.service'

  import moment from 'moment'

  import AppointmentHelper from '../components/custom/AppointmentHelpers'
  import EditAppointmentDialog from '../components/custom/EditAppointmentDialog.vue'
  import ModifiedAppointmentDialog from '../components/custom/ModifiedAppointmentDialog.vue'
  import Section from '../components/base/Section.vue'

  export default {
    name: 'Calendar',
    components: {
      EditAppointmentDialog,
      ModifiedAppointmentDialog,
      Section,
    },
    data: () => ({
      isAppointmentHovered: false,
      calendarDate: '',
      defaultColor: 'blue',
      type: '4day',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        '4day': '4 Days',
      },
      deleteInProgress: false,
      users: ['Person1', 'Person2'],
      appointmentX: 0,
      appointmentY: 0,
      cachedAppointment: {},
      selectedAppointment: {},

      draggedAppointment: null,
      createdAppointment: null,
      extendedAppointment: null,

      isModifiedAppointmentDialogOpen: false,
      isEditAppointmentDialogOpen: false,
      mouseOnAppointmentDownTime: null,
      mouseOnTimeDownTime: null,

      extendEndOriginal: null,
      appointments: [],
      repeatation: ['Einmalig', 'Täglich', 'Wöchentlich', 'Monatlich'],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    }),
    watch: {
      isModifiedAppointmentDialogOpen (vake) {
        this.$log.info(vake)
      },
    },
    beforeCreate () {
      // add current  orgalendar to local storage
      CalendarService.getCalendarBySlug(this.$route.params.slug)
        .then(response => {
          const payload = response.data
          this.$store.dispatch('setCalendar', payload.data)
          if (!this.isUserSelected()) this.fetchAllUser()
        })
        .catch(e => {
          this.$log.error(e)
          this.$router.push({
            name: 'Start',
          })
        })
    },
    mounted () {
      this.$refs.calendar.checkChange()
    },
    methods: {
      fetchAllUser () {
        const calendar = this.$store.getters.calendar
        UserService.getCalendarUsers(calendar.id)
          .then(response => {
            const payload = response.data
            this.users = []
            payload.data.forEach(element => {
              this.users.push(element)
            })
          })
          .catch(e => {
            this.$log.error(e)
            this.$router.push({
              name: 'Start',
            })
          })
      },
      isUserSelected () {
        const user = this.$store.getters.user
        const calendar = this.$store.getters.calendar
        if (user.calendarId !== calendar.id) {
          this.$router.push({
            name: 'ChooseUser',
            params: { slug: this.$router.currentRoute.params.slug },
          })
          return false
        }
        return true
      },
      intervalFormat (interval) {
        return interval.time
      },
      jumpToDayView ({ date }) {
        this.calendarDate = date
        this.type = 'day'
      },
      getAppointmentDay (event) {
        return event.color
      },
      setToday () {
        this.calendarDate = ''
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      isClick (time) {
        return new Date() - time <= 150
      },
      isDrag (time) {
        return new Date() - time > 150
      },
      onEditAppointmentCloseSuccess () {
        this.$log.info()
        this.updateAppointment(this.selectedAppointment)
        this.closeEditAppointmentDialog()
      },
      onEditAppointmentCloseFail () {
        this.$log.info()
        if (!this.deleteInProgress) {
          this.updateAppointment(this.cachedAppointment, false)
        }
        this.closeEditAppointmentDialog()
      },
      onEditAppointmentDelete () {
        this.deleteAppointment(this.selectedAppointment)
      },
      closeEditAppointmentDialog () {
        this.isEditAppointmentDialogOpen = false

        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            this.selectedAppointment = {}
            this.cachedAppointment = {}
          }),
        )
      },
      openEditAppointmentDialog () {
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            this.isEditAppointmentDialogOpen = true
          }),
        )
      },
      onModifiedAppointmentDialogCloseSuccess (which) {
        this.$log.info()

        switch (which) {
          case 'Diesen Termin':
            break

          case 'Alle Termine':
            break
        }
        this.updateAppointment(this.selectedAppointment)
        this.closeModifiedAppointmentDialog()
      },
      onModifiedAppointmentDialogCloseFail () {
        this.$log.info()
        this.updateAppointment(this.cachedAppointment, false, false)
        this.closeModifiedAppointmentDialog()
      },
      closeModifiedAppointmentDialog () {
        this.isModifiedAppointmentDialogOpen = false
      },
      openModifiedAppointmentDialog () {
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            this.isModifiedAppointmentDialogOpen = true
          }),
        )
      },
      clearAll () {
        this.$log.info()
        this.dragTime = null

        this.draggedAppointment = null
        this.createdAppointment = null
        this.extendedAppointment = null

        this.extendEndOriginal = null

        this.extendStart = null
      },
      onAppointmentClick (data) {
        this.$log.info()
        this.draggedAppointment = null
        this.appointmentX = data.nativeEvent.clientX
        this.appointmentY = data.nativeEvent.clientY

        this.selectedAppointment = data.event
        this.cacheAppointment(data.event)

        data.nativeEvent.preventDefault()

        this.openEditAppointmentDialog()
        data.nativeEvent.stopPropagation()
      },
      onAppointmentMouseDown (data) {
        // grab and move appointment
        this.$log.info()
        this.mouseOnAppointmentDownTime = new Date() // cache time for click detection

        if (data.event && data.timed) {
          // startAppointmentDrag
          this.startAppointmentDragAppointment(data.event)
        }
      },
      onAppointmentMouseUp (data) {
        // handle click detection
        this.$log.info()
        if (this.isClick(this.mouseOnAppointmentDownTime)) {
          this.onAppointmentClick(data)
        } else if (this.draggedAppointment) {
          this.endAppointmentDrag()
        } else if (this.extendedAppointment) {
          this.endAppointmentExtend()
        }
      },
      onTimeMouseDown (tms) {
        this.$log.info()
        this.mouseOnTimeDownTime = new Date()
        const timeAtMousePos = this.dateToTime(tms)

        if (this.draggedAppointment && this.dragTime === null) {
          this.startAppointmentDragTime(timeAtMousePos)
        }
      },
      onTimeMouseMove (tms) {
        this.$log.info()
        const timeAtMousePos = this.dateToTime(tms)

        if (this.draggedAppointment && this.dragTime !== null && this.isDrag(this.mouseOnAppointmentDownTime)) {
          this.dragAppointment(timeAtMousePos)
        } else if (this.extendedAppointment && this.extendStart !== null) {
          this.extendAppointment(timeAtMousePos)
        }
      },
      onTimeMouseUp (tms) {
        this.$log.info()
        if (this.isClick(this.mouseOnTimeDownTime)) {
          if (this.isEditAppointmentDialogOpen) {
            this.onEditAppointmentCloseFail()
            return
          }
          this.createAppointment(this.dateToTime(tms))
        }
        if (this.draggedAppointment) {
          this.endAppointmentDrag()
        }
        if (this.extendedAppointment) {
          this.endAppointmentExtend()
        }
      },
      onMouseLeave () {
        if (this.extendedAppointment) {
          if (this.extendEndOriginal) {
            this.extendedAppointment.end = this.extendEndOriginal
          } else {
            const i = this.appointments.indexOf(this.extendedAppointment)
            if (i !== -1) {
              this.appointments.splice(i, 1)
            }
          }
        }
        this.clearAll()
      },
      onAppointmentBottomMouseDown (appointment) {
        this.$log.info()
        this.startAppointmentExtend(appointment)
      },
      startAppointmentDragAppointment (appointment) {
        this.$log.info()

        this.draggedAppointment = appointment
        this.cacheAppointment(appointment)
        this.dragTime = null
        this.extendEndOriginal = null
      },
      startAppointmentDragTime (timeAtMousePos) {
        this.$log.info()

        const start = this.draggedAppointment.start
        this.dragTime = timeAtMousePos - start
      },
      dragAppointment (timeAtMousePos) {
        this.$log.info()
        if (this.isEditAppointmentDialogOpen) {
          this.onEditAppointmentCloseFail()
        }
        // grab existing event end extend const start = this.draggedAppointment.start
        const start = this.draggedAppointment.start
        const end = this.draggedAppointment.end
        const duration = end - start
        const newStartTime = timeAtMousePos - this.dragTime
        const newStart = this.roundTime(newStartTime)
        const newEnd = newStart + duration
        this.draggedAppointment.start = newStart
        this.draggedAppointment.end = newEnd
      },
      endAppointmentDrag () {
        this.$log.info()
        this.updateAppointment(this.draggedAppointment)
        this.clearAll()
      },
      startAppointmentExtend (appointment) {
        this.$log.info()
        if (this.isEditAppointmentDialogOpen) {
          this.onEditAppointmentCloseFail()
        }
        this.extendedAppointment = appointment
        this.cacheAppointment(appointment)
        this.extendStart = appointment.start
        this.extendEndOriginal = appointment.end
      },
      extendAppointment (timeAtMousePos) {
        this.$log.info()
        const mouseRounded = this.roundTime(timeAtMousePos, false)
        const min = Math.min(mouseRounded, this.extendStart)
        const max = Math.max(mouseRounded, this.extendStart)
        this.extendedAppointment.start = min
        this.extendedAppointment.end = max
      },
      endAppointmentExtend () {
        this.$log.info()
        this.updateAppointment(this.extendedAppointment)
        this.clearAll()
      },
      roundTime (time, down = true) {
        const roundTo = 15
        const roundDownTime = roundTo * 60 * 1000

        return down ? time - (time % roundDownTime) : time + (roundDownTime - (time % roundDownTime))
      },
      dateToTime (tms) {
        return new Date(tms.year, tms.month - 1, tms.day, tms.hour, tms.minute).getTime()
      },
      cacheAppointment (appointment) {
        this.cachedAppointment = JSON.parse(JSON.stringify(appointment))
      },
      createAppointment (timeAtMousePos) {
        this.$log.info()
        // just a click in thecalender --> create a default appointment

        const start = this.roundTime(timeAtMousePos)
        const end = start + 3600000
        const appointment = AppointmentHelper.create(this.$store.getters.calendar.id, start, end)

        this.appointments.push(appointment)

        AppointmentService.createAppointment(appointment)
          .then(response => {
            const payload = response.data
            appointment.fromResponse(payload.data)
          })
          .catch(e => {
            this.$log.error(e)
          })
        this.createdAppointment = appointment
      },
      updateAppointment (appointment, sendToDB = true, checkVirtual = true) {
        this.$log.info()

        if (appointment.isVirtual && checkVirtual) {
          this.openModifiedAppointmentDialog()
          return
        }
        AppointmentHelper.copy(appointment, this.appointments[this.getAppointmentArrayPos(appointment.id)])

        if (sendToDB) {
          AppointmentService.updateAppointment(appointment)
            .then(resp => {})
            .catch(e => {
              this.$log.info(e)
            })
        }
      },
      deleteAppointment (appointment) {
        this.$delete(this.appointments, this.getAppointmentArrayPos(appointment.id))
        this.deleteInProgress = true
        AppointmentService.deleteAppointment(appointment.id)
          .then(resp => {
            this.deleteInProgress = false
          })
          .catch(e => {
            this.$log.info(e)
            this.deleteInProgress = false
          })
      },
      getAppointmentArrayPos (id) {
        for (let i = 0; i < this.appointments.length; i++) {
          if (this.appointments[i].id === id) {
            return i
          }
        }
        return 0
      },
      getAppointmentsInRange ({ start, end }) {
        const momentStart = moment(start.date, 'YYYY-MM-DD')
        let momentEnd = moment(end.date, 'YYYY-MM-DD')
        momentEnd = momentEnd.hour(23)
        momentEnd = momentEnd.minute(59)

        AppointmentService.getAppointmentsInRange(
          this.$store.getters.calendar.id,
          momentStart.valueOf(),
          momentEnd.valueOf(),
        )
          .then(response => {
            const payload = response.data
            this.appointments = payload.data.single
            payload.data.daily.forEach(element => {
              const virtualDailies = AppointmentHelper.repetitionRateToVirtual(1, element, momentStart, momentEnd)
              this.appointments = this.appointments.concat(virtualDailies)
            })
            payload.data.weekly.forEach(element => {
              const virtualDailies = AppointmentHelper.repetitionRateToVirtual(7, element, momentStart, momentEnd)
              this.appointments = this.appointments.concat(virtualDailies)
            })
            payload.data.fourWeekly.forEach(element => {
              const virtualDailies = AppointmentHelper.repetitionRateToVirtual(28, element, momentStart, momentEnd)
              this.appointments = this.appointments.concat(virtualDailies)
            })
          })
          .catch(e => {
            this.$log.error(e)
          })
      },
    },
  }
</script>
<style scoped lang="scss">
.v-event-draggable {
  padding-left: 6px;
}

.v-event-timed {
  user-select: none;
  -webkit-user-select: none;
}

.v-event-drag-bottom {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 4px;
  height: 4px;
  cursor: ns-resize;

  &::after {
    display: none;
    position: absolute;
    left: 50%;
    height: 4px;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    width: 16px;
    margin-left: -8px;
    opacity: 0.8;
    content: '';
  }

  &:hover::after {
    display: block;
  }
}
</style>
