import { blue, green } from '@material-ui/core/colors';

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

export const editBadge = {
  padding: '2px',
  backgroundColor: 'white',
  fontWeight: 'bold',
  borderRadius: '4px',
  '&:hover': {
    cursor: 'pointer',
  },
};
