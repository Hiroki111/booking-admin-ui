import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Grid, Drawer, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import * as sx from './useStyles';
import { LOGIN_PAGE_PATH } from '../../../../staticData/routes';
import { useAuthContext } from '../../../../contexts/AuthContext';
import { useIsSmallWindow } from '../../../../hooks/window';
import { UserAvatar } from './UserAvatar';
import { DrawerList } from '../DrawerList';

export function Header() {
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
      <AppBar position="absolute" sx={sx.appBar}>
        <Toolbar sx={sx.toolBar}>
          <Grid container>
            {isSmallWindow && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={() => setIsDrawerIconClicked(!isDrawerIconClicked)}
                sx={sx.menuButton}
                size="large"
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography component="h1" variant="h6" color="inherit" noWrap sx={sx.title}>
              Booking
            </Typography>
          </Grid>
          <Box>
            {isSmallWindow ? (
              <UserAvatar onClickLogout={handleClickLogout} />
            ) : (
              <Typography component="p" color="inherit" noWrap sx={sx.title}>
                {user?.name}
                <IconButton sx={sx.logout} onClick={handleClickLogout} size="large">
                  <ExitToAppIcon color="inherit" />
                </IconButton>
              </Typography>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        sx={sx.drawerPaper}
        open={isDrawerIconClicked}
        onClick={(_event?: React.MouseEvent<HTMLDivElement>) => setIsDrawerIconClicked(false)}
      >
        <DrawerList />
      </Drawer>
    </>
  );
}
