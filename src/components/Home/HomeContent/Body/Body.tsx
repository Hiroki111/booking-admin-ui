import { Box, Toolbar } from '@mui/material';
import { Switch, Route } from 'react-router-dom';

import { MODULE_ROUTES } from '../../../../staticData/routes';
import { sx } from './styles';

export function Body() {
  return (
    <Box component="main" sx={sx.mainWrapper}>
      <Toolbar />
      <Box maxWidth="lg" sx={sx.contentWrapper}>
        <Switch>
          {MODULE_ROUTES.map(({ exact, path, component }) => (
            <Route key={path as string} exact={exact} path={path} component={component} />
          ))}
        </Switch>
      </Box>
    </Box>
  );
}
