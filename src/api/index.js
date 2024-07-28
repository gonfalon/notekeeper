import { createClient } from '@supabase/supabase-js'
import { omit, throttle } from 'lodash-es';

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

    return returnData;
}

export function getCurrentSession() {
    return supabase.auth.getSession();
}

async function syncNotesInternal(existingNotes) {

    const userId = (await getCurrentSession()).data.session?.user.id;

    const dirtyNotes = existingNotes?.filter(note => note.isDirty);
 
    if (dirtyNotes.length) {
        var toUpdate = dirtyNotes.map(note => ({...omit(note, ['id', 'isDirty']), user_id: userId }));
        console.log(toUpdate);

        const { error } = await supabase
            .from('notes')
            .upsert(toUpdate, { onConflict: 'note_id' });
        if (error) {
            console.log(error);
        }
    }

    const { data, error } = await supabase
        .from('notes')
        .select();

    if (error) {
        console.log(error);
        return false;
    }
    return data
}

export const syncNotes = throttle(syncNotesInternal, 10000)