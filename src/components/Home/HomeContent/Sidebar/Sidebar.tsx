import { Drawer } from '@material-ui/core';
import clsx from 'clsx';

import { useIsSmallWindow } from '../../../../hooks/window';
import { DrawerList } from '../DrawerList';
import { useStyles } from './useStyles';

export function Sidebar() {
  const classes = useStyles();
  const isSmallWindow = useIsSmallWindow();

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, isSmallWindow && classes.drawerPaperClose),
      }}
    >
      <DrawerList />
    </Drawer>
  );
}
