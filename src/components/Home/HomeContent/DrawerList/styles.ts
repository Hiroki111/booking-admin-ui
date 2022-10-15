import { SxProps, Theme } from '@mui/material';

export const list: SxProps<Theme> = (theme: Theme) => ({
  paddingTop: '64px',
  [theme.breakpoints.up('sm')]: {
    paddingTop: '72px',
  },
});
