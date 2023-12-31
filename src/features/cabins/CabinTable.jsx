import { useQuery } from '@tanstack/react-query';
import React from 'react';
import styled from 'styled-components';
import { getCabins } from '../../services/apiCabins';
import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useCabins } from './useCabins';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';
import Empty from '../../ui/Empty';

const TableHeader = styled.header`
    display: grid;
    grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
    column-gap: 2.4rem;
    align-items: center;

    background-color: var(--color-grey-50);
    border-bottom: 1px solid var(--color-grey-100);
    text-transform: uppercase;
    letter-spacing: 0.4px;
    font-weight: 600;
    color: var(--color-grey-600);
    padding: 1.6rem 2.4rem;
`;

const CabinTable = () => {
    const { isLoading, cabinsData } = useCabins();
    const [searchParams] = useSearchParams();

    if (isLoading) {
        return <Spinner />;
    }

    if (cabinsData?.length === 0) {
        return <Empty resource='cabins' />;
    }

    // Filter cabins based on the search params

    const filterValue = searchParams.get('discount') || 'all';
    let filteredCabins;
    if (filterValue === 'all') {
        filteredCabins = cabinsData;
    } else if (filterValue === 'no-discount') {
        filteredCabins = cabinsData.filter((cabin) => cabin.discount === 0);
    } else if (filterValue === 'with-discount') {
        filteredCabins = cabinsData.filter((cabin) => cabin.discount > 0);
    }

    // Sort cabins based on the search params
    const sortValue = searchParams.get('sort') || 'name-asc';
    const [sortBy, direction] = sortValue.split('-');
    const sortedCabins = filteredCabins.sort((a, b) => {
        if (direction === 'asc') {
            return a[sortBy] > b[sortBy] ? 1 : -1;
        } else {
            return a[sortBy] < b[sortBy] ? 1 : -1;
        }
    });

    return (
        <Menus>
            <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
                <Table.Header>
                    <div></div>
                    <div>Cabins</div>
                    <div>Capacity</div>
                    <div>Price</div>
                    <div>Discount</div>
                    <div></div>
                </Table.Header>

                <Table.Body
                    data={filteredCabins}
                    render={(cabin) => (
                        <CabinRow cabin={cabin} key={cabin.id} />
                    )}
                />
            </Table>
        </Menus>
    );
};

export default CabinTable;
