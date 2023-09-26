import BookingRow from './BookingRow';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Empty from '../../ui/Empty';
import { useBookings } from './useBookings';
import Spinner from '../../ui/Spinner';
import Pagination from '../../ui/Pagination';

function BookingTable() {
    const { bookingsData, isLoading, count } = useBookings();

    if (isLoading) {
        return <Spinner />;
    }

    if (bookingsData?.length === 0) {
        return <Empty resource='bookings' />;
    }

    return (
        <Menus>
            <Table columns='0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem'>
                <Table.Header>
                    <div>Cabin</div>
                    <div>Guest</div>
                    <div>Dates</div>
                    <div>Status</div>
                    <div>Amount</div>
                    <div></div>
                </Table.Header>

                <Table.Body
                    data={bookingsData}
                    render={(booking) => (
                        <BookingRow key={booking.id} booking={booking} />
                    )}
                />
            </Table>

            <Table.Footer>
                <Pagination count={count} />
            </Table.Footer>
        </Menus>
    );
}

export default BookingTable;
