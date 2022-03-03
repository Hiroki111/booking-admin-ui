import { Container } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import { useIsSmallWindow } from '../../../../hooks/window';

import { PROTECTED_ROUTES } from '../../../../routes';
import { useStyles } from './useStyles';

export function Body() {
  const classes = useStyles();
  const isSmallWindow = useIsSmallWindow();

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={isSmallWindow ? classes.smallContainer : classes.container}>
        <Switch>
          {PROTECTED_ROUTES.map(({ exact, path, component }) => (
            <Route key={path as string} exact={exact} path={path} component={component} />
          ))}
        </Switch>
      </Container>
    </main>
  );
}
