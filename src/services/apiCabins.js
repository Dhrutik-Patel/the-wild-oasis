import supabase, { supabaseUrl } from './supabase';

export const getCabins = async () => {
    let { data, error } = await supabase.from('Cabins').select('*');

    if (error) {
        throw new Error("Sorry, we couldn't fetch the cabins right now.");
    }

    return data;
};

export const createEditCabin = async (newCabin, id) => {
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

    const imageName = `${Math.random()}-${newCabin.image.name}.jpg`.replaceAll(
        '/',
        ''
    );
    const imagePath = hasImagePath
        ? newCabin.image
        : `${supabaseUrl}/storage/v1/object/public/Cabin-Images/${imageName}`;

    // Insert cabin details along with image path
    let query = supabase.from('Cabins');

    // CREATE
    if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

    // EDIT
    if (id)
        query = query.update({ ...newCabin, image: imagePath }).match({ id });

    let { data, error } = await query.select().single();

    if (error) {
        throw new Error("Oops! The cabin couldn't be created.");
    }

    if (hasImagePath) return data;

    // Upload the image to Supabase Storage
    const { error: uploadError } = await supabase.storage
        .from('Cabin-Images')
        .upload(imageName, newCabin.image);

    if (uploadError) {
        await supabase.from('Cabins').delete().match({ id: data.id });
        throw new Error('Error uploading cabin image');
    }

    return data;
};

export const deleteCabin = async (id) => {
    let { data, error } = await supabase.from('Cabins').delete().match({ id });

    if (error) {
        throw new Error("Oops! The cabin couldn't be deleted.");
    }

    return data;
};
