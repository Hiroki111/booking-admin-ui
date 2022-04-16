import { Route, Redirect, RouteProps } from 'react-router-dom';

import { useAuthContext } from '../../contexts/AuthContext';
import { PATHS } from '../../staticData/routes';

export function ProtectedRoute({ component: Component, ...rest }: RouteProps) {
  const { isFetchingUser, user } = useAuthContext();
  if (isFetchingUser) {
    return null;
  } else if (!user) {
    return <Redirect to={PATHS.login} />;
  }

  return <Route {...rest} component={Component} />;
}
