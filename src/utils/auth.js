import Cookies from 'js-cookie'

const TokenKey = 'BDToken'
const UsernameKey = 'BDUsername'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function setUsername(username) {
  return localStorage.setItem(UsernameKey, username)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
