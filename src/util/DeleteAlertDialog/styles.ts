import { Theme } from '@mui/material';

import { hoverableOption } from '../../styles/sharedStyles';

export const deleteButton = (theme: Theme) => ({
  margin: '0 8px',
  ...hoverableOption(theme),
  backgroundColor: theme.palette.error.main,
  color: theme.palette.common.white,
});
