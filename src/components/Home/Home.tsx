import { useState } from 'react';

import { Body } from './Body';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useStyles } from './useStyles';

export function Home() {
  const classes = useStyles();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  return (
    <div className={classes.content}>
      <Header isDrawerOpen={isDrawerOpen} onClickOpenDrawerIcon={() => setIsDrawerOpen(true)} />
      <Sidebar isDrawerOpen={isDrawerOpen} onClickCloseDrawerIcon={() => setIsDrawerOpen(false)} />
      <Body />
    </div>
  );
}
