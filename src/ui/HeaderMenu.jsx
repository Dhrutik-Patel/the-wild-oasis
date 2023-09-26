import React from 'react';
import styled from 'styled-components';
import Logout from '../features/authentication/Logout';
import ButtonIcon from './ButtonIcon';
import { HiOutlineUser } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import DarkModa from './DarkModa';

const StyledHeaderMenu = styled.ul`
    display: flex;
    gap: 0.4rem;
`;

const HeaderMenu = () => {
    const navigate = useNavigate();

    return (
        <StyledHeaderMenu>
            <li>
                <ButtonIcon onClick={() => navigate('/account')}>
                    <HiOutlineUser />
                </ButtonIcon>
            </li>
            <li>
                <DarkModa />
            </li>
            <li>
                <Logout />
            </li>
        </StyledHeaderMenu>
    );
};

export default HeaderMenu;
