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
    tags: state => [...new Set(state.notes?.filter(n => !n.deleted).map(note => note.tags.filter(t => t != 'Trash')).flat())],
    unsavedChanges: state => state.notes?.some(note => note.isDirty)
  },
  actions: {
    // methods
    newNote() {
      const note = {
        note_id : crypto.randomUUID(),
        title: '',
        content: '',
        tags: [],
        deleted: false,
      };

      this.notes.push(note);
      console.log('New Note!')
      console.log(this.notes);
      console.log('returning id:', note.note_id);
      return note.note_id;
    },
    async updateNote(note) {
      note.isDirty = true;
      note.last_modified = new Date().toUTCString();
      const index = this.notes.findIndex(n => n.note_id === note.note_id)
      this.notes[index] = note
      console.log('note updated', note);
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
