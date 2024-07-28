// Pinia Store for the app
import { defineStore } from 'pinia'
import { getCurrentSession, syncNotes } from '@/api';

export const useAppStore = defineStore('app', {
  state: () => ({
    // data
    notes: [],
  }),
  getters: {
    // computed properties
    tags: state => state.notes?.map(note => note.tags).flat()
  },
  actions: {
    // methods
    newNote() {
      const note = {
        note_id : crypto.randomUUID(),
        title: '',
        content: '',
        tags: []
      };

      this.notes.push(note);
      console.log('New Note!')
      console.log(this.notes);
      return note.id;
    },
    async updateNote(note) {
      note.isDirty = true;
      const index = this.notes.findIndex(n => n.note_id === note.note_id)
      this.notes[index] = note
      this.notes = await syncNotes(this.notes);
    },

    // API wrappers
    async syncNotes() {
      this.notes = await syncNotes(this.notes) || [];
      console.log('note sync complete')
      console.log(this.notes);
    },
        
    isLoggedIn(){
      return !!getCurrentSession()
    }
  }
})
