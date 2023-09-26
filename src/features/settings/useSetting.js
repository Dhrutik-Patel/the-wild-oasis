import { useQuery } from '@tanstack/react-query';
import { getSettings } from '../../services/apiSettings';

export function useSetting() {
    const {
        isLoading,
        data: settingsData,
        error,
    } = useQuery({
        queryKey: ['settings'],
        queryFn: getSettings, // async function that returns data using axios/fetch etc.
    });

    return { isLoading, settingsData, error };
}
