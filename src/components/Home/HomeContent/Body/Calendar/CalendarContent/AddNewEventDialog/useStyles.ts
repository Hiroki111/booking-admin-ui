import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  closeButton: {
    width: 64,
    height: 64,
  },
  dialogActions: {
    justifyContent: 'space-between',
  },
  datepickerContainer: {
    margin: '8px',
    width: '85px',
  },
  timepickerContainer: {
    margin: '8px',
    width: '70px',
  },
  textField: {
    margin: '8px',
  },
}));
