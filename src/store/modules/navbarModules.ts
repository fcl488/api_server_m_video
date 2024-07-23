import { defineStore } from 'pinia'

let navStore = defineStore('navStore', {
  state: () => {
    return {
      active: 0
    }
  },
  actions: {
    changeActive(index: number) {
      this.active = index
    }
  }
})

export default navStore