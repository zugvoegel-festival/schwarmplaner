import http from "./http-common";

class ShiftsService {
  getShiftsByJobAndRole(jobId, type) {
    return http.get(`/shifts?jobId=${jobId}&type=${type}`);
  }
  getShiftsByJob(jobId) {
    return http.get(`/shifts?jobId=${jobId}`);
  }
  getShiftsByRole(type) {
    return http.get(`/shifts?type=${type}`);
  }
  getShifts() {
    return http.get(`/shifts`);
  }
  getDates() {
    return http.get(`/shifts/dates`);
  }
  //n OLD OLD OLD OLD
  emailExist(email) {
    return http.get(`/user/exists?email=` + email);
  }

  validSurname(id, surname) {
    return http.get(`/user/valid?id=` + id + "&surname=" + surname);
  }

  createUser(data) {
    return http.post(`/user`, data);
  }

  isUserNameTaken(calendarId, userName) {
    return http.get(`/user/exists?calendarId=${calendarId}&user=${userName}`);
  }
}

export default new ShiftsService();
