import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';

export function useCreateCabin() {
    const queryClient = useQueryClient();
    const { mutate: createCabin, isLoading } = useMutation({
        mutationFn: createEditCabin,
        onSuccess: () => {
            toast.success('Cabin created successfully!');
            queryClient.invalidateQueries({ queryKey: 'cabins' });
        },
        onError: (error) => toast.error(error.message),
    });

    return { createCabin, isLoading };
}
