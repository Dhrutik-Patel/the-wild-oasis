import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';

export function useCabins() {
    const {
        isLoading,
        data: cabinsData,
        error,
    } = useQuery({
        queryKey: ['cabins'],
        queryFn: getCabins, // async function that returns data using axios/fetch etc.
    });

    return { isLoading, cabinsData, error };
}
