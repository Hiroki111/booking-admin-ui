import { Route, Redirect } from 'react-router-dom';

import { ROUTES, Route as RouteObj } from '../../routes';

export function ProtectedRoute({ component: Component, ...rest }: RouteObj) {
  // Update this with a context
  const auth = { isAuthenticated: true };
  return (
    <Route
      {...rest}
      render={(props) => {
        return auth.isAuthenticated ? <Component {...props} /> : <Redirect to={ROUTES.login} />;
      }}
    />
  );
}
