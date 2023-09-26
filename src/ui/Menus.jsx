import React from 'react';
import styled from 'styled-components';
import { HiDotsHorizontal } from 'react-icons/hi';
import { createPortal } from 'react-dom';
import { useOutsideClicks } from '../hooks/useOutsideClicks';

const Menu = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const StyledToggle = styled.button`
    background: none;
    border: none;
    padding: 0.4rem;
    border-radius: var(--border-radius-sm);
    transform: translateX(0.8rem);
    transition: all 0.2s;

    &:hover {
        background-color: var(--color-grey-100);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        color: var(--color-grey-700);
    }
`;

const StyledList = styled.ul`
    position: fixed;

    background-color: var(--color-grey-0);
    box-shadow: var(--shadow-md);
    border-radius: var(--border-radius-md);

    right: ${(props) => props.position.x}px;
    top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    padding: 1.2rem 2.4rem;
    font-size: 1.4rem;
    transition: all 0.2s;

    display: flex;
    align-items: center;
    gap: 1.6rem;

    &:hover {
        background-color: var(--color-grey-50);
    }

    & svg {
        width: 1.6rem;
        height: 1.6rem;
        color: var(--color-grey-400);
        transition: all 0.3s;
    }
`;

const MenuContext = React.createContext();

const Menus = ({ children }) => {
    const [openId, setOpenId] = React.useState(null);
    const [position, setPosition] = React.useState(null);

    const open = (id) => setOpenId(id);
    const close = () => setOpenId(null);

    return (
        <MenuContext.Provider
            value={{ openId, open, close, position, setPosition }}
        >
            {children}
        </MenuContext.Provider>
    );
};

Menus.Toggle = ({ id }) => {
    const { openId, open, close, setPosition } = React.useContext(MenuContext);

    const handleClick = (e) => {
        const rect = e.target.closest('button').getBoundingClientRect();

        setPosition({
            x: window.innerWidth - rect.x - rect.width,
            y: rect.y + rect.height + 8,
        });

        openId === '' || openId !== id ? open(id) : close();
    };

    return (
        <StyledToggle onClick={handleClick}>
            <HiDotsHorizontal />
        </StyledToggle>
    );
};

Menus.List = ({ id, children }) => {
    const { openId, close, position } = React.useContext(MenuContext);

    const ref = useOutsideClicks(close);

    if (openId !== id) return null;

    return createPortal(
        <StyledList position={position} ref={ref}>
            {children}
        </StyledList>,
        document.body
    );
};

Menus.Button = ({ children, icon, onClick }) => {
    const { close } = React.useContext(MenuContext);

    const handleClick = () => {
        close();
        onClick?.();
    };

    return (
        <li>
            <StyledButton onClick={handleClick}>
                {icon}
                <span>{children}</span>
            </StyledButton>
        </li>
    );
};

Menus.Menu = Menu;

export default Menus;
