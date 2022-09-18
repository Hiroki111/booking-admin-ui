import makeStyles from '@mui/styles/makeStyles';

import { SMALL_WINDOW_HEADER_HEIGHT, HEADER_HEIGHT, TOOLBAR_HEIGHT } from '../../../../../../../styles/const';

export const useStyles = makeStyles((theme) => ({
  calendarWidgetContainer: {
    margin: theme.spacing(1),
    '& > .fc-media-screen': {
      [theme.breakpoints.between(0, 'md')]: {
        height: `calc(100vh - ${SMALL_WINDOW_HEADER_HEIGHT}px - ${TOOLBAR_HEIGHT}px - ${theme.spacing(4)})`,
      },
      [theme.breakpoints.up('sm')]: {
        height: `calc(100vh - ${HEADER_HEIGHT}px - ${TOOLBAR_HEIGHT}px - ${theme.spacing(4)})`,
      },
    },
  },
  eventContent: {
    overflow: 'hidden',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));
