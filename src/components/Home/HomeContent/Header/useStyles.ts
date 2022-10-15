import { SxProps, Theme } from '@mui/material';
import { HEADER_HEIGHT, SMALL_WINDOW_HEADER_HEIGHT } from '../../../../styles/const';

export const toolBar: SxProps<Theme> = {
  paddingRight: '24px',
  justifyContent: 'space-between',
};
export const appBar: SxProps<Theme> = (theme: Theme) => ({
  [theme.breakpoints.between(0, 'sm')]: {
    height: SMALL_WINDOW_HEADER_HEIGHT,
  },
  [theme.breakpoints.up('sm')]: {
    height: HEADER_HEIGHT,
  },
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
});
export const menuButton: SxProps<Theme> = {
  marginRight: '12px',
};
export const menuButtonHidden: SxProps<Theme> = {
  display: 'none',
};
export const title: SxProps<Theme> = {
  padding: '8px 0',
};
export const logout: SxProps<Theme> = {
  color: 'inherit',
};
export const drawerPaper: SxProps<Theme> = (theme: Theme) => ({
  '& .MuiPaper-root': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: '240px',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
});
