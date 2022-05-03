import http from "./http-common";

class UserService {
  emailExist(email) {
    return http.get(`/user/exists?email=` + email);
  }
  validSurname(id, surname) {
    return http.get(`/user/valid?id=` + id + "&surname=" + surname);
  }

  createUser(data) {
    return http.post(`/user`, data);
  }

  getCalendarUsers(calendarId) {
    return http.get(`/user/byCalendar?calendarId=${calendarId}`);
  }

  isUserNameTaken(calendarId, userName) {
    return http.get(`/user/exists?calendarId=${calendarId}&user=${userName}`);
  }
}

export default new UserService();
