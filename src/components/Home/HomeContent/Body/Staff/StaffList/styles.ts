import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { hoverableOption } from '../../../../../../styles/sharedStyles';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: 600,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const EditButton = styled(Button)(() => ({
  margin: '0 8px',
}));

export const DeleteButton = styled(Button)(({ theme }) => ({
  margin: '0 8px',
  ...hoverableOption(theme),
  backgroundColor: theme.palette.error.main,
  color: theme.palette.common.white,
}));
