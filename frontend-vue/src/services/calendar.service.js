import http from './http-common'
import ConfigService from './config.service'

class CalendarService {
  create (data) {
    return http.post(`${ConfigService.getApiUrl()}/calendar/new`, data)
  }

  update (id, data) {
    return http.put(`${ConfigService.getApiUrl()}/calendar/${id}`, data)
  }

  delete (id) {
    return http.delete(`${ConfigService.getApiUrl()}/calendar/${id}`)
  }

  getCalendarBySlug (id) {
    return http.get(`${ConfigService.getApiUrl()}/calendar/${id}`)
  }
}

export default new CalendarService()
