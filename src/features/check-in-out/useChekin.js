import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useCheckin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate: checkIn, isLoading } = useMutation({
        mutationFn: ({ bookingId, breakfast }) =>
            updateBooking(bookingId, {
                booking_status: 'checked-in',
                is_paid: true,
                ...breakfast,
            }),
        onSuccess: (data) => {
            toast.success(`Booking #${data.id} checked in`);
            queryClient.invalidateQueries({
                active: true,
            });
            navigate('/');
        },
        onError: (error) => {
            toast.error("Couldn't check in booking");
        },
    });

    return { checkIn, isLoading };
}
