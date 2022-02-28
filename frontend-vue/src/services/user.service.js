import http from './http-common'
import ConfigService from './config.service'

class UserService {
  createUser (data) {
    return http.post(`${ConfigService.getApiUrl()}/user`, data)
  }

  getCalendarUsers (calendarId) {
    return http.get(`${ConfigService.getApiUrl()}/user/byCalendar?calendarId=${calendarId}`)
  }

  isUserNameTaken (calendarId, userName) {
    return http.get(`${ConfigService.getApiUrl()}/user/exists?calendarId=${calendarId}&user=${userName}`)
  }
}

export default new UserService()
