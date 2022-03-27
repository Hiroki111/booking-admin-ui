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
    margin: '8px 16px 0 16px',
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
  divBetweenStartAndEnd: {
    marginRight: '10px',
  },
  dividerText: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: '4px',
  },
  datepickerContainer: {
    margin: '8px',
    width: '85px',
  },
  timepickerContainer: {
    margin: '10px',
    width: '70px',
  },
  centralDivider: {
    marginRight: '-1px',
    display: 'initial',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
}));
