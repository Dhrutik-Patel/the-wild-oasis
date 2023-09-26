import styled from 'styled-components';
import BookingDataBox from '../../features/bookings/BookingDataBox';

import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import Spinner from '../../ui/Spinner';
import Checkbox from '../../ui/Checkbox';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from '../../features/bookings/useBooking';
import { useEffect, useState } from 'react';
import { formatCurrency } from '../../utils/helpers';
import { useCheckin } from './useChekin';
import { useSetting } from '../settings/useSetting';

const Box = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    padding: 2.4rem 4rem;
`;

function CheckinBooking() {
    const { bookingData, isLoading } = useBooking();
    const [confirmPaid, setConfirmPaid] = useState();
    const [addBreakfast, setAddBeaskfast] = useState();
    const moveBack = useMoveBack();
    const { checkIn, isLoading: checkInLoading } = useCheckin();
    const { settingsData, isLoading: isLoadingSettings } = useSetting();

    const breakfastPrice =
        +settingsData?.breakfast_price * bookingData?.nights_stay +
        bookingData?.total_guests;

    useEffect(() => {
        if (bookingData?.is_paid) {
            setConfirmPaid(true);
        }
    }, [bookingData]);

    function handleCheckin() {
        if (!confirmPaid) return;

        if (addBreakfast) {
            checkIn({
                bookingId: bookingData?.id,
                breakfast: {
                    has_breakfast: true,
                    extras_price: breakfastPrice,
                    total_price: bookingData?.total_price + breakfastPrice,
                },
            });
            return;
        } else {
            checkIn({
                bookingId: bookingData?.id,
                breakfast: {},
            });
        }
    }

    if (isLoading || isLoadingSettings) {
        return <Spinner />;
    }

    return (
        <>
            <Row type='horizontal'>
                <Heading as='h1'>Check in booking #{bookingData?.id}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={bookingData} />

            {!bookingData?.has_breakfast && (
                <Box>
                    <Checkbox
                        checked={addBreakfast}
                        onChange={() =>
                            setAddBeaskfast((add) => {
                                setConfirmPaid(false);
                                return !add;
                            })
                        }
                        id='beakfast'
                    >
                        Want to add breakfast for an extra{' '}
                        {formatCurrency(breakfastPrice)}
                    </Checkbox>
                </Box>
            )}

            <Box>
                <Checkbox
                    value={confirmPaid}
                    onChange={() => setConfirmPaid(!confirmPaid)}
                    id='confirm'
                    disabled={confirmPaid || checkInLoading}
                >
                    I confirm that {bookingData?.Guests?.name} has paid the full
                    amount of{' '}
                    {!addBreakfast
                        ? formatCurrency(bookingData?.total_price)
                        : formatCurrency(
                              bookingData?.total_price + breakfastPrice
                          )}
                    .
                </Checkbox>
            </Box>

            <ButtonGroup>
                <Button
                    onClick={handleCheckin}
                    disabled={!confirmPaid || checkInLoading}
                >
                    Check in booking #{bookingData?.id}
                </Button>
                <Button $variation='secondary' onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default CheckinBooking;
