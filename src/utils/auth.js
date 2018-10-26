const TokenKey = 'token'

export function getToken () {
  return localStorage.getItem(TokenKey)
}

export function setToken (token) {
  return localStorage.setItem(TokenKey, token)
}
// 清除token和主题色
export function removeToken () {
  localStorage.setItem('theme', '')
  return localStorage.setItem(TokenKey, '')
}
