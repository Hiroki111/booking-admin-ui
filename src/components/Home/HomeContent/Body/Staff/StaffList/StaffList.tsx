import { Box, Button, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';

import { StyledTableCell, StyledTableRow, EditButton, DeleteButton } from './styles';
import { useStaffListQuery } from '../../../../../../queries/staff';

export function StaffList() {
  const { data: staffList } = useStaffListQuery();

  return (
    <Box>
      <Box>
        <Button>Add new staff</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staffList?.map((staff) => (
              <StyledTableRow key={staff.id}>
                <StyledTableCell>{staff.name}</StyledTableCell>
                <StyledTableCell>{staff.title}</StyledTableCell>
                <StyledTableCell align="center">
                  <EditButton>Edit</EditButton>
                  <DeleteButton>Delete</DeleteButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
