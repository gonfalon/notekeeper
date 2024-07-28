<template>
    <v-card class="ma-8 pa-4 rounded-lg" hover>
        <v-card-title>{{ note?.title ?? 'Add a Note'}}</v-card-title>
        <v-card-text v-if="note?.content">
            <span style="white-space: pre-wrap;">{{ note.content }}</span>
        </v-card-text>
        <v-dialog v-if="!preventDialog" activator="parent" max-width="600">
            <v-card>
                <v-card-title class="mb-0 pb-0">
                    <v-text-field
                        v-model="editableNote.title"
                        placeholder="Title"
                        variant="underlined"
                        density="compact"
                        @input="updateNote"
                    />
                </v-card-title>
                <v-card-text class="pt-0 mt-0">
                    <v-textarea
                        class="pt-0"
                        auto-grow
                        v-model="editableNote.content"
                        placeholder="Note"
                        variant="plain"
                        @input="updateNote"
                    />
                </v-card-text>
                <v-card-actions>
                    <span v-if="note.last_modified" class="text-caption">Last saved {{ formatRelative(new Date(note.last_modified), new Date()) }}</span>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script setup>
import { formatRelative } from 'date-fns';

const emit = defineEmits(['update']);
const props = defineProps({
    note: Object,
    preventDialog: {
        type: Boolean,
        default: false
    }
});

const showColors = ref(false);
const editableNote = ref({ ...props.note });

function updateNote() {
    emit('update', editableNote.value);
}
</script>

<style scoped>
.v-text-field :deep(input) {
    font-size: 2em;
}
</style>