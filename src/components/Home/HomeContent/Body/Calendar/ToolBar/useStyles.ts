import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  toolbarContainer: {
    padding: theme.spacing(1),
  },
  button: {
    textTransform: 'initial',
    width: '91px',
  },
  addNewButton: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.primary.main,
  },
}));
