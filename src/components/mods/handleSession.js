export default {
  setSession (str, obj) {
    window.sessionStorage.setItem(str, JSON.stringify(obj))
  },
  getSession (str) {
    return JSON.parse(window.sessionStorage.getItem(str))
  },
  removeSession (str) {
    window.sessionStorage.removeItem(str)
  }
}
