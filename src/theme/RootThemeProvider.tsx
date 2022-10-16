import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, StyledEngineProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import './fonts.css';

import { grey } from '@mui/material/colors';

export const themeConfig = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: ['Open Sans'].join(','),
  },
  palette: {
    primary: {
      main: grey[900],
    },
  },
};

const theme = responsiveFontSizes(createTheme(themeConfig));

export function RootThemeProvider({ children }: { children: JSX.Element | JSX.Element[] }) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
