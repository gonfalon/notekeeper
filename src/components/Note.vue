<template>
    <v-card class="ma-8 pa-4">
        <v-card-title>{{ note?.title ?? 'Add a Note'}}</v-card-title>
        <v-card-text v-if="note?.content">{{ note.content }}</v-card-text>
        <v-dialog activator="parent" max-width="600">
            <v-card>
                <v-card-title>
                    <v-text-field
                        v-model="editableNote.title"
                        placeholder="Title"
                        variant="underlined"
                        @input="updateNote"
                    />
                </v-card-title>
                <v-card-text>
                    <v-textarea
                        v-model="editableNote.content"
                        placeholder="Text"
                        variant="underlined"
                        @input="updateNote"
                    />
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script setup>
const emit = defineEmits(['update']);
const props = defineProps({
    note: Object
});

const editableNote = ref({ ...props.note });

function updateNote() {
    emit('update', editableNote.value);
}
</script>