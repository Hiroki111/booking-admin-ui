import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  popoverContent: {
    padding: 8,
    '& > p': {
      padding: 8,
    },
  },
  popoverLogoutText: {
    '&:hover': {
      textDecoration: 'underline',
      color: theme.palette.info.light,
      cursor: 'pointer',
    },
  },
}));
