import styled from 'styled-components';

import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import Spinner from '../../ui/Spinner';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from './useBooking';
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../check-in-out/useCheckout';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { useDeleteBooking } from './useDeleteBooking';

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

function BookingDetail() {
    const { bookingData, isLoading, error } = useBooking();
    const { checkOut, isLoadingCheckout } = useCheckout();
    const { deleteBooking, isDeleting } = useDeleteBooking();

    const moveBack = useMoveBack();
    const navigate = useNavigate();

    const statusToTagName = {
        unconfirmed: 'blue',
        'checked-in': 'green',
        'checked-out': 'silver',
    };

    if (isLoading) return <Spinner />;

    const status = bookingData.booking_status;
    const id = bookingData.id;

    return (
        <>
            <Row type='horizontal'>
                <HeadingGroup>
                    <Heading as='h1'>Booking #{id}</Heading>
                    <Tag type={statusToTagName[status]}>
                        {status.replace('-', ' ')}
                    </Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={bookingData} />

            <ButtonGroup>
                {status === 'unconfirmed' && (
                    <Button
                        icon={<HiArrowDownOnSquare />}
                        onClick={() => navigate(`/checkin/${id}`)}
                    >
                        Check In
                    </Button>
                )}

                {status === 'checked-in' && (
                    <Button
                        icon={<HiArrowUpOnSquare />}
                        onClick={() => checkOut(id)}
                        disabled={isLoadingCheckout}
                    >
                        Check Out
                    </Button>
                )}

                <Modal>
                    <Modal.Open opens='delete-booking'>
                        <Button $variation='danger'>Delete Booking</Button>
                    </Modal.Open>

                    <Modal.Window name='delete-booking'>
                        <ConfirmDelete
                            resource='booking'
                            onConfirm={() =>
                                deleteBooking(id, {
                                    onSettled: () => navigate(-1),
                                })
                            }
                            disabled={isDeleting}
                        />
                    </Modal.Window>
                </Modal>

                <Button $variation='secondary' onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default BookingDetail;
