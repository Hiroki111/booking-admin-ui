import { Route, Redirect } from 'react-router-dom';

import { useAuthContext } from '../../contexts/AuthContext';
import { ROUTES, Route as RouteObj } from '../../routes';

export function ProtectedRoute({ component: Component, ...rest }: RouteObj) {
  const { isFetchingUser, user } = useAuthContext();
  if (isFetchingUser) {
    return null;
  } else if (!user) {
    return <Redirect to={ROUTES.login} />;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
}
