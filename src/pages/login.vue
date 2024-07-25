<template>
    <v-app>
        <v-main>
            <v-container v-if="showMessage">
                <v-card>Check your email for a sign in link.</v-card>
            </v-container>
            <v-container v-else>
                <v-text-field v-model="email"></v-text-field>
                <v-btn :disabled="!email" @click="logIn(email)">Sign In</v-btn>
            </v-container>
        </v-main>
    </v-app>
</template>
<script setup>
    import { signIn } from '@/api/index';

    const email = ref('');
    const showMessage = ref(false);

    const logIn = async (email) => {
        await signIn(email);
        showMessage.value = true;
    }
</script>