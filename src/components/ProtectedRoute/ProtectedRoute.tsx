import { Route, Redirect, RouteProps } from 'react-router-dom';

import { useAuthContext } from '../../contexts/AuthContext';
import { ROUTES } from '../../routes';

export function ProtectedRoute({ component: Component, ...rest }: RouteProps) {
  const { isFetchingUser, user } = useAuthContext();
  if (isFetchingUser) {
    return null;
  } else if (!user) {
    return <Redirect to={ROUTES.login} />;
  }

  return <Route {...rest} component={Component} />;
}
