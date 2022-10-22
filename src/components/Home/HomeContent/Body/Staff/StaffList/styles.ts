import { Theme } from '@mui/material';
import { hoverableOption } from '../../../../../../styles/sharedStyles';

export const editButton = (theme: Theme) => ({
  margin: '0 8px',
  ...hoverableOption(theme),
});

export const deleteButton = (theme: Theme) => ({
  margin: '0 8px',
  ...hoverableOption(theme),
  backgroundColor: theme.palette.error.main,
  color: theme.palette.common.white,
});

export const addNewButton = { margin: '16px 0', display: 'flex', flexDirection: 'row-reverse' };

export const gridWrapper = { height: 400, width: '100%' };
