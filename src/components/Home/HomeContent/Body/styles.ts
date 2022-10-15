import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

export const sx: Record<string, SxProps<Theme>> = {
  mainWrapper: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  contentWrapper: (theme: Theme) => ({ p: theme.spacing(1) }),
};
