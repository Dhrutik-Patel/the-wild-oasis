import React from 'react';
import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';
import Spinner from '../../ui/Spinner';
import CreateCabinForm from './CreateCabinForm';
import { useDeleteCabin } from './useDeleteCabin';
import { useCreateCabin } from './useCreateCabin';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { HiDuplicate } from 'react-icons/hi';
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';

const Img = styled.img`
    display: block;
    width: 6.4rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: center;
    transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: 'Sono';
`;

const Price = styled.div`
    font-family: 'Sono';
    font-weight: 600;
`;

const Discount = styled.div`
    font-family: 'Sono';
    font-weight: 500;
    color: var(--color-green-700);
`;

const CabinRow = ({ cabin }) => {
    const { isLoading: isDeleting, data, deleteCabin } = useDeleteCabin(cabin);
    const { isLoading: isCreating, createCabin } = useCreateCabin();

    const isLoading = isDeleting || isCreating;

    const handleDuplicate = (cabin) => {
        const {
            name,
            max_capacity,
            regular_price,
            discount,
            image,
            description,
        } = cabin;

        createCabin({
            name: `${cabin.name} (copy)`,
            max_capacity,
            regular_price,
            discount,
            image,
            description,
        });
    };

    if (isLoading) return <Spinner />;

    return (
        <Table.Row role='row'>
            <Img src={cabin.image} alt={cabin.name} />
            <Cabin>{cabin.name}</Cabin>
            <div>{cabin.max_capacity}</div>
            <Price>{formatCurrency(cabin.regular_price)}</Price>
            {cabin.discount ? (
                <Discount>{formatCurrency(cabin.discount)}</Discount>
            ) : (
                <span>&mdash;</span>
            )}
            <div>
                <Modal>
                    <Menus.Menu>
                        <Menus.Toggle id={cabin.id} />
                        <Menus.List id={cabin.id}>
                            <Menus.Button
                                icon={<HiDuplicate />}
                                onClick={() => handleDuplicate(cabin)}
                            >
                                Duplicate
                            </Menus.Button>
                            <Modal.Open opens='cabin-edit'>
                                <Menus.Button icon={<FiEdit />}>
                                    Edit
                                </Menus.Button>
                            </Modal.Open>

                            <Modal.Open opens='cabin-delete'>
                                <Menus.Button icon={<MdDelete />}>
                                    Delete
                                </Menus.Button>
                            </Modal.Open>
                        </Menus.List>

                        <Modal.Window name='cabin-edit'>
                            <CreateCabinForm cabinToEdit={cabin} />
                        </Modal.Window>
                        <Modal.Window name='cabin-delete'>
                            <ConfirmDelete
                                resource='cabins'
                                disabled={isDeleting}
                                onConfirm={() => deleteCabin(cabin.id)}
                            />
                        </Modal.Window>
                    </Menus.Menu>
                </Modal>
            </div>
        </Table.Row>
    );
};

export default CabinRow;
