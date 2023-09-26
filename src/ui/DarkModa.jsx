import React from 'react';
import ButtonIcon from './ButtonIcon';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi';
import { useDarkMode } from '../context/DarkModeContext';

const DarkModa = () => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    return (
        <ButtonIcon onClick={toggleDarkMode}>
            {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
        </ButtonIcon>
    );
};

export default DarkModa;
