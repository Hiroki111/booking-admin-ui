import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  closeButton: {
    width: 64,
    height: 64,
  },
  dialogActions: {
    justifyContent: 'space-between',
  },
  textField: {
    margin: '8px',
  },
}));
