import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  dialogContainer: {
    minHeight: '350px',
  },
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
  dividerText: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: '4px',
  },
  centralDivider: {
    marginRight: '-1px',
    display: 'initial',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
}));
