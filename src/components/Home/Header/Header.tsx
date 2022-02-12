import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Grid, Avatar } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import clsx from 'clsx';

import { useStyles } from './useStyles';
import { PATHS } from '../../../routes';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useIsSmallWindow } from '../../../hooks/window';

interface Props {
  isDrawerOpen: boolean;
  onClickOpenDrawerIcon: () => void;
}

export function Header({ isDrawerOpen, onClickOpenDrawerIcon }: Props) {
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

  function getAvatarContent() {
    if (!user?.name) {
      return <PeopleIcon />;
    }

    const nameArray = user.name.trim().split(' ') || [];
    let initials: string;

    if (nameArray.length === 0) {
      initials = '';
    } else if (nameArray.length === 1) {
      initials = nameArray[0].charAt(0).toUpperCase();
    } else {
      const firstChar = nameArray[0].charAt(0).toUpperCase();
      const lastChar = nameArray[nameArray.length - 1].charAt(0).toUpperCase();
      initials = `${firstChar}${lastChar}`;
    }

    return initials;
  }

  return (
    <AppBar position="absolute" className={clsx(classes.appBar, isDrawerOpen && classes.appBarShift)}>
      <Toolbar className={classes.toolBar}>
        <Grid container>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={onClickOpenDrawerIcon}
            className={clsx(classes.menuButton, isDrawerOpen && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap>
            Booking
          </Typography>
        </Grid>
        <div>
          {isSmallWindow ? (
            <Avatar>{getAvatarContent()}</Avatar>
          ) : (
            <Typography component="p" color="inherit" noWrap>
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
