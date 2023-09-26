import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutAPI } from '../../services/apiAuth';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useLogout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: logout, isLoading } = useMutation({
        mutationFn: () => logoutAPI(),
        onSuccess: () => {
            toast.success('Logout successful');
            queryClient.removeQueries();
            navigate('/login', { replace: true });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return {
        logout,
        isLoading,
    };
}
