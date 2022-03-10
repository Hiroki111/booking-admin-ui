import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  list: {
    paddingTop: 64,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 72,
    },
  },
}));
