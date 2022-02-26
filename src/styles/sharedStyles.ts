import { grey } from '@material-ui/core/colors';
import { Theme } from '@material-ui/core/styles';

export function hoverableOption(theme: Theme) {
  return {
    '&:hover': {
      color: theme.palette.getContrastText(grey[200]),
      backgroundColor: grey[200],
      transition: 'background 300ms ease 0s',
    },
  };
}
