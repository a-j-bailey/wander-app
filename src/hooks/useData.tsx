import React, { useCallback, useContext, useEffect, useState } from 'react';
import { LIGHT_THEME, DARK_THEME } from '../constants/theme';
import { Appearance, useColorScheme } from 'react-native';

export const DataContext = React.createContext({});

export const DataProvider = ({
    children
}: {
    children: React.ReactNode
}) => {
    const [isDark, setIsDark] = useState(false);
    const [theme, setTheme] = useState(LIGHT_THEME);
    const colorScheme = useColorScheme();

    // handle isDark mode
    const handleIsDark = useCallback(
        (payload: boolean) => {
            setIsDark(payload);
        },
        [setIsDark],
    );

    // Set isDark based on System Color Scheme
    useEffect(() => {
        setIsDark((colorScheme == 'dark'));
        setIsDark(true);
    }, []);

    // Set theme based on isDark value.
    useEffect(() => {
        setTheme(isDark ? DARK_THEME : LIGHT_THEME);
    }, [isDark]);

    const contextValue = {
        isDark,
        handleIsDark,
        theme,
        setTheme,
    };

    return (
        <DataContext.Provider value={contextValue}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext) as {
    isDark: boolean;
    handleIsDark: (isDark?: boolean) => void;
    theme;
    setTheme: (theme) => void;
};