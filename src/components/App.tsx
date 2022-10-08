import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import { LOGIN_PAGE_PATH, PATHS } from '../staticData/routes';
import { Home } from './Home';
import { Login } from './Login';
import { ProtectedRoute } from './ProtectedRoute';

export function App() {
  return (
    <Router>
      <Switch>
        <ProtectedRoute exact path={Object.values(PATHS)} component={Home} />
        <Route path={LOGIN_PAGE_PATH} component={Login} />
        <Redirect to={PATHS.calendar} />
      </Switch>
    </Router>
  );
}
