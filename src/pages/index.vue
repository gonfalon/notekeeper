<template>
  <v-app id="inspire">
    <v-app-bar flat>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title><v-icon>mdi-vuetify</v-icon> NoteKeeper</v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer
      class="pt-4"
      permanent
      v-bind:rail="!drawer"
      expand-on-hover
    >
      <v-list
        nav
      >
        <v-list-item
          v-for="item in navItems"
          :key="item.title"
          :prepend-icon="item.icon"
          :title="item.title"
          :active="item.title === activeItem"
          color="primary"
          @click="setActiveFilter(item.title)"
          class="rounded-pill"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <NoteCard :prevent-dialog="true" @click="newNote" />
        <template v-for="note in visibleNotes" :key="note.id">
          <NoteCard :id="`note-${note.id}`" :note="note" @update="store.updateNote"/>
        </template>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
  import { useAppStore } from '@/stores/app';
  import { ref } from 'vue'

  const ALLNOTES = 'Notes';

  const activeItem = ref(ALLNOTES);
  const drawer = ref(true);

  const store = useAppStore();

  const visibleNotes = ref(store.notes);

  const navItems = ref([
    { title: ALLNOTES, icon: 'mdi-pencil-outline' },
    ...store.tags.map(tag => ({ title: tag, icon: 'mdi-tag-outline' })),
    { title: 'Archive', icon: 'mdi-file-cabinet' },
    { title: 'Trash', icon: 'mdi-delete-outline' },
  ]);

  const setActiveFilter = (tag) => {
    activeItem.value = tag;
    visibleNotes.value = tag === ALLNOTES ? store.notes : store.notes.filter(note => note.tags.includes(tag));
  }
  
  const newNote = () => {
    var id = store.newNote();
    setTimeout(() => {
      var el = document.getElementById(`note-${id}`)
      el.scrollIntoView({ behavior: 'smooth' });
      el.click();
    }, 100);
  }
</script>