import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { createPortal } from 'react-dom';
import { cloneElement } from 'react';
import { useOutsideClicks } from '../hooks/useOutsideClicks';

const StyledModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-lg);
    padding: 3.2rem 4rem;
    transition: all 0.5s;
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: var(--backdrop-color);
    backdrop-filter: blur(4px);
    z-index: 1000;
    transition: all 0.5s;
`;

const Button = styled.button`
    background: none;
    border: none;
    padding: 0.4rem;
    border-radius: var(--border-radius-sm);
    transform: translateX(0.8rem);
    transition: all 0.2s;
    position: absolute;
    top: 1rem;
    right: 1.25rem;

    &:hover {
        background-color: var(--color-grey-100);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        /* Sometimes we need both */
        /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
        color: var(--color-grey-500);
    }
`;

const ModalContext = React.createContext();

const Modal = ({ children }) => {
    const [openName, setOpenName] = useState('');

    const openModal = (name) => setOpenName(name);
    const closeModal = () => setOpenName('');

    return (
        <ModalContext.Provider value={{ openModal, closeModal, openName }}>
            {children}
        </ModalContext.Provider>
    );
};

Modal.Open = ({ children, opens: opensWindowName }) => {
    const { openModal } = useContext(ModalContext);

    return cloneElement(children, {
        onClick: () => openModal(opensWindowName),
    });
};

Modal.Window = ({ children, name }) => {
    const { openName, closeModal } = useContext(ModalContext);
    const ref = useOutsideClicks(closeModal);

    if (name !== openName) return null;

    return createPortal(
        <Overlay>
            <StyledModal ref={ref}>
                <Button onClick={() => closeModal()}>
                    <AiOutlineClose />
                </Button>
                <div>
                    {cloneElement(children, {
                        onCloseModal: closeModal,
                    })}
                </div>
            </StyledModal>
        </Overlay>,
        document.body
    );
};

export default Modal;
