import React from 'react';
import Stat from './Stat';
import { HiOutlineBriefcase, HiOutlineChartBar } from 'react-icons/hi';
import { HiOutlineBanknotes, HiOutlineCalendarDays } from 'react-icons/hi2';
import { formatCurrency } from '../../utils/helpers';

const Stats = ({
    bookings = [],
    confirmedStays = [],
    numDays = 0,
    cabinCount = 0,
    isLoading,
}) => {
    const numBookings = bookings.length;
    const sales = bookings.reduce((acc, cur) => acc + cur.total_price, 0);
    const checkins = confirmedStays.length;
    const occupation =
        confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
        (numDays * cabinCount);

    return (
        <>
            <Stat
                title='Bookings'
                color='blue'
                icon={<HiOutlineBriefcase />}
                value={numBookings}
                isLoading={isLoading}
            />

            <Stat
                title='Sales'
                color='green'
                icon={<HiOutlineBanknotes />}
                value={formatCurrency(sales)}
                isLoading={isLoading}
            />
            <Stat
                title='Check ins'
                color='indigo'
                icon={<HiOutlineCalendarDays />}
                value={checkins}
                isLoading={isLoading}
            />
            <Stat
                title='Occupancy rate'
                color='yellow'
                icon={<HiOutlineChartBar />}
                value={Math.round(occupation * 100) + '%'}
                isLoading={isLoading}
            />
        </>
    );
};

export default Stats;
