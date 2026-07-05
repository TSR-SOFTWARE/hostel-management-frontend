import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { getTheme } from '@theme/index';
import type { ThemeModeType } from '@appTypes/common.types';

interface ThemeContextType {
  mode: ThemeModeType;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({ mode: 'light', toggleTheme: () => {} });

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeModeType>(
    () => (localStorage.getItem('hms_theme') as ThemeModeType) ?? 'light'
  );

  useEffect(() => { localStorage.setItem('hms_theme', mode); }, [mode]);

  const toggleTheme = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={getTheme(mode)}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
