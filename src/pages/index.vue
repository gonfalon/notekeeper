<template>
  <v-app>
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
      <v-container v-if="loading">
        <v-skeleton-loader type="card" elevation="10" />
      </v-container>
      <v-container v-else>
        <NoteCard :prevent-dialog="true" @click="createNewNote" />
        <template v-for="note in visibleNotes" :key="note.id">
          <NoteCard :id="`note-${note.id}`" :note="note" @update="updateNote"/>
        </template>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
  import { useAppStore } from '@/stores/app';
  import { storeToRefs } from 'pinia';
  import { ref } from 'vue'
  import { useRouter } from 'vue-router';

  const ALLNOTES = 'Notes';

  const router = useRouter();
  const store = useAppStore();
  const { updateNote, newNote, syncNotes, isLoggedIn } = store;
  const { notes, tags } = storeToRefs(store);

  const visibleNotes = ref(notes.value);
  const activeItem = ref(ALLNOTES);
  const drawer = ref(true);
  const loading = ref(true);

  // before we do anything else, check and see if we're logged in.
  if(!isLoggedIn()) {
    router.replace('/login');
  } else{

    syncNotes().then(() => {
      loading.value = false;
      visibleNotes.value = notes.value;
    });
  }

  const navItems = ref([
    { title: ALLNOTES, icon: 'mdi-pencil-outline' },
    ...tags.value?.map(tag => ({ title: tag, icon: 'mdi-tag-outline' })),
    //{ title: 'Archive', icon: 'mdi-file-cabinet' },
    { title: 'Trash', icon: 'mdi-delete-outline' },
  ]);

  const setActiveFilter = (tag) => {
    activeItem.value = tag;
    visibleNotes.value = tag === ALLNOTES ? notes.value : notes.value.filter(note => note.tags.includes(tag));
  }
  
  const createNewNote = () => {
    var id = newNote();
    setActiveFilter(ALLNOTES);
    setTimeout(() => {
      var el = document.getElementById(`note-${id}`)
      el.scrollIntoView({ behavior: 'smooth' });
      el.click();
    }, 1000);
  }

</script>