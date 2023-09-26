import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfile } from '../../services/apiAuth';
import { toast } from 'react-hot-toast';

export function useUpdateUser() {
    const queryClient = useQueryClient();

    const { mutate: updateUser, isLoading: isUpdating } = useMutation({
        mutationFn: updateProfile,
        onSuccess: () => {
            queryClient.invalidateQueries('user');
            toast.success('Profile updated successfully!');
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return {
        updateUser,
        isUpdating,
    };
}
