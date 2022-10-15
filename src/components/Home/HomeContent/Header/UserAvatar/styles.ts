import { SxProps, Theme } from '@mui/material';

export const avatar: SxProps<Theme> = {
  cursor: 'pointer',
};
export const popoverContent: SxProps<Theme> = {
  padding: '8px',
  '& > p': {
    padding: '8px',
  },
};
export const popoverLogoutText: SxProps<Theme> = (theme: Theme) => ({
  '&:hover': {
    textDecoration: 'underline',
    color: theme.palette.info.light,
    cursor: 'pointer',
  },
});
