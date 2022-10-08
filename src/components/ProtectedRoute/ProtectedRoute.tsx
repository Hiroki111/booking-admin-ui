import { Route, Redirect, RouteProps } from 'react-router-dom';

import { useAuthContext } from '../../contexts/AuthContext';
import { LOGIN_PAGE_PATH } from '../../staticData/routes';

export function ProtectedRoute({ component: Component, ...rest }: RouteProps) {
  const { isFetchingUser, user } = useAuthContext();
  if (isFetchingUser) {
    return null;
  } else if (!user) {
    return <Redirect to={LOGIN_PAGE_PATH} />;
  }

  return <Route {...rest} component={Component} />;
}
