<template>
    <v-app>

    <v-app-bar flat>
      <v-app-bar-title><v-icon>mdi-vuetify</v-icon> NoteKeeper</v-app-bar-title>
    </v-app-bar>
        <v-main>
            <v-container v-if="showMessage">
                <p>Check your email for a sign in link!</p>
            </v-container>
            <v-container v-else>
                <v-card>
                    <v-card-title>Sign In</v-card-title>
                    <v-card-text>
                        <v-text-field
                            v-model="email"
                            label="Email address"
                            placeholder="johndoe@gmail.com"
                            type="email">
                        </v-text-field>
                        <v-btn :disabled="!email" color="primary" @click="logIn(email)">Sign In</v-btn>
                    </v-card-text>
                </v-card>
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