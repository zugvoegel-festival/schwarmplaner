import http from './http-common'
import ConfigService from './config.service'

class AppointmentService {
  getAppointmentsInRange (calendarId, start, end) {
    return http.get(`${ConfigService.getApiUrl()}/appointment?calendarId=${calendarId}&start=${start}&end=${end}`)
  }

  createAppointment (appointment) {
    return http.post(`${ConfigService.getApiUrl()}/appointment/`, appointment)
  }

  updateAppointment (appointment) {
    return http.put(`${ConfigService.getApiUrl()}/appointment/${appointment.id}`, appointment)
  }

  deleteAppointment (id) {
    return http.delete(`${ConfigService.getApiUrl()}/appointment/${id}`)
  }
}

export default new AppointmentService()
