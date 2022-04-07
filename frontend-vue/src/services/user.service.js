import http from "./http-common";
import ConfigService from "./config.service";

class UserService {
  emailExist(email) {
    return http.get(`/user/exists?email=` + email);
  }

  createUser(data) {
    return http.post(`/user`, data);
  }

  getCalendarUsers(calendarId) {
    return http.get(
      `${ConfigService.getApiUrl()}/user/byCalendar?calendarId=${calendarId}`
    );
  }

  isUserNameTaken(calendarId, userName) {
    return http.get(
      `${ConfigService.getApiUrl()}/user/exists?calendarId=${calendarId}&user=${userName}`
    );
  }
}

export default new UserService();
