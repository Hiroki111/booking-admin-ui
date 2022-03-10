import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  avatar: {
    cursor: 'pointer',
  },
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
