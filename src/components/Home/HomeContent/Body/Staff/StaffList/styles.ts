import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { hoverableOption } from '../../../../../../styles/sharedStyles';

export const EditButton = styled(Button)(({ theme }) => ({
  margin: '0 8px',
  ...hoverableOption(theme),
}));

export const DeleteButton = styled(Button)(({ theme }) => ({
  margin: '0 8px',
  ...hoverableOption(theme),
  backgroundColor: theme.palette.error.main,
  color: theme.palette.common.white,
}));
