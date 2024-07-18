// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    // data
    notes: [
      {
        id: 1,
        title: 'Note 1',
        content: 'Content 1',
        tags: ['Fred', 'Joe']
      },
      {
        id: 2,
        title: 'Note 2',
        content: 'Content 2',
        tags: ['Tag 3', 'Mark']
      }
    ],
  }),
  getters: {
    // computed properties
    tags: state => state.notes.map(note => note.tags).flat(),
  },
  actions: {
    // methods
    newNote() {
      const note = {
        id : this.notes.length + 1,
        title: '',
        content: '',
        tags: []
      };

      this.notes.push(note);
      return note.id;
    },
    updateNote(note) {
      const index = this.notes.findIndex(n => n.id === note.id)
      this.notes[index] = note
    }
  }
})
