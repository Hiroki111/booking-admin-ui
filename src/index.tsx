import ReactDOM from 'react-dom';
import { SnackbarProvider } from 'notistack';

import { RootThemeProvider } from './theme/RootThemeProvider';
import { App } from './components/App';
import { AuthContextProvider } from './contexts/AuthContext';

ReactDOM.render(
  <RootThemeProvider>
    <AuthContextProvider>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        maxSnack={3}
      >
        <App />
      </SnackbarProvider>
    </AuthContextProvider>
  </RootThemeProvider>,
  document.getElementById('root'),
);
