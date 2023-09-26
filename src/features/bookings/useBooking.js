import { useQuery } from '@tanstack/react-query';
import { getBooking } from '../../services/apiBookings';
import { useParams, useSearchParams } from 'react-router-dom';

export function useBooking() {
    const { bookingId } = useParams();

    const {
        isLoading,
        data: bookingData,
        error,
    } = useQuery({
        queryKey: ['booking', bookingId],
        queryFn: () => getBooking(bookingId), // async function that returns data using axios/fetch etc.
        retry: false,
    });

    return { isLoading, bookingData, error };
}
