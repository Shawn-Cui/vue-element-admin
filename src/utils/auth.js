import Cookies from 'js-cookie'

const TokenKey = 'BDToken'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
