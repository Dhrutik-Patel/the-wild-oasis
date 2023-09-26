import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSetting } from '../../services/apiSettings';
import { toast } from 'react-hot-toast';

export function useEditSettings() {
    const queryClient = useQueryClient();
    const { mutate: editSetting, isLoading } = useMutation({
        mutationFn: updateSetting,
        onSuccess: () => {
            toast.success('Settings edited successfully!');
            queryClient.invalidateQueries({ queryKey: 'settings' });
        },
        onError: (error) => toast.error(error.message),
    });

    return { editSetting, isLoading };
}
