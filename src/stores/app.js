// Utilities
import { defineStore } from 'pinia'
import { syncNotes } from '@/api';

export const useAppStore = defineStore('app', {
  state: () => ({
    // data
    notes: [],
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
      syncNotes();
    }
  }
})
