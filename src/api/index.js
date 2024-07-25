import { createClient } from '@supabase/supabase-js'

const apiUrl = import.meta.env.VITE_SUPABASE_URL;
const apiKey = import.meta.env.VITE_SUPABASE_API_KEY;

const supabase = createClient(apiUrl, apiKey);

export async function signIn(email) {
    const returnData = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
        }
    });
}

export function getCurrentSession() {
    return supabase.auth.getSession();
}

export async function syncNotes() {
    return await Promise.resolve();
}