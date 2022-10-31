import { Theme } from '@mui/material';

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
