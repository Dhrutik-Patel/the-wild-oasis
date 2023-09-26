import styled from 'styled-components';
import { useRecentBookings } from './useRecentBookings';
import { useRecentStays } from './useRecentStays';
import Spinner from '../../ui/Spinner';
import Stats from './Stats';
import { useCabins } from '../cabins/useCabins';
import SalesChart from './SalesChart';
import DuretionChart from './DurationChart';
import Today from '../check-in-out/TodayActivity';

const StyledDashboardLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto 34rem auto;
    gap: 2.4rem;
`;

const DashboardLayout = () => {
    const { bookings, isLoading: isLoading1 } = useRecentBookings();
    const { confirmedStays, isLoading: isLoading2, numDays } = useRecentStays();
    const { cabinsData, isLoading: isCabinsLoading } = useCabins();

    if (isLoading1 || isLoading2) {
        return <Spinner />;
    }

    return (
        <StyledDashboardLayout>
            <Stats
                bookings={bookings}
                confirmedStays={confirmedStays}
                numDays={numDays}
                cabinCount={cabinsData.length}
                isLoading={isLoading1 || isLoading2 || isCabinsLoading}
            />
            <Today />
            <DuretionChart confirmedStays={confirmedStays} />
            <SalesChart bookings={bookings} numOfDays={numDays} />
        </StyledDashboardLayout>
    );
};

export default DashboardLayout;
