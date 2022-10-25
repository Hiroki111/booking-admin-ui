import { blue, green } from '@material-ui/core/colors';

export const avatar = {
  backgroundColor: green[500],
  width: '56px',
  height: '56px',
  marginRight: '20px',
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
