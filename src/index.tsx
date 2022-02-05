import ReactDOM from 'react-dom';

import { RootThemeProvider } from './theme/RootThemeProvider';
import { App } from './components/App';
import { AuthContextProvider } from './contexts/AuthContext';

ReactDOM.render(
  <RootThemeProvider>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </RootThemeProvider>,
  document.getElementById('root'),
);
