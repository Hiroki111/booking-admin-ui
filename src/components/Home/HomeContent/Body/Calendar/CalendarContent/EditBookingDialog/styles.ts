import { SxProps, Theme } from '@mui/material';

export const dialogContainer: SxProps<Theme> = {
  minHeight: '350px',
};
export const closeButton: SxProps<Theme> = {
  width: 64,
  height: 64,
};
export const dialogActions: SxProps<Theme> = {
  justifyContent: 'space-between',
};
export const fieldGroup: SxProps<Theme> = {
  margin: '8px 16px 0 16px',
};
export const dividerText: SxProps<Theme> = {
  fontWeight: 'bold',
  textTransform: 'uppercase',
  marginBottom: '4px',
};
export const centralDivider: SxProps<Theme> = (theme: Theme) => ({
  marginRight: '-1px',
  display: 'initial',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
});
