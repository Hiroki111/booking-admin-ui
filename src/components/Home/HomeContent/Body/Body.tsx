import { Box, Toolbar } from '@mui/material';
import { Switch, Route } from 'react-router-dom';

import { MODULE_ROUTES } from '../../../../staticData/routes';

export function Body() {
  return (
    <Box component="main" sx={{ flexGrow: 1, height: '100vh', overflow: 'auto' }}>
      <Toolbar />
      <Box maxWidth="lg" sx={(theme) => ({ p: theme.spacing(1) })}>
        <Switch>
          {MODULE_ROUTES.map(({ exact, path, component }) => (
            <Route key={path as string} exact={exact} path={path} component={component} />
          ))}
        </Switch>
      </Box>
    </Box>
  );
}
