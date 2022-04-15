import { Container } from '@mui/material';
import { Switch, Route } from 'react-router-dom';

import { MODULE_ROUTES } from '../../../../routes';
import { useStyles } from './useStyles';

export function Body() {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Switch>
          {MODULE_ROUTES.map(({ exact, path, component }) => (
            <Route key={path as string} exact={exact} path={path} component={component} />
          ))}
        </Switch>
      </Container>
    </main>
  );
}
