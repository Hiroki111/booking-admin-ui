import ReactDOM from 'react-dom';

import { RootThemeProvider } from './theme/RootThemeProvider';
import { App } from './components/App';

ReactDOM.render(
  <RootThemeProvider>
    <App />
  </RootThemeProvider>,
  document.getElementById('root'),
);
