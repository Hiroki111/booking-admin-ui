import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

import './fonts.css';

const theme = createTheme({
  typography: {
    fontFamily: ['Open Sans'].join(','),
  },
  palette: {
    primary: {
      main: grey[900],
    },
  },
});

export function RootThemeProvider({ children }: { children: JSX.Element | JSX.Element[] }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
