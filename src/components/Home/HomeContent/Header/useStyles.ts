import makeStyles from '@mui/styles/makeStyles';
import { HEADER_HEIGHT, SMALL_WINDOW_HEADER_HEIGHT } from '../../../../styles/const';

export const useStyles = makeStyles((theme) => ({
  toolBar: {
    paddingRight: 24,
    justifyContent: 'space-between',
  },
  appBar: {
    [theme.breakpoints.between(0, 'md')]: {
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
  },
  menuButton: {
    marginRight: 12,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    padding: '8px 0',
  },
  logout: {
    color: 'inherit',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: '240px',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));
