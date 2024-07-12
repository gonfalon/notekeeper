<template>
  <v-app id="inspire">
    <v-app-bar flat>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>Application</v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer
      class="pt-4"
      v-model="drawer"
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
          @click="activeItem = item.title"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>

    </v-main>
  </v-app>
</template>

<script setup>
  import { useAppStore } from '@/stores/app';
  import { ref } from 'vue'

  const activeItem = ref('Notes');

  const store = useAppStore();
  const drawer = ref(true);

  const navItems = ref([
    { title: 'Notes', icon: 'mdi-lightbulb-outline' },
    ...store.tags.map(tag => ({ title: tag, icon: 'mdi-tag-outline' })),
    { title: 'Archive', icon: 'mdi-file-cabinet' },
    { title: 'Trash', icon: 'mdi-delete-outline' },
  ]);
</script>