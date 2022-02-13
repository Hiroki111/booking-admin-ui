import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Grid } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { useStyles } from './useStyles';
import { PATHS } from '../../../routes';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useIsSmallWindow } from '../../../hooks/window';
import { UserAvatar } from './UserAvatar';

interface Props {
  onClickOpenDrawerIcon: () => void;
}

export function Header({ onClickOpenDrawerIcon }: Props) {
  const classes = useStyles();
  const history = useHistory();
  const { logout, user } = useAuthContext();
  const isSmallWindow = useIsSmallWindow();

  async function handleClickLogout() {
    try {
      await logout();
      history.push(PATHS.login);
    } catch (error) {
      alert('Error logging out. Please try again later.');
    }
  }

  return (
    <AppBar position="absolute" className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        <Grid container>
          {isSmallWindow && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={onClickOpenDrawerIcon}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Booking
          </Typography>
        </Grid>
        <div>
          {isSmallWindow ? (
            <UserAvatar onClickLogout={handleClickLogout} />
          ) : (
            <Typography component="p" color="inherit" noWrap className={classes.title}>
              {user?.name}
              <IconButton className={classes.logout} onClick={handleClickLogout}>
                <ExitToAppIcon color="inherit" />
              </IconButton>
            </Typography>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
