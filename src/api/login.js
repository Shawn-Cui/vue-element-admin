import axios from 'axios'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return axios.post('/api/Admins/login', data)
}

export function logout() {
  return axios.post('/api/Admins/logout')
}

// export function getUserInfo(token) {
//   return axios({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

