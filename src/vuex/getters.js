export default {
  getClassify: (state) => (id) => {
    return state.classify.find((item) => {
      return item.id === id
    })
  },
  getStatus: (state) => (id) => {
    return state.status.find((item) => {
      return item.id === id
    })
  },
  getLabels: (state) => (id) => {
    return state.labels.find((item) => {
      return item.id === id
    })
  }
}
