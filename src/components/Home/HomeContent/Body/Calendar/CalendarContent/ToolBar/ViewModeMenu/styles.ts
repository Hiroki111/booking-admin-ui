import { SxProps, Theme } from '@mui/material';
import { hoverableOption } from '../../../../../../../../styles/sharedStyles';

export const button: SxProps<Theme> = {
  textTransform: 'initial',
  height: '56px',
  backgroundColor: 'white',
};
export const dropdownIcon: SxProps<Theme> = {
  marginRight: '-6px',
};
export const selectedMenuItem: SxProps<Theme> = (theme: Theme) => ({
  ...hoverableOption(theme),
  color: theme.palette.common.white,
  backgroundColor: theme.palette.primary.main,
});
