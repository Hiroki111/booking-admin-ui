import { Button } from '@mui/material';
import { styled, Theme } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { hoverableOption } from '../../../../../../styles/sharedStyles';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const EditButton = styled(Button)(({ theme }) => ({
  margin: '0 8px',
}));

export const DeleteButton = styled(Button)(({ theme }) => ({
  margin: '0 8px',
  ...hoverableOption(theme),
  backgroundColor: theme.palette.error.main,
  color: theme.palette.common.white,
}));
