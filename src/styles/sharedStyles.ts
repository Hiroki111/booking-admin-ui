import { grey } from '@mui/material/colors';
import { Theme } from '@mui/material/styles';

export function hoverableOption(theme: Theme) {
  return {
    '&:hover': {
      color: theme.palette.getContrastText(grey[200]),
      backgroundColor: grey[200],
      transition: 'background 300ms ease 0s',
    },
  };
}
