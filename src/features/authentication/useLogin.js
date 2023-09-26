import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginAPI } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: login, isLoading } = useMutation({
        mutationFn: ({ email, password }) => loginAPI({ email, password }),
        onSuccess: (data) => {
            toast.success('Logged in successfully!');

            queryClient.setQueryData(['user'], data.user);
            navigate('/dashboard', { replace: true });
        },
        onError: (error) => {
            toast.error('Invalid login credentials!');
        },
    });

    return { login, isLoading };
}
