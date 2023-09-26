import { useMutation } from '@tanstack/react-query';
import { register as registerAPI } from '../../services/apiAuth';
import { toast } from 'react-hot-toast';

export function useRegister() {
    const { mutate: signup, isLoading } = useMutation({
        mutationFn: registerAPI,
        onSuccess: () => {
            toast.success('User registered successfully');
        },
    });

    return {
        signup,
        isLoading,
    };
}
