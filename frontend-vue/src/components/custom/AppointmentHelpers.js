const moment = require('moment')

class Appointment {
  constructor (calendarId, start, end) {
    this.calendarId = calendarId
    this.id = Math.floor(Math.random() * Date.now())
    this.isVirtual = false
    this.parentId = -1
    this.name = 'Unbenannter Termin'
    this.color = 'blue'
    this.start = start
    this.end = end
    this.timed = true
    this.repeatation = 'Einmalig'
    this.attachedPersons = ''
    this.description = ''
    this.modified = ''
  }

  fromResponse (data) {
    this.calendarId = data.calendarId
    this.id = data.id
    this.isVirtual = data.isVirtual
    this.name = data.name
    this.parentId = data.parendId
    this.color = data.color
    this.start = data.start
    this.end = data.end
    this.timed = data.timed
    this.repeatation = data.repeatation
    this.attachedPersons = data.attachedPersons
    this.description = data.description
    this.modified = data.modified
  }
}

module.exports = {
  repetitionRateToVirtual: function (repetitionRate, parentAppointment, calendarStart, calendarEnd) {
    //  1 start kleiner als calendarEnd
    //  2  checke modified

    // dellete

    const parentAppointmentStart = moment(parentAppointment.start)
    const parentAppointmentEnd = moment(parentAppointment.end)
    const parentAppointmentDuration = moment.duration(parentAppointmentEnd.diff(parentAppointmentStart))
    const results = []

    let distanceParentStartCalendarStart = moment.duration(moment(calendarStart).diff(parentAppointmentStart)).asDays()
    distanceParentStartCalendarStart = Math.ceil(distanceParentStartCalendarStart)

    const offsetDaysOfFirstRepetitaionBeforeCalendarStart = distanceParentStartCalendarStart % repetitionRate

    let virtualAppointmentStart = moment(parentAppointment.start)

    if (offsetDaysOfFirstRepetitaionBeforeCalendarStart === 0) {
      // first repetitation is on calendar Start
      virtualAppointmentStart = moment(calendarStart.valueOf())
    } else {
      const firstDateBeforeStart = moment(calendarStart).subtract(
        offsetDaysOfFirstRepetitaionBeforeCalendarStart,
        'day',
      )
      virtualAppointmentStart = moment(firstDateBeforeStart.valueOf())
    }

    virtualAppointmentStart.minute(parentAppointmentStart.minute())
    virtualAppointmentStart.hour(parentAppointmentStart.hour())

    const virtualAppointmentEnd = moment(virtualAppointmentStart.valueOf())
    virtualAppointmentEnd.add(parentAppointmentDuration)

    const virtualAppointment = JSON.parse(JSON.stringify(parentAppointment))
    virtualAppointment.parentId = parentAppointment.id
    virtualAppointment.isVirtual = true

    while (virtualAppointmentStart.valueOf() < calendarEnd.valueOf()) {
      const newVirtualAppointment = JSON.parse(JSON.stringify(virtualAppointment))

      newVirtualAppointment.start = virtualAppointmentStart.valueOf()
      newVirtualAppointment.end = virtualAppointmentEnd.valueOf()
      results.push(newVirtualAppointment)

      virtualAppointmentStart.add(repetitionRate, 'day')
      virtualAppointmentEnd.add(repetitionRate, 'day')
    }
    return results
  },

  create (calendarId, start, end) {
    return new Appointment(calendarId, start, end)
  },

  copy (from, to) {
    to.calendarId = from.calendarId
    to.id = from.id
    to.isVirtual = from.isVirtual
    to.name = from.name
    to.parentId = from.parendId
    to.color = from.color
    to.start = from.start
    to.end = from.end
    to.timed = from.timed
    to.repeatation = from.repeatation
    to.attachedPersons = from.attachedPersons
    to.description = from.description
    to.modified = from.modified
  },
}
