import { useState } from 'react';

import { Body } from './Body';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useStyles } from './useStyles';

export function HomeContent() {
  const classes = useStyles();
  const [isDrawerIconClicked, setIsDrawerIconClicked] = useState<boolean>(false);

  return (
    <div>
      <Header onClickOpenDrawerIcon={() => setIsDrawerIconClicked(!isDrawerIconClicked)} />
      <div className={classes.content}>
        <Sidebar isDrawerIconClicked={isDrawerIconClicked} />
        <Body />
      </div>
    </div>
  );
}
