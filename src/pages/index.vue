<template>
  <v-app>
    <v-app-bar flat>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title><v-icon>mdi-vuetify</v-icon> NoteKeeper</v-app-bar-title>
      <v-spacer v-if="!mobile"></v-spacer>
      <v-icon class="mr-4">{{ changesIcon }}</v-icon>
      <span v-if="!mobile" class="pr-2">{{ changesMessage }}</span>
    </v-app-bar>
    <v-navigation-drawer
      class="pt-4"
      :permanent="!mobile"
      v-bind:rail="!mobile && !drawer"
      v-model="drawer"
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
    <v-main scrollable>
      <v-container v-if="loading">
        <v-skeleton-loader type="card" elevation="10" />
      </v-container>
      <v-container v-else>
        <NoteCard :prevent-dialog="true" @click="createNewNote" />
        <v-scale-transition group>
        <template v-for="note in visibleNotes" :key="note.note_id">
          <NoteCard :id="`note-${note.note_id}`" :note="note" @update="noteUpdated"/>
        </template>
        </v-scale-transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
  import { useAppStore } from '@/stores/app';
  import { storeToRefs } from 'pinia';
  import { computed, ref } from 'vue';
  import { useDisplay } from 'vuetify';
  import { useRouter } from 'vue-router';

  const ALLNOTES = 'Notes';
  const { mobile } = useDisplay();

  const router = useRouter();
  const store = useAppStore();
  const { updateNote, newNote, syncNotes, isLoggedIn } = store;
  const { notes, tags, unsavedChanges } = storeToRefs(store);

  const visibleNotes = ref(notes.value.sort((a, b) => new Date(b.last_modified) - new Date(a.last_modified)));
  const activeItem = ref(ALLNOTES);
  const drawer = ref(!mobile.value);
  const loading = ref(true);

  // before we do anything else, check and see if we're logged in.
  if(!isLoggedIn()) {
    router.replace('/login');
  } else {
    syncNotes().then(() => {
      loading.value = false;
      visibleNotes.value = notes.value;
      console.log('tags: ', tags.value);
    });
  }

  const changesIcon = computed(() => unsavedChanges.value ? 'mdi-alert': 'mdi-check');
  const changesMessage = computed(() => unsavedChanges.value ? 'Unsaved changes': 'All changes saved');

  const navItems = computed(() => {
  return [
    { title: ALLNOTES, icon: 'mdi-pencil-outline' },
    ...tags.value?.map(tag => ({ title: tag, icon: 'mdi-tag-outline' })),
    //{ title: 'Archive', icon: 'mdi-file-cabinet' },
    { title: 'Trash', icon: 'mdi-delete-outline' },
  ]
  }
);

  const setActiveFilter = (tag) => {
    activeItem.value = tag;

    switch(tag) {
      case ALLNOTES:
        visibleNotes.value = notes.value.filter(note => !note.deleted).sort((a, b) => new Date(b.last_modified) - new Date(a.last_modified));
        break;
      case 'Trash':
        visibleNotes.value = notes.value.filter(note => note.deleted).sort((a, b) => new Date(b.last_modified) - new Date(a.last_modified));
        break;
      default:
        visibleNotes.value = notes.value.filter(note => !note.deleted && note.tags.includes(tag)).sort((a, b) => new Date(b.last_modified) - new Date(a.last_modified));
        break;
    }
  }
  
  const createNewNote = () => {
    var note_id = newNote();
    console.log(note_id);
    setActiveFilter(ALLNOTES);
    setTimeout(() => {
      var el = document.getElementById(`note-${note_id}`)
      el.scrollIntoView({ behavior: 'smooth' });
      el.click();
    }, 750);
  }

  const noteUpdated = (note) => {
    updateNote(note);
    visibleNotes.value = notes.value;
    setActiveFilter(activeItem.value);
  }
</script>