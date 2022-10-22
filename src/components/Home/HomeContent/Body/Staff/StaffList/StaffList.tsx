import { Box, Button } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

import { EditButton, DeleteButton } from './styles';
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
          <EditButton variant="outlined">Edit</EditButton>
          <DeleteButton>Delete</DeleteButton>
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
      <Box>
        <Button>Add new staff</Button>
      </Box>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} disableSelectionOnClick />
      </Box>
    </Box>
  );
}
