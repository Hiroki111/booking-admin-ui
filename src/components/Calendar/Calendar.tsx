import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import clsx from 'clsx';

import { useStyles } from './useStyles';
import { ROUTES } from '../../routes';
import restApi from '../../network/restApi';

interface Props {
  isDrawerOpening: boolean;
  handleDrawerOpen: () => void;
}

export function Calendar({ isDrawerOpening, handleDrawerOpen }: Props) {
  const classes = useStyles();
  const history = useHistory();

  async function handleClickLogout() {
    try {
      const res = await restApi.logout();
      if (res.status !== 200) {
        throw new Error('logout failed');
      }
      history.push(ROUTES.login);
    } catch (error) {
      alert('Error logging out. Please try again later.');
    }
  }

  return (
    <AppBar position="absolute" className={clsx(classes.appBar, isDrawerOpening && classes.appBarShift)}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, isDrawerOpening && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          Dashboard
        </Typography>
        <IconButton className={classes.logout} onClick={handleClickLogout}>
          <ExitToAppIcon color="inherit" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
