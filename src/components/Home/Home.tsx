import { Route, Switch } from 'react-router-dom';
import { PROTECTED_ROUTES } from '../../routes';
import { Header } from './Header';

export function Home() {
  return (
    <>
      <Header />
      <Switch>
        {PROTECTED_ROUTES.map(({ exact, path, component: Component }) => (
          <Route key={path as string} exact={exact} path={path} component={Component} />
        ))}
      </Switch>
    </>
  );
}
