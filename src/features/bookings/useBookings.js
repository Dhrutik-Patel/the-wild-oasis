import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';

export function useBookings() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();

    // FILTER
    const filterValues = searchParams.get('status');
    const filter =
        !filterValues || filterValues === 'all'
            ? null
            : { field: 'booking_status', value: filterValues };

    // SORT

    const sortByRaw = searchParams.get('sort') || 'start_date-desc';
    const [field, direction] = sortByRaw.split('-');
    const sortBy = { field, direction };

    // PAGINATION

    const page = +searchParams.get('page') || 1;

    const {
        isLoading,
        data: { data: bookingsData, count } = {},
        error,
    } = useQuery({
        queryKey: ['bookings', filter, sortBy, page],
        queryFn: () => getBookings({ filter, sortBy, page }), // async function that returns data using axios/fetch etc.
    });

    // PRE-FETCHING

    const pageCount = Math.ceil(count / 10);

    if (page < pageCount) {
        queryClient.prefetchQuery({
            queryKey: ['bookings', filter, sortBy, +page + 1],
            queryFn: () => getBookings({ filter, sortBy, page: +page + 1 }), // async function that returns data using axios/fetch etc.
        });
    }

    if (page > 1) {
        queryClient.prefetchQuery({
            queryKey: ['bookings', filter, sortBy, +page - 1],
            queryFn: () => getBookings({ filter, sortBy, page: +page - 1 }), // async function that returns data using axios/fetch etc.
        });
    }

    return { isLoading, bookingsData, error, count };
}
