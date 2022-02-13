import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

import './fonts.css';

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
