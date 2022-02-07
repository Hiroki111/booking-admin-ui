import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Grid } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import clsx from 'clsx';

import { useStyles } from './useStyles';
import { ROUTES } from '../../routes';
import { useAuthContext } from '../../contexts/AuthContext';

interface Props {
  isDrawerOpening: boolean;
  handleDrawerOpen: () => void;
}

export function Calendar({ isDrawerOpening, handleDrawerOpen }: Props) {
  const classes = useStyles();
  const history = useHistory();
  const { logout, user } = useAuthContext();

  async function handleClickLogout() {
    try {
      await logout();
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
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Booking
          </Typography>
          <Typography component="p" color="inherit" noWrap className={classes.title}>
            {user?.name}
            <IconButton className={classes.logout} onClick={handleClickLogout}>
              <ExitToAppIcon color="inherit" />
            </IconButton>
          </Typography>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
