import styled from 'styled-components';
import { format, isToday } from 'date-fns';

import Tag from '../../ui/Tag';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';

import { formatCurrency } from '../../utils/helpers';
import { formatDistanceFromNow } from '../../utils/helpers';
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiEye } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../check-in-out/useCheckout';
import Modal from '../../ui/Modal';
import { HiTrash } from 'react-icons/hi';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { useDeleteBooking } from './useDeleteBooking';

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: 'Sono';
`;

const Stacked = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    & span:first-child {
        font-weight: 500;
    }

    & span:last-child {
        color: var(--color-grey-500);
        font-size: 1.2rem;
    }
`;

const Amount = styled.div`
    font-family: 'Sono';
    font-weight: 500;
`;

function BookingRow({
    booking: {
        id: bookingId,
        created_at,
        start_date,
        end_date,
        nights_stay,
        total_guests,
        total_price,
        booking_status,
        Guests: { name: guest_name, email },
        Cabins: { name: cabin_name },
    },
}) {
    const statusToTagName = {
        unconfirmed: 'blue',
        'checked-in': 'green',
        'checked-out': 'silver',
    };

    const navigate = useNavigate();

    const { checkOut, isLoadingCheckout } = useCheckout();
    const { deleteBooking, isDeleting } = useDeleteBooking();

    return (
        <Table.Row>
            <Cabin>{cabin_name}</Cabin>

            <Stacked>
                <span>{guest_name}</span>
                <span>{email}</span>
            </Stacked>

            <Stacked>
                <span>
                    {isToday(new Date(start_date))
                        ? 'Today'
                        : formatDistanceFromNow(start_date)}{' '}
                    &rarr; {nights_stay} night stay
                </span>
                <span>
                    {format(new Date(start_date), 'MMM dd yyyy')} &mdash;{' '}
                    {format(new Date(end_date), 'MMM dd yyyy')}
                </span>
            </Stacked>

            <Tag type={statusToTagName[booking_status]}>
                {booking_status.replace('-', ' ')}
            </Tag>

            <Amount>{formatCurrency(total_price)}</Amount>

            <Modal>
                <Menus.Menu>
                    <Menus.Toggle id={bookingId} />
                    <Menus.List id={bookingId}>
                        <Menus.Button
                            icon={<HiEye />}
                            onClick={() => navigate(`/bookings/${bookingId}`)}
                        >
                            See Details
                        </Menus.Button>
                        {booking_status === 'unconfirmed' && (
                            <Menus.Button
                                icon={<HiArrowDownOnSquare />}
                                onClick={() =>
                                    navigate(`/checkin/${bookingId}`)
                                }
                            >
                                Check In
                            </Menus.Button>
                        )}

                        {booking_status === 'checked-in' && (
                            <Menus.Button
                                icon={<HiArrowUpOnSquare />}
                                onClick={() => checkOut(bookingId)}
                                disabled={isLoadingCheckout}
                            >
                                Check Out
                            </Menus.Button>
                        )}

                        <Modal.Open opens='delete-booking'>
                            <Menus.Button icon={<HiTrash />}>
                                Delete Booking
                            </Menus.Button>
                        </Modal.Open>
                    </Menus.List>
                </Menus.Menu>
                <Modal.Window name='delete-booking'>
                    <ConfirmDelete
                        resource='booking'
                        onConfirm={() => deleteBooking(bookingId)}
                        disabled={isDeleting}
                    />
                </Modal.Window>
            </Modal>
        </Table.Row>
    );
}

export default BookingRow;
