// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    tags: [
      'Tag 1',
      'Tag 2',
      'Tag 3'
    ]
  }),
  getters: {
    // computed properties
  },
  actions: {
    // methods
  }
})
