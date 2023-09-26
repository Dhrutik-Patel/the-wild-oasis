import React, { useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

const DarkModeContextAPI = React.createContext();

const DarkModeContext = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useLocalStorageState(
        false,
        'isDarkMode'
    );

    function toggleDarkMode() {
        setIsDarkMode(!isDarkMode);
    }

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark-mode');
            document.documentElement.classList.remove('light-mode');
        } else {
            document.documentElement.classList.remove('dark-mode');
            document.documentElement.classList.add('light-mode');
        }
    }, [isDarkMode]);

    return (
        <DarkModeContextAPI.Provider
            value={{
                isDarkMode,
                toggleDarkMode,
            }}
        >
            {children}
        </DarkModeContextAPI.Provider>
    );
};

export const useDarkMode = () => {
    const context = React.useContext(DarkModeContextAPI);
    if (context === undefined) {
        throw new Error('useDarkMode must be used within a DarkModeContext');
    }

    return context;
};

export default DarkModeContext;
