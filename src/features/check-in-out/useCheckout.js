import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useCheckout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: checkOut, isLoading: isLoadingCheckout } = useMutation({
        mutationFn: (bookingId) =>
            updateBooking(bookingId, {
                booking_status: 'checked-out',
            }),
        onSuccess: (data) => {
            toast.success(`Booking #${data.id} checked out`);
            queryClient.invalidateQueries({
                active: true,
            });
            navigate('/');
        },
        onError: (error) => {
            toast.error("Couldn't check out booking");
        },
    });

    return { checkOut, isLoadingCheckout };
}
