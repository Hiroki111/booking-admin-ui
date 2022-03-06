import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  list: {
    paddingTop: 64,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 72,
    },
  },
}));
