import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  calendarContainer: {
    position: 'relative',
  },
  gridRoot: {
    padding: 0,
  },
  floatingButton: {
    position: 'fixed',
    right: 40,
    bottom: 40,
    zIndex: 1,
  },
}));
