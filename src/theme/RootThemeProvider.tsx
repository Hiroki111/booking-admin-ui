import CssBaseline from '@mui/material/CssBaseline';
import {
  ThemeProvider,
  Theme,
  StyledEngineProvider,
  createTheme,
  responsiveFontSizes,
  adaptV4Theme,
} from '@mui/material/styles';
import './fonts.css';

import { grey } from '@mui/material/colors';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

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

const theme = responsiveFontSizes(createTheme(adaptV4Theme(themeConfig)));

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
