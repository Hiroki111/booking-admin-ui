import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  closeButton: {
    width: 64,
    height: 64,
  },
  dialogActions: {
    justifyContent: 'space-between',
  },
  fieldGroup: {
    marginTop: '8px',
    marginLeft: '16px',
    width: '100%',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    margin: '8px 0',
  },
  inputLabel: {
    width: '30%',
    fontWeight: 'bold',
  },
  dateContainer: {
    '& > div': {
      width: '110px',
      marginRight: '8px',
    },
  },
  timeContainer: {
    '& > div': {
      width: '100px',
      marginRight: '8px',
    },
  },
  divBetweenStartAndEnd: {
    marginRight: '10px',
  },
  dividerText: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  datepickerContainer: {
    margin: '8px',
    width: '85px',
  },
  timepickerContainer: {
    margin: '10px',
    width: '70px',
  },
  textField: {
    marginRight: '8px',
    width: '100%',
  },
}));
