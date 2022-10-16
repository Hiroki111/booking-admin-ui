import { Theme } from '@mui/material';

export const drawerPaper = (theme: Theme) => ({
  '& .MuiDrawer-paper': {
    whiteSpace: 'nowrap',
    position: 'relative',
    width: '240px',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.between(0, 'md')]: {
      width: theme.spacing(9),
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      [theme.breakpoints.between(0, 'sm')]: {
        width: theme.spacing(7),
      },
    },
  },
});
