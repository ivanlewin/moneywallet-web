import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState } from 'react';
import { PaletteMode, useMediaQuery } from '@mui/material';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2196F3'
    }
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196F3'
    }
  },
});

type ThemeProviderProps = {
  children: React.ReactNode;
};
const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [paletteMode, setPaletteMode] = useState<PaletteMode>('dark');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  useEffect(() => {
    setPaletteMode(prefersDarkMode ? 'dark' : 'light');
  }, [prefersDarkMode]);

  return (
    <MUIThemeProvider theme={paletteMode === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};


export default ThemeProvider;