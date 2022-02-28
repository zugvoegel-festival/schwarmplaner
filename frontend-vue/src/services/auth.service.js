import http from './http-common'
import ConfigService from './config.service'

class AuthService {
  create (data) {
    console.log('create new bubble', ConfigService.getApiUrl())
    return http
      .post(`${ConfigService.getApiUrl()}/auth/new`, data)
      .then(response => {
        console.log('success', response)
        if (response.data.authToken) {
          localStorage.setItem('user', JSON.stringify(response.data))
        }
        return response.data
      })
      .catch(e => {
        console.log('error', e)
      })
  }

  confirmPasswordAndLogin (data) {
    return http
      .post(`${ConfigService.getApiUrl()}/auth/confirm`, data)
      .then(response => {
        if (response.data.authToken) {
          localStorage.setItem('user', JSON.stringify(response.data))
        }
        return response
      })
      .catch(e => {
        console.log(e)
      })
  }

  login (credentials) {
    return http
      .post(`${ConfigService.getApiUrl()}/auth/login`, credentials)
      .then(response => {
        if (response.data.authToken) {
          localStorage.setItem('user', JSON.stringify(response.data))
        }
        return response
      })
      .catch(e => {
        console.log(e)
        return e.response
      })
  }

  logout () {
    localStorage.removeItem('user')
  }
}

export default new AuthService()
