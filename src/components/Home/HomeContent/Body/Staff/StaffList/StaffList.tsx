import { Box, Button } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

import { addNewButton, gridWrapper, deleteButton, editButton } from './styles';
import { useStaffListQuery } from '../../../../../../queries/staff';

export function StaffList() {
  const { data: staffList } = useStaffListQuery();

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 2, minWidth: 150 },
    { field: 'title', headerName: 'Title', flex: 2, minWidth: 150 },
    {
      field: 'action',
      headerName: 'Action',
      minWidth: 200,
      align: 'center',
      headerAlign: 'center',
      flex: 1,
      renderCell: () => (
        <>
          <Button sx={editButton} variant="outlined">
            Edit
          </Button>
          <Button sx={deleteButton}>Delete</Button>
        </>
      ),
    },
  ];

  const rows: GridRowsProp =
    staffList?.map((staff) => ({
      id: staff.id,
      name: staff.name,
      title: staff.title,
    })) || [];

  return (
    <Box>
      <Box sx={addNewButton}>
        <Button variant="outlined">Add new staff</Button>
      </Box>
      <Box sx={gridWrapper}>
        <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} disableSelectionOnClick />
      </Box>
    </Box>
  );
}
