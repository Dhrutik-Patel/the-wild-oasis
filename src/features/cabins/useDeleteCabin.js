import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabin as deleteCabinAPI } from '../../services/apiCabins';
import { toast } from 'react-hot-toast';

export function useDeleteCabin(cabin) {
    const queryClient = useQueryClient();
    const {
        isLoading,
        data,
        mutate: deleteCabin,
    } = useMutation({
        mutationFn: () => deleteCabinAPI(cabin.id),
        onSuccess: () => {
            toast.success(`Cabin ${cabin.name} deleted successfully.`);
            queryClient.invalidateQueries({ queryKey: 'cabins' });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { isLoading, data, deleteCabin };
}
