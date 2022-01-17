import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import { ROUTES } from '../routes';
import { Calendar } from './Calendar';
import { Login } from './Login';

export function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={[ROUTES.calendar]} component={Calendar} />
        <Route path={ROUTES.login} component={Login} />
        <Redirect to={ROUTES.login} />
      </Switch>
    </Router>
  );
}
