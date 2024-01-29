import React, { useCallback, useContext, useEffect, useState } from 'react';
import { LIGHT_THEME, DARK_THEME } from '../constants/theme';
import { Appearance, useColorScheme } from 'react-native';
import { TagType } from '../services/TagService';

export const DataContext = React.createContext({});

export const DataProvider = ({
    children
}: {
    children: React.ReactNode
}) => {
    const [isDark, setIsDark] = useState(false);
    const [theme, setTheme] = useState(LIGHT_THEME);
    const [activeTag, setActiveTag] = useState<TagType | null>(null);
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
        // setIsDark(true);
    }, []);

    // Set theme based on isDark value.
    useEffect(() => {
        setTheme(isDark ? DARK_THEME : LIGHT_THEME);
    }, [isDark]);

    // TAGS:
    const selectTag = useCallback(
        (payload: TagType) => {
            setActiveTag(payload);
        },
        [setActiveTag],
    );

    const contextValue = {
        isDark,
        handleIsDark,
        theme,
        setTheme,
        activeTag,
        selectTag
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
    activeTag: TagType | null,
    selectTag: (payload: TagType) => void;
};