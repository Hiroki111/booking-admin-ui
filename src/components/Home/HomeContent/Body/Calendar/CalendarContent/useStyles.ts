import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  calendarContainer: {
    position: 'relative',
  },
  gridRoot: {
    padding: 0,
  },
  floatingButton: {
    position: 'fixed',
    zIndex: 1,
  },
  todayButton: {
    right: 40,
    bottom: 40,
    backgroundColor: 'white',
  },
  addNewButton: {
    right: 40,
    bottom: 100,
  },
}));
