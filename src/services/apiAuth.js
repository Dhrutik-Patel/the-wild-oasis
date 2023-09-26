import supabase, { supabaseUrl } from './supabase';

export async function login({ email, password }) {
    let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function getCurrentUser() {
    const { data: session } = await supabase.auth.getSession();

    if (!session.session) {
        return null;
    }

    const { data: user, error } = await supabase.auth.getUser();

    if (error) {
        throw new Error(error.message);
    }

    return user?.user;
}

export async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
        throw new Error(error.message);
    }
}

export async function register({ fullName, email, password }) {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                fullName,
                avatar: '',
            },
        },
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function updateProfile({ fullName, avatar, password }) {
    let updateDate;

    if (password) {
        updateDate = { password };
    }

    if (fullName) {
        updateDate = { data: { fullName } };
    }

    const { data, error } = await supabase.auth.updateUser(updateDate);

    if (error) {
        throw new Error(error.message);
    }

    if (!avatar) {
        return data;
    }

    const fileName = `avatar-${data.user.id}-${Date.now()}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
        .from('AVATARS')
        .upload(fileName, avatar);

    if (uploadError) {
        throw new Error(uploadError.message);
    }

    const { data: updatedUser, error: updateAvatarError } =
        await supabase.auth.updateUser({
            data: {
                avatar: `${supabaseUrl}/storage/v1/object/public/AVATARS/${fileName}`,
            },
        });

    if (updateAvatarError) {
        throw new Error(updateAvatarError.message);
    }

    return updatedUser;
}
