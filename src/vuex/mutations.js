import axios from 'axios'
export default {
  updateUser (state, userInfo) {
    state.userInfo.id = userInfo.id
    state.userInfo.username = userInfo.username
    state.userInfo.nickname = userInfo.nickname
    state.userInfo.admin = userInfo.admin
    state.userInfo.isLogin = true
  },
  clearUser (state) {
    state.userInfo.id = 0
    state.userInfo.username = ''
    state.userInfo.nickname = ''
    state.userInfo.admin = 0
    state.userInfo.isLogin = false
  },
  setClassify (state) {
    axios.get('api/classify').then((res) => {
      if (res.data.isOk) {
        state.classify = res.data.result
      }
    })
      .catch((err) => {
        console.log(err)
      })
  },
  setStatus (state) {
    axios.get('api/status').then((res) => {
      if (res.data.isOk) {
        state.status = res.data.result
      }
    })
      .catch((err) => {
        console.log(err)
      })
  },
  setLabels (state) {
    axios.get('api/labels').then((res) => {
      if (res.data.isOk) {
        state.labels = res.data.result
      }
    })
      .catch((err) => {
        console.log(err)
      })
  }
}
