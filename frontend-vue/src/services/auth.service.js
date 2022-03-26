import http from "./http-common";
//import ConfigService from "./config.service";

class AuthService {
  create(data) {
    return http
      .post(`/auth/new`, data)
      .then((response) => {
        console.log("success", response);
        if (response.data.authToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      })
      .catch((e) => {
        console.log("error", e);
      });
  }

  confirmPasswordAndLogin(data) {
    return http
      .post(`/auth/confirm`, data)
      .then((response) => {
        if (response.data.authToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  emailExist(email) {
    // ${ConfigService.getApiUrl()}
    return http
      .get(`/user/exists?email=` + email)
      .then((response) => {
        return response.data;
      })
      .catch((e) => {
        console.log(e);
        return e.response;
      });
  }

  login(user, password) {
    console.log(import.meta.env);
    return http
      .post(`/auth/login`, {
        user: user,
        password: password,
      })
      .then((response) => {
        if (response.data.authToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response;
      })
      .catch((e) => {
        console.log(e);
        return e.response;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }
}

export default new AuthService();
