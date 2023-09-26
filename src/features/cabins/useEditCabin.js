import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import { toast } from 'react-hot-toast';

export const useEditCabins = () => {
    const queryClient = useQueryClient();
    const { mutate: editCabin } = useMutation({
        mutationFn: ({ newCabin, id }) => createEditCabin(newCabin, id),
        onSuccess: () => {
            toast.success('Cabin edited successfully!');
            queryClient.invalidateQueries({ queryKey: 'cabins' });
        },
        onError: (error) => toast.error(error.message),
    });

    return { editCabin };
};
