import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import { PATHS, PROTECTED_PATHS } from '../staticData/routes';
import { Home } from './Home';
import { Login } from './Login';
import { ProtectedRoute } from './ProtectedRoute';

export function App() {
  return (
    <Router>
      <Switch>
        <ProtectedRoute exact path={PROTECTED_PATHS} component={Home} />
        <Route path={PATHS.login} component={Login} />
        <Redirect to={PATHS.calendar} />
      </Switch>
    </Router>
  );
}
