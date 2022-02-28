export default function authHeader () {
  const user = JSON.parse(localStorage.getItem('user'))

  if (user && user.authToken) {
    // for Node.js Express back-end
    return {
      'x-access-token': user.authToken,
      'Content-type': 'application/json',
    }
  } else {
    return {}
  }
}
