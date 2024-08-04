<template>
    <v-card class="ma-8 pa-4 rounded-lg" hover>
        <v-card-title>{{ note?.title ?? 'Add a Note'}}</v-card-title>
        <v-card-text v-if="note?.content">
            <span style="white-space: pre-wrap;">{{ note.content }}</span>
        </v-card-text>
        <v-dialog v-if="!preventDialog" activator="parent" max-width="600">
            <v-card class="rounded-lg">
                <v-card-title class="mb-0 pb-0">
                    <v-text-field
                        v-model="editableNote.title"
                        placeholder="Title"
                        variant="underlined"
                        density="compact"
                        @input="updateNote"
                        class="title-input"
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
                    <v-btn icon="mdi-palette" @click="showColors = !showColors" :active="showColors"/>
                    <v-btn icon="mdi-tag-outline" @click="showTags = !showTags" :active="showTags"/>
                    <v-chip-group column>
                        <v-chip v-for="tag in editableNote.tags"
                            :closable="showTags"
                            :key="tag"
                            class="mx-2"
                            @click:close="removeTag(tag)"
                        >{{ tag }}</v-chip>
                    </v-chip-group>
                    <v-spacer></v-spacer>
                    <span v-if="note.last_modified" class="text-caption">Edited {{ formatRelative(new Date(note.last_modified), new Date()) }}</span>
                </v-card-actions>
                <v-divider></v-divider>
                <v-card-actions v-if="showColors">
                    <v-btn icon="mdi-water-off-outline" @click="setColor()"></v-btn>
                    <template v-for="color in ['blue', 'green', 'red', 'purple', 'orange', 'indigo']" :key="color">
                        <v-btn icon :class="`bg-${color}`" @click=setColor(color)></v-btn>
                    </template>
                    <v-spacer></v-spacer>
                </v-card-actions>
                    <v-combobox v-if="showTags"
                    class="ma-1"
                    variant="outlined"
                    v-model="editableNote.tags"
                    label="Add tags"
                    chips
                    multiple
                    @update:model-value="updateNote"
                    >
                        <template v-slot:chip>
                        <!--don't actually show any chips-->
                        </template>
                    </v-combobox>
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
const showTags = ref(false);
const editableNote = ref({ ...props.note });

function updateNote() {
    emit('update', editableNote.value);
}

function setColor(color) {
    // do nothing
}

function removeTag(tag) {
    editableNote.value.tags = editableNote.value.tags.filter(t => t !== tag);
    updateNote();
}
</script>

<style scoped>
.title-input :deep(input) {
    font-size: 2em !important;
}
</style>