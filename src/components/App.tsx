import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import { PATHS, PROTECTED_ROUTES } from '../routes';
import { Home } from './Home';
import { Login } from './Login';
import { ProtectedRoute } from './ProtectedRoute';

export function App() {
  const protectedRoutesPaths = PROTECTED_ROUTES.map((route) => route.path as string);

  return (
    <Router>
      <Switch>
        <ProtectedRoute exact path={protectedRoutesPaths} component={Home} />
        <Route path={PATHS.login} component={Login} />
        <Redirect to={PATHS.login} />
      </Switch>
    </Router>
  );
}
