import { Drawer } from '@mui/material';

import { DrawerList } from '../DrawerList';
import * as sx from './styles';

export function Sidebar() {
  return (
    <Drawer variant="permanent" sx={sx.drawerPaper}>
      <DrawerList />
    </Drawer>
  );
}
