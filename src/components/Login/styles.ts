import { Theme } from '@mui/material';

export const paper = (theme: Theme) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});
export const avatar = (theme: Theme) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
});
export const form = (theme: Theme) => ({
  width: '100%', // Fix IE 11 issue.
  marginTop: theme.spacing(1),
});
export const submit = (theme: Theme) => ({
  margin: theme.spacing(3, 0, 2),
});
