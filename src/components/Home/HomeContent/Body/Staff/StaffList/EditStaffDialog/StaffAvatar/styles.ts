import { blue, green } from '@material-ui/core/colors';
import { Theme } from '@mui/material';

// NOTE: On home-ui, avatar's size is 56 * 56 px
export const avatar = {
  backgroundColor: green[500],
  width: 112,
  height: 112,
};

export const imageWrapper = {
  '& img': {
    ...avatar,
    borderRadius: '50%',
  },
};

export const initials = {
  ...avatar,
  backgroundColor: blue[500],
};

export const inputLabel = {
  padding: '2px',
  backgroundColor: 'white',
  fontWeight: 'bold',
  borderRadius: '4px',
  '&:hover': {
    cursor: 'pointer',
  },
};

export const popoverContent = (theme: Theme) => ({
  padding: '8px',
  '& > p': {
    padding: '8px',
    color: 'black',
    '&:hover': {
      textDecoration: 'underline',
      color: theme.palette.info.light,
      cursor: 'pointer',
    },
  },
  '& > input': {
    position: 'absolute',
    opacity: 0,
    cursor: 'pointer',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 0,
  },
});
