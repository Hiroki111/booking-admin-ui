import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Grid, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import { useStyles } from './useStyles';
import { LOGIN_PAGE_PATH } from '../../../../staticData/routes';
import { useAuthContext } from '../../../../contexts/AuthContext';
import { useIsSmallWindow } from '../../../../hooks/window';
import { UserAvatar } from './UserAvatar';
import { DrawerList } from '../DrawerList';

export function Header() {
  const classes = useStyles();
  const [isDrawerIconClicked, setIsDrawerIconClicked] = useState<boolean>(false);
  const history = useHistory();
  const { logout, user } = useAuthContext();
  const isSmallWindow = useIsSmallWindow();

  async function handleClickLogout() {
    try {
      await logout();
      history.push(LOGIN_PAGE_PATH);
    } catch (error) {
      alert('Error logging out. Please try again later.');
    }
  }

  return (
    <>
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <Grid container>
            {isSmallWindow && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={() => setIsDrawerIconClicked(!isDrawerIconClicked)}
                className={classes.menuButton}
                size="large"
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
                <IconButton className={classes.logout} onClick={handleClickLogout} size="large">
                  <ExitToAppIcon color="inherit" />
                </IconButton>
              </Typography>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        classes={{ paper: classes.drawerPaper }}
        open={isDrawerIconClicked}
        onClick={(_event?: React.MouseEvent<HTMLDivElement>) => setIsDrawerIconClicked(false)}
      >
        <DrawerList />
      </Drawer>
    </>
  );
}
